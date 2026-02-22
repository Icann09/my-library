"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation"; 
import { deleteBook } from "@/lib/admin/actions/book"; 


export default function BooksDeleteController() {
  const router = useRouter();

  useEffect(() => {
    const tbody = document.querySelector("tbody");
    if (!tbody) return;

    const handler = async (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const btn = target.closest("[data-action='delete']");
      if (!btn) return;

      const bookId = btn.getAttribute("data-book-id");
      if (!bookId) return;

      if (confirm("Are you sure you want to delete this book?")) {
        const res = await deleteBook(bookId);
        if (res.success) {
          router.refresh(); // Refresh the page to update the table
        } else {
          alert(res.error || "Failed to delete book.");
        }
      }
    };

    tbody.addEventListener("click", handler);

    return () => {
      tbody.removeEventListener("click", handler);
    };
  }, [router]); 
  return null;
}