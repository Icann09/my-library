// components/admin/DeleteUserBtn.tsx
"use client";

import { Trash2 } from "lucide-react";
import { deleteBorrowRecord } from "@/lib/admin/actions/book";

export default function BorrowRecordDelBtn({ userId }: { userId: string }) {
  const handleDelete = async () => {
    const confirmed = confirm("Are you sure you want to delete this user's records?");
    if (!confirmed) return;

    const result = await deleteBorrowRecord(userId);

    if (result.success) {
      window.location.reload(); // or better, update local state
    } else {
      console.error(result.error);
    }
  };

  return (
    <button onClick={handleDelete} className="text-red-500 hover:text-red-700">
      <Trash2 size={18} />
    </button>
  );
}
