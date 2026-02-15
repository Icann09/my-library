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

  let wasInserted = false;
  let borrowRow: any = null;
  let bookRow: any = null;

  try {
    await dbPool.transaction(async (tx) => {

      // 1️⃣ Idempotency gate (UNIQUE user_id + book_id)
      const inserted = await tx
        .insert(borrowRecords)
        .values({ userId, bookId, dueDate, status: "BORROWED" })
        .onConflictDoNothing()
        .returning();

      // Retry / already borrowed → commit safely
      if (inserted.length === 0) {
        return;
      }

      wasInserted = true;
      borrowRow = inserted[0];

      // 2️⃣ Atomic inventory decrement
      const updated = await tx
        .update(books)
        .set({
          availableCopies: sql`${books.availableCopies} - 1`,
        })
        .where(
          and(
            eq(books.id, bookId),
            gt(books.availableCopies, 0)
          )
        )
        .returning();

      if (updated.length === 0) {
        throw new Error("OUT_OF_STOCK");
      }

      bookRow = updated[0];
    });

  } catch (error: any) {

    if (error.message === "OUT_OF_STOCK") {
      return { success: false, error: "Book not available" };
    }

    if (error.code === "40001") {
      return { success: false, error: "Retry request" }; // SERIALIZABLE retry
    }

    return { success: false, error: "Failed to borrow book" };
  }

  // 🔐 Idempotency guard → run side-effects only if state changed
  if (!wasInserted) {
    return { success: true };
  }

  // ✅ Only runs AFTER successful COMMIT

  try {
    await sendEmail({
      email: user.email,
      subject: "Book Borrowed Successfully",
      message: bookBorrowedConfirmation({
        studentName: user.fullName!,
        bookTitle: bookRow.title,
        borrowDate: borrowRow.createdAt
          ? new Date(borrowRow.createdAt).toISOString()
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
        bookTitle: bookRow.title,
        dueDate,
      },
    });
  } catch (error) {
    console.error("Workflow failed", error);
  }

  return { success: true };
}
