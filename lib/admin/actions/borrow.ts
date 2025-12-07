"use server"

import { borrowRecords } from "@/database/schema";
import { eq } from "drizzle-orm";
import { db } from "@/database/drizzle";
import { bookBorrowReceipt } from "@/lib/emails/book-borrow-receipt";
import { sendEmail } from "@/lib/workflow";

export async function updateBorrowStatus(
  borrowId: string,
  newStatus: "BORROWED" | "RETURNED" | "LATE RETURN"
) {
  try {
    const result = await db
      .update(borrowRecords)
      .set({ status: newStatus })
      .where(eq(borrowRecords.id, borrowId)) // ✅ use borrowId here
      .returning();

    console.log("📌 Updating borrow record ID:", borrowId, "to", newStatus);
    console.log("✅ Update result:", result);

    return { success: true, result };
  } catch (error) {
    console.error("❌ Error updating borrow status", error);
    return { success: false, error: "Failed to update borrow status" };
  }
}

export async function generateReceipt(borrowId: string) {
  try {
    // 1. Dapatkan borrow record beserta user & book
    const borrow = await db.query.borrowRecords.findFirst({
      where: eq(borrowRecords.id, borrowId),
      with: {
        user: true,
        book: true,
      },
    });

    if (!borrow) {
      throw new Error("Borrow record not found");
    }

    // 2. Update status receipt
    await db
      .update(borrowRecords)
      .set({ receiptIsGenerated: true })
      .where(eq(borrowRecords.id, borrowId));

    // 3. Format receipt data
    const receiptData: ReceiptParams = {
      bookTitle: borrow.book.title,
      bookAuthor: borrow.book.author,
      bookGenre: borrow.book.genre,
      borrowDate: borrow.borrowDate.toISOString(),
      dueDate: borrow.dueDate.toISOString(),
    };

    // 4. Send email
    await sendEmail({
      email: borrow.user.email,
      subject: "Your Borrow Receipt",
      message: bookBorrowReceipt(receiptData),
    });

    return { success: true };
  } catch (err) {
    console.error("❌ Failed to generate receipt:", err);
    return { success: false };
  }
}