"use server";

import { auth } from "@/auth";
import { dbPool } from "@/database/drizzle-pool";
import { books, borrowRecords, users } from "@/database/schema";
import { eq, and, gt, sql } from "drizzle-orm";
import dayjs from "dayjs";
import { sendEmail, workflowClient } from "@/lib/workflow";
import config from "@/lib/config";
import { bookBorrowedConfirmation } from "../emails/book-borrowed-confirmation";

export async function borrowBook(bookId: string) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return { success: false, error: "Not authenticated" };

  const user = await dbPool.query.users.findFirst({
    where: eq(users.id, userId),
  });

  if (!user || user.status !== "APPROVED") {
    return { success: false, error: "Ineligible to borrow" };
  }

  const dueDate = dayjs().add(7, "day").toISOString();

  let createdBorrow;
  let updatedBook;

  try {
    await dbPool.transaction(async (tx) => {

      // 1️⃣ Insert borrow record (protected by UNIQUE constraint)
      [createdBorrow] = await tx.insert(borrowRecords).values({
        userId,
        bookId,
        dueDate,
        status: "BORROWED"
      }).returning();

      // 2️⃣ Atomic decrement
      [updatedBook] = await tx
        .update(books)
        .set({ availableCopies: sql`${books.availableCopies} - 1` })
        .where(and(eq(books.id, bookId), gt(books.availableCopies, 0)))
        .returning();

      // If update failed → throw → rollback happens automatically
      if (!updatedBook) {
        throw new Error("OUT_OF_STOCK");
      }
    });

  } catch (error: any) {

    if (error.code === "23505") {
      return { success: false, error: "Already borrowed" };
    }

    if (error.message === "OUT_OF_STOCK") {
      return { success: false, error: "Book not available" };
    }

    return { success: false, error: "Failed to borrow book" };
  }

  // ✅ Only runs AFTER successful COMMIT

  try {
    await sendEmail({
      email: user.email,
      subject: "Book Borrowed Successfully",
      message: bookBorrowedConfirmation({
        studentName: user.fullName!,
        bookTitle: updatedBook.title,
        borrowDate: createdBorrow.createdAt
          ? new Date(createdBorrow.createdAt).toISOString()
          : "",
        dueDate,
      }),
    });
  } catch (error) {
    console.error("Email failed", error);
  }

  try {
    await workflowClient.trigger({
      url: `${config.env.prodApiEndpoint}/api/workflows/due-reminder`,
      body: {
        email: user.email,
        fullName: user.fullName!,
        bookTitle: updatedBook.title,
        dueDate,
      },
    });
  } catch (error) {
    console.error("Workflow failed", error);
  }

  return { success: true };
}
