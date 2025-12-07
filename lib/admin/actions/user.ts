"use server"

import { db } from "@/database/drizzle"
import { borrowRecords } from "@/database/schema"
import { users } from "@/database/schema";
import { sendEmail } from "@/lib/workflow";
import { eq } from "drizzle-orm";
import { accountApproval } from "@/lib/emails/account-approval";
import { bookBorrowReceipt } from "@/lib/emails/book-borrow-receipt";

export const user = async () => {
  const record = await db.select().from(borrowRecords);
  return {
    success: true,
    data: JSON.parse(JSON.stringify(record)),
  };
}

export async function updateUserRole(userId: string, newRole: "USER" | "ADMIN") {
  try {
    const result = await db
      .update(users)
      .set({ role: newRole })
      .where(eq(users.id, userId))
      .returning();
    console.log("User ID type:", typeof userId, "value:", userId);
    console.log("✅ Update result:", result);
    return { success: true, result };
  } catch (error) {
    console.error("❌ Error update user role", error);
    return { success: false, error: "Failed to update user role" };
  }
}

export async function approveAccountRequest(userId: string) {
  try {
    const result = await db
      .update(users)
      .set({ status: "APPROVED" })
      .where(eq(users.id, userId))
      .returning();

    // TODO: send email confirmation here (e.g., via Resend/SendGrid)
    const user = result[0];
    await sendEmail({ email: user.email, subject: "Account Approval from My-Library",  message: accountApproval(user.fullName)});
  
    return { success: true, result };
  } catch (err) {
    console.error("❌ Failed to approve user:", err);
    return { success: false };
         } 
};

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



export async function rejectAccountRequest(userId: string) {
  try {
    const result = await db
      .update(users)
      .set({ status: "REJECTED" })
      .where(eq(users.id, userId))
      .returning();

    // TODO: send email confirmation here (e.g., via Resend/SendGrid)

    return { success: true, result };
  } catch (err) {
    console.error("❌ Failed to approve user:", err);
    return { success: false };
  }
}