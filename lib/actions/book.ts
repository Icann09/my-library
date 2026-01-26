"use server";

import { auth } from "@/auth";
import { db } from "@/database/drizzle";
import { books, borrowRecords, users } from "@/database/schema";
import { eq, and, gt, sql, desc } from "drizzle-orm";
import dayjs from "dayjs";
import { sendEmail, workflowClient } from "@/lib/workflow";
import config from "@/lib/config";
import { bookBorrowedConfirmation } from "../emails/book-borrowed-confirmation";
import { unstable_cache } from "next/cache";


export const fetchLatestBooks = unstable_cache(
  async () => {
    return await db
      .select()
      .from(books)
      .orderBy(desc(books.createdAt))
      .limit(13);
  },
  ["latest-books"], // cache key
  {
    revalidate: 3600,
  }
);


export async function borrowBook(bookId: string) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return { success: false, error: "Not authenticated" };

  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
  });

  if (!user || user.status !== "APPROVED") {
    return { success: false, error: "Ineligible to borrow" };
  }
  

  // Prevent duplicate borrow
  const existingBorrow = await db.query.borrowRecords.findFirst({
    where: and(
      eq(borrowRecords.userId, userId),
      eq(borrowRecords.bookId, bookId)
    ),
  });


  if (existingBorrow) {
    return { success: false, error: "Already borrowed" };
  }

  // 🔒 Atomic decrement
  const [book] = await db
    .update(books)
    .set({ availableCopies: sql`${books.availableCopies} - 1` })
    .where(and(eq(books.id, bookId), gt(books.availableCopies, 0)))
    .returning();

  if (!book) {
  return { success: false, error: "Book not available" };
}

  const dueDate = dayjs().add(7, "day").toISOString();

  const [created] = await db.insert(borrowRecords).values({
    userId,
    bookId,
    dueDate,
    status: "BORROWED",
  }).returning();

  // Side effects
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

  return { success: true };
}
