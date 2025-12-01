import Link from "next/link"
import BookCover from "./BookCover"


export default function BookCard({ id, title, genre, coverColor, coverUrl }: Book) {
  return (
    <li className="">
      <Link href={`/books/${id}`} className="w-full flex flex-col items-cente">
        <BookCover coverColor={coverColor} coverImage={coverUrl}/>
        <div className="mt-4 xs:max-w-40 max-w-2">
          <p className="book-title">{title}</p>
          <p className="book-genre">{genre}</p>
        </div>
      </Link>
    </li>
  )
}