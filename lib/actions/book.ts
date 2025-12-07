"use server"

import { db } from "@/database/drizzle";
import { books, borrowRecords } from "@/database/schema";
import { eq } from "drizzle-orm";
import dayjs from "dayjs";


export const borrowBook = async (params: BorrowBookParams) => {
  const { userId, bookId } = params;

  try {
    // 1. Check book availability
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

    // 2. Check if the user already borrowed this book
    const existingBorrow = await db
      .select()
      .from(borrowRecords)
      .where(eq(borrowRecords.userId, userId))
      .where(eq(borrowRecords.bookId, bookId));

    if (existingBorrow.length > 0) {
      return {
        success: false,
        error: "You have already borrowed this book. Check on your profile page!",
      };
    }

    // 3. Insert borrow record
    const dueDate = dayjs().add(7, "day").toDate().toDateString();

    const record = await db.insert(borrowRecords).values({
      userId,
      bookId,
      dueDate,
      status: "BORROWED",
    });

    // 4. Update available copies
    await db
      .update(books)
      .set({ availableCopies: book[0].availableCopies - 1 })
      .where(eq(books.id, bookId));

    return {
      success: true,
      data: JSON.parse(JSON.stringify(record)),
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "An error occurred while borrowing the book",
    };
  }
};

export const borrowedBooksList = async (id: string) => {
  await db.select().from(borrowRecords).where(eq(borrowRecords.userId, id));
}



