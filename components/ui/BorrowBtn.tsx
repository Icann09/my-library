"use client";

import Image from "next/image";
import { Button } from "./button";
import { toast } from "sonner";
import { borrowBook } from "@/lib/actions/book";
import { useTransition } from "react";
import { useRouter } from "next/navigation";


export default function BorrowBtn({ bookId }: { bookId: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleBorrow = () => {
    startTransition(async () => {
      try {
        const result = await borrowBook(bookId);
      if (result.success) {
        toast.success("Book borrowed succesfully");
        router.push("/my-profile");
      } else {
        toast.error(result.error);
      }
      } catch {
        toast.error("Something went wrong. Please try again!");
      }
    })
  }

  return (
    <Button
      className="book-overview_btn"
      onClick={handleBorrow}
      disabled={isPending}
    >
      <Image src="/icons/book.svg" alt="book" width={20} height={20} />
      <p className="font-bebas-neue text-xl text-dark-100">
        {isPending ? "Borrowing ..." : "Borrow Book Request"}
      </p>
    </Button>
  );
}
