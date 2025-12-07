"use server"

import { db } from "@/database/drizzle"
import { borrowRecords } from "@/database/schema"
import { users } from "@/database/schema";
import { sendEmail } from "@/lib/workflow";
import { eq } from "drizzle-orm";
import { accountApproval } from "@/lib/emails/account-approval";

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