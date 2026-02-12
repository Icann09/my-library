"use server";

import { auth } from "@/auth";
import { db } from "@/database/drizzle";
import { books, borrowRecords, users } from "@/database/schema";
import { eq, and, gt, sql } from "drizzle-orm";
import dayjs from "dayjs";
import { sendEmail, workflowClient } from "@/lib/workflow";
import config from "@/lib/config";
import { bookBorrowedConfirmation } from "../emails/book-borrowed-confirmation";


export async function borrowBook(bookId: string) {
  // Authentication & Eligibility Check
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return { success: false, error: "Not authenticated" };

  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
  });

  if (!user || user.status !== "APPROVED") {
    return { success: false, error: "Ineligible to borrow" };
  }
  
  const dueDate = dayjs().add(7, "day").toISOString();

  // Database Operations
  let created;
  try {
   [created] = await db.insert(borrowRecords).values({
      userId,
      bookId,
      dueDate,
      status: "BORROWED"
    }).returning();
  } catch (error: any) {
    if (error.code === "23505") {
      return { success: false, error: "Already borrowed" };
    }
    return { success: false, error: "Failed to borrow book" };
  };

  const [book] = await db
    .update(books)
    .set({ availableCopies: sql`${books.availableCopies} - 1` })
    .where(and(eq(books.id, bookId), gt(books.availableCopies, 0)))
    .returning();

  if (!book) {
    // 🚨 Rollback manually
    await db.delete(borrowRecords).where(eq(borrowRecords.id, created.id));
    return { success: false, error: "Book not available" };
  }


  // Side effects
  try {
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
  } catch (error) {
    console.error("Failed to send borrow email", error);
  }

  try {
    await workflowClient.trigger({
      url: `${config.env.prodApiEndpoint}/api/workflows/due-reminder`,
      body: {
        email: user.email,
        fullName: user.fullName!,
        bookTitle: book.title,
        dueDate,
      },
    });
  } catch (error) {
    console.error("Failed to trigger due reminder workflow", error);
  }
  return { success: true };
}
