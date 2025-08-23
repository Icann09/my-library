"use client"

import { Trash2, Pencil } from "lucide-react";
import { deleteBook } from "@/lib/admin/actions/book";
import { useRouter } from "next/navigation";
import Link from "next/link";


export default function BookAction({ bookId }: { bookId: string }) {
  const router = useRouter();
  

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this book?")) {
      const res = await deleteBook(bookId);
      if (res.success) {
        router.refresh(); // Refresh the page to update the table
      } else {
        alert(res.error || "Failed to delete book.");
      }
    }
  };

  return (
    <div className="flex justify-between">
      <Link href={`/admin/books/edit/${bookId}`} aria-label="Edit book">
        <Pencil className="text-blue-600 cursor-pointer" size={16} />
      </Link>
      <Trash2
        className="text-red-600 cursor-pointer"
        size={16}
        onClick={handleDelete}
      />
    </div>
  );
}
