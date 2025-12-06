"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { sendEmail } from "@/lib/workflow";
import { Button } from "../ui/button";
import { bookBorrowReceipt } from "@/lib/emails/book-borrow-receipt";
import { markReceiptGenerated } from "@/lib/actions/book";

interface BorrowReceiptBtnProps {
  receipt: ReceiptParams;
  email: string;
  subject: string;
  isGenerated: boolean;
  borrowId: string;
}

export default function BorrowReceiptBtn({
  receipt,
  email,
  subject,
  isGenerated,
  borrowId,
}: BorrowReceiptBtnProps) {

  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(isGenerated); // ✅ sync local UI state

  const generateReceipt = async () => {
  if (generated || loading) return;

  setLoading(true);

  try {
    await sendEmail({
      email,
      subject,
      message: bookBorrowReceipt(receipt),
    });

    await markReceiptGenerated(borrowId);
    setGenerated(true);
  } catch (error) {
    console.error("Receipt generation failed:", error);
    alert("Failed to generate receipt. Please try again.");
  } finally {
    setLoading(false);
  }
};


  return (
    <div>
      <Button
        disabled={generated || loading}
        className={cn(
          "px-3 py-1 text-sm rounded-md text-white transition",
          generated || loading
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-indigo-600 hover:bg-indigo-700"
        )}
        onClick={generateReceipt}
      >
        {generated
          ? "Receipt Generated"
          : loading
            ? "Sending..."
            : "Generate Receipt"}
      </Button>
    </div>
  );
}
