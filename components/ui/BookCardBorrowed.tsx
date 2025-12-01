import Link from "next/link"
import BookCover from "./BookCover"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { ReceiptText } from "lucide-react"
import { Button } from "./button"
import { BookOpen } from "lucide-react"

interface LoanedBook extends Book {
  dueDate: string | Date
  borrowedAt: string | Date
}

export default function BookCardBorrowed({ id, title, genre, coverColor, coverUrl, borrowedAt, dueDate }: LoanedBook) {
  const getDaysLeft = (dueDate: string | Date) => {
    const today = new Date();
    const due = new Date(dueDate);

    // Difference in milliseconds → convert to days
    const diffMs = due.getTime() - today.getTime();

    // Round up so partial days count as 1 day
    const daysLeft = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    return daysLeft < 0 ? 0 : daysLeft; // never negative
  }
  const daysLeft = getDaysLeft(dueDate);

  return (
    <li className= "xs:w-80 p-8 w-full bg-[linear-gradient(#12141D,#12151F)] rounded-xl">
      <Link href={`/books/${id}`} className="w-full flex flex-col gap">
        <div
            className="backdrop-blur-md w-64 h-72 flex justify-center items-center rounded-md"
            style={{ backgroundColor: `${coverColor}20` }}  /* adds opacity */
          >

          <BookCover coverColor={coverColor} coverImage={coverUrl} />
        </div>
        <div className="mt-4 xs:max-w-40 max-w-28">
          <p className="book-title">{title}</p>
          <p className="book-genre">{genre}</p>
        </div>
        <div className="mt-5 w-full flex flex-col ">
          <div className="flex gap-2 items-center">
            <BookOpen size={16}/>
            <p>Borrowed on {new Date(borrowedAt).toLocaleDateString()}</p>

          </div>
          <div className="flex flex-row items-center gap-1 justify-between">
            <div className="flex gap-2">
              <Image src="/icons/calendar.svg" alt="calendar" width={18} height={18} className="object-contain"/>
              <p className="text-light-100">{daysLeft} days left</p>
            </div>
            <Button className="bg-[#8B38484D] cursor-pointer">
              <ReceiptText size={16}/>
            </Button>
          </div>
        </div>
      
      </Link>
    </li>
  )
}