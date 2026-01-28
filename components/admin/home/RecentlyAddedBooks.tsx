import Link from "next/link";
import BooksCard from "./BooksCard";
import { Plus } from "lucide-react";
import { fetchBooks } from "@/lib/data";
import { dateFormat } from "@/lib/utils";

export default async function RecentlyAddedBooks() {

  const books = await fetchBooks();
  const booksWithFormattedDate = books.map(book => ({
    ...book,
    createdAtFormatted: book.createdAt
      ? dateFormat(book.createdAt)
      : "—", // or "N/A"
  }));


  return (
    <div className="p-[10px] rounded-xl border border-[#E4E4F0] bg-white max-w-[540px] h-[772px] flex flex-col relative">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Recently Added Books</h2>
        <Link href="/admin/books">
          <button className="text-sm font-semibold text-blue-800 cursor-pointer bg-admin-gray p-2 rounded-sm hover:text-blue-600">View all</button>
        </Link>
      </div>
      <div className="flex gap-2 h-[76px] w-[508px] p-2 bg-admin-gray items-center rounded-md">
        <div className="size-[48px] rounded-full bg-white flex items-center justify-center">
          <Link href="/admin/books/new">
            <Plus className="size-[30px] cursor-pointer"/>  
          </Link>
        </div>
        <h3 className="font-medium">Add New Book</h3>
      </div>
      <div className="relative flex-1 overflow-hidden">
        <div className="flex gap-1 flex-col mt-3 overflow-y-auto pr-2 h-full">
          {booksWithFormattedDate.map((book) => (
            <BooksCard 
              key={book.id}
              title={book.title}
              author={book.author}
              genre={book.genre}
              createdAt={book.createdAtFormatted}
              coverColor={book.coverColor}
              coverUrl={book.coverUrl}
            />
          ))}
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-white pointer-events-none z-10" />
      </div>    
    </div>
  )
}
