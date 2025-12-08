"use server";

import { auth } from "@/auth";
import { db } from "@/database/drizzle";
import { books, borrowRecords, users } from "@/database/schema";
import { eq, and } from "drizzle-orm";
import dayjs from "dayjs";

export async function borrowBook(bookId: string) {
  // 1. Authenticate user securely
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return { success: false, error: "Not authenticated" };
  }

  // 2. Verify user account exists
  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
  });

  if (!user) {
    return { success: false, error: "User not found" };
  }

  // Optional: Validate user status (APPROVED users only)
  if (user.status !== "APPROVED") {
    return { success: false, error: "You are not eligible to borrow this book" };
  }

  try {
    // 3. Check book availability
    const book = await db
      .select({ availableCopies: books.availableCopies })
      .from(books)
      .where(eq(books.id, bookId))
      .limit(1);

    if (!book.length || book[0].availableCopies <= 0) {
      return {
        success: false,
        error: "Book is not available for borrowing",
      };
    }

    // 4. Check if already borrowed
    const existingBorrow = await db
      .select()
      .from(borrowRecords)
      .where(
        and(
          eq(borrowRecords.userId, userId),
          eq(borrowRecords.bookId, bookId)
        )
      );

    if (existingBorrow.length > 0) {
      return {
        success: false,
        error: "You have already borrowed this book. Check your profile page!",
      };
    }

    // 5. Create borrow record
    const dueDate = dayjs().add(7, "day").toDate().toDateString();

    await db.insert(borrowRecords).values({
      userId,
      bookId,
      dueDate,
      status: "BORROWED",
    });

    // 6. Decrease available copies
    await db
      .update(books)
      .set({ availableCopies: book[0].availableCopies - 1 })
      .where(eq(books.id, bookId));

    return {
      success: true,
      message: "Book borrowed successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "An error occurred while borrowing the book",
    };
  }
}


export const borrowedBooksList = async (id: string) => {
  await db.select().from(borrowRecords).where(eq(borrowRecords.userId, id));
}



