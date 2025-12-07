"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { generateReceipt } from "@/lib/admin/actions/borrow";

export default function BorrowReceiptBtn({
  borrowId,
  isGenerated,
}: {
  borrowId: string;
  isGenerated: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(isGenerated);

  const handleGenerate = async () => {
    if (loading || generated) return;

    setLoading(true);

    const res = await generateReceipt(borrowId);

    if (res?.success) {
      setGenerated(true);
    }

    setLoading(false);
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
        onClick={handleGenerate}
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
