"use server"

import { borrowRecords } from "@/database/schema";
import { eq } from "drizzle-orm";
import { db } from "@/database/drizzle";

export async function updateBorrowStatus(
  borrowId: string,
  newStatus: "BORROWED" | "RETURNED" | "LATE RETURN"
) {
  try {
    const result = await db
      .update(borrowRecords)
      .set({ status: newStatus })
      .where(eq(borrowRecords.ud, borrowId)) // ✅ use borrowId here
      .returning();

    console.log("📌 Updating borrow record ID:", borrowId, "to", newStatus);
    console.log("✅ Update result:", result);

    return { success: true, result };
  } catch (error) {
    console.error("❌ Error updating borrow status", error);
    return { success: false, error: "Failed to update borrow status" };
  }
}
