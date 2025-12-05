"use client"

import { cn } from "@/lib/utils";
import { sendEmail } from "@/lib/workflow";
import { Button } from "../ui/button";
import { bookBorrowReceipt } from "@/lib/emails/book-borrow-receipt";

interface BorrowReceiptBtnProps {
  receipt: ReceiptParams;
  email: string;
  subject: string;
  isGenerated: boolean;
}

export default function BorrowReceiptBtn({ receipt, email, subject, isGenerated }: BorrowReceiptBtnProps) {

  const generateReceipt = async () => {
    if (isGenerated) return;

    await sendEmail({
      email,
      subject,
      message: bookBorrowReceipt(receipt),
    });

    console.log("Receipt sent to:", email);
  };

  return (
    <div>
      <Button
        disabled={isGenerated}
        className={cn(
          "px-3 py-1 text-sm rounded-md text-white transition",
          isGenerated
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-indigo-600 hover:bg-indigo-700"
        )}
        onClick={() => generateReceipt()}
      >
        {isGenerated ? "Receipt Generated" : "Generate Receipt"}
      </Button>
    </div>
  )
}
