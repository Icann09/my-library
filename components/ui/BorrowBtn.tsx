"use client";

import Image from "next/image";
import { Button } from "./button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { borrowBook } from "@/lib/actions/book";

export default function BorrowBtn({ bookId }: { bookId: string }) {
  const router = useRouter();
  const [borrowing, setBorrowing] = useState(false);

  const handleBorrow = async () => {
    setBorrowing(true);

    try {
      const result = await borrowBook(bookId);

      if (result.success) {
        toast.success("Book borrowed successfully");
        router.push("/my-profile");
      } else {
        toast.error(result.error);
      }
    } catch {
      toast.error("An error occurred while borrowing the book");
    } finally {
      setBorrowing(false);
    }
  };

  return (
    <Button
      className="book-overview_btn"
      onClick={handleBorrow}
      disabled={borrowing}
    >
      <Image src="/icons/book.svg" alt="book" width={20} height={20} />
      <p className="font-bebas-neue text-xl text-dark-100">
        {borrowing ? "Borrowing ..." : "Borrow Book Request"}
      </p>
    </Button>
  );
}
