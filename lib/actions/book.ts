"use server";

import { auth } from "@/auth";
import { db } from "@/database/drizzle";
import { books, borrowRecords, users } from "@/database/schema";
import { eq, and } from "drizzle-orm";
import dayjs from "dayjs";
import { sendEmail, workflowClient } from "@/lib/workflow";
import config from "@/lib/config";
import { bookBorrowedConfirmation } from "../emails/book-borrowed-confirmation";

export async function borrowBook(bookId: string) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) return { success: false, error: "Not authenticated" };

  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
  });

  if (!user) return { success: false, error: "User not found" };

  if (user.status !== "APPROVED") {
    return { success: false, error: "You are not eligible to borrow this book" };
  }

  try {
    // ⬅️ Fetch book availability
    const book = await db.query.books.findFirst({
      where: eq(books.id, bookId),
      columns: {
        availableCopies: true,
        title: true,
      }
    });

    if (!book || book.availableCopies <= 0) {
      return { success: false, error: "Book is not available" };
    }

    // Already borrowed?
    const existingBorrow = await db.query.borrowRecords.findFirst({
      where: and(
        eq(borrowRecords.userId, userId),
        eq(borrowRecords.bookId, bookId)
      ),
    });

    if (existingBorrow) {
      return {
        success: false,
        error: "You already borrowed this book",
      };
    }

    // Create borrow record
    const dueDate = dayjs().add(7, "day").toISOString();

    const [created] = await db.insert(borrowRecords).values({
      userId,
      bookId,
      dueDate,
      status: "BORROWED",
    }).returning();

    // Send email for borrow book confirmation
    // Send email for borrow book confirmation
    await sendEmail({
      email: user.email,
      subject: "Book Borrowed Successfully",
      message: bookBorrowedConfirmation({
        studentName: user.fullName,
        bookTitle: book.title,
        borrowDate: created.createdAt
          ? new Date(created.createdAt).toISOString()
          : "",
        dueDate: created.dueDate
          ? new Date(created.dueDate).toISOString()
          : "",
      }),
    });

    // Decrease stock
    await db
      .update(books)
      .set({ availableCopies: book.availableCopies - 1 })
      .where(eq(books.id, bookId));

    //
    // ⬇️ Trigger due-date reminder workflow HERE (correct)
    //
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
  } catch (error) {
    console.error(error);
    return { success: false, error: "Error borrowing book" };
  }
}


export const borrowedBooksList = async (id: string) => {
  return await db
    .select()
    .from(borrowRecords)
    .where(eq(borrowRecords.userId, id));
};



