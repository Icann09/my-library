"use server"
import { db } from "@/database/drizzle";
import { eq } from "drizzle-orm";
import { books, borrowRecords } from "@/database/schema";


export const createBook = async (params: BookParams) => {
  try {
    const newBook = await db.insert(books).values({
      ...params, availableCopies: params.totalCopies,
    }).returning();
    return {
      success: true,
      data: JSON.parse(JSON.stringify(newBook[0])),
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "An error occured while creating the book",
    }
  }
}

export const updateBook = async ({ bookId, params }: { bookId: string, params: BookParams}) => {
  try {
    const updatedBook = await db.update(books)
      .set({
        ...params,
        availableCopies: params.totalCopies,
      })
      .where(eq(books.id, bookId))
      .returning();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(updatedBook[0])),
    };
  } catch (error) {
    console.error("Update book error:", error);
    return {
      success: false,
      message: "An error occurred while updating the book",
    };
  }
};

export const deleteBorrowRecord = async (userId: string) => {
  try {
    const deleted = await db.delete(borrowRecords)
      .where(eq(borrowRecords.userId, userId))
      .returning();

    return { success: true, deleted };
  } catch (error) {
    console.error("Error deleting user records:", error);
    return { success: false, error: "Failed to delete records" };
  }
};

export const deleteBook = async (bookId: string) => {
  try {
    const deleted = await db.delete(books)
      .where(eq(books.id, bookId))
      .returning();

    return { success: true, deleted };
  } catch (error) {
    console.error("Error deleting user records:", error);
    return { success: false, error: "Failed to delete records" };
  }
};





