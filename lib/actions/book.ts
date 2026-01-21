"use server";

import { auth } from "@/auth";
import { db } from "@/database/drizzle";
import { books, borrowRecords, users } from "@/database/schema";
import { eq, and, gt } from "drizzle-orm";
import dayjs from "dayjs";
import { sendEmail, workflowClient } from "@/lib/workflow";
import config from "@/lib/config";
import { bookBorrowedConfirmation } from "../emails/book-borrowed-confirmation";


type BorrowResult =
  | { success: false; error: string }
  | {
      success: true;
      data: {
        user: typeof users.$inferSelect;
        book: typeof books.$inferSelect;
        created: typeof borrowRecords.$inferSelect;
        dueDate: string;
      };
    };

export const borrowedBooksList = async (id: string) => {
  return await db
    .select()
    .from(borrowRecords)
    .where(eq(borrowRecords.userId, id));
};


export async function borrowBook(bookId: string) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return { success: false, error: "Not authenticated" };
  }

  try {
    const result = await db.transaction<BorrowResult>(async (tx) => {
      const user = await tx.query.users.findFirst({
        where: eq(users.id, userId),
      });

      if (!user || user.status !== "APPROVED") {
        return { success: false, error: "Ineligible to borrow" };
      }

      const book = await tx.query.books.findFirst({
        where: eq(books.id, bookId),
      });

      if (!book || book.availableCopies <= 0) {
        return { success: false, error: "Book is not available" };
      }

      const existingBorrow = await tx.query.borrowRecords.findFirst({
        where: and(
          eq(borrowRecords.userId, userId),
          eq(borrowRecords.bookId, bookId)
        ),
      });

      if (existingBorrow) {
        return { success: false, error: "Already borrowed" };
      }

      const dueDate = dayjs().add(7, "day").toISOString();

      const [created] = await tx
        .insert(borrowRecords)
        .values({
          userId,
          bookId,
          dueDate,
          status: "BORROWED",
        })
        .returning();

      const updated = await tx
        .update(books)
        .set({ availableCopies: book.availableCopies - 1 })
        .where(
          and(
            eq(books.id, bookId),
            gt(books.availableCopies, 0)
          )
        )
        .returning();

      if (updated.length === 0) {
        return { success: false, error: "Book just became unavailable" };
      }

      return {
        success: true,
        data: {
          user,
          book,
          created,
          dueDate,
        },
      };
    });

    // ⬇️ SIDE EFFECTS (after commit)
    if (result.success) {
      const { user, book, created, dueDate } = result.data;

      await sendEmail({
        email: user.email,
        subject: "Book Borrowed Successfully",
        message: bookBorrowedConfirmation({
          studentName: user.fullName!,
          bookTitle: book.title,
          borrowDate: created.createdAt
            ? new Date(created.createdAt).toISOString()
            : "",
          dueDate,
        }),
      });

      await workflowClient.trigger({
        url: `${config.env.prodApiEndpoint}/api/workflows/due-reminder`,
        body: {
          email: user.email,
          fullName: user.fullName!,
          bookTitle: book.title,
          dueDate,
        },
      });
    }

    return result;

  } catch (error) {
    console.error("Borrow Transaction Failed:", error);
    return { success: false, error: "Error borrowing book" };
  }
}
