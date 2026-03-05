"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { deleteBook } from "@/lib/admin/actions/book";
import { toast } from "sonner";

export default function BookDeleteButton({
  bookId,
}: {
  bookId: string;
}) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this book?")) return;

    const res = await deleteBook(bookId);

    if (res.success) {
      router.refresh();
      toast.success("Book deleted");
    } else {
      toast.error("Failed to delete book");
    }
  };

  return (
    <div className="flex items-center justify-center">
      <Trash2
        onClick={handleDelete}
        className="text-red-600 cursor-pointer"
        size={16}
      />
    </div>
  
  );
}
