import Link from "next/link"
import BookCover from "./BookCover"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { Button } from "./button"

export default function BookCard({ id, title, genre, coverColor, coverUrl, isLoanedBook, dueDate }: Book) {
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
    <li className={cn(isLoanedBook && "xs:w-52 w-full")}>
      <Link href={`/books/${id}`} className={cn( isLoanedBook && "w-full flex flex-col items-center")}>
        <BookCover coverColor={coverColor} coverImage={coverUrl}/>
        <div className={cn( "mt-4", !isLoanedBook && "xs:max-w-40 max-w-28")}>
          <p className="book-title">{title}</p>
          <p className="book-genre">{genre}</p>
        </div>
        {isLoanedBook && ( 
          <div className="mt-3 w-full">
            <div className="book-loaned">
              <Image src="/icons/calendar.svg" alt="calendar" width={18} height={18} className="object-contain"/>
              <p className="text-light-100">{daysLeft} days left</p>
            </div>
            <Button className="book-btn">
              Download receipt
            </Button>
          </div>
        )}
      </Link>
    </li>
  )
}