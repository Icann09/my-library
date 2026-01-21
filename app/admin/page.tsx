import StatsCard from "@/components/admin/home/StatsCard";
import { format } from "date-fns";
import BorrowedBooksCard from "@/components/admin/home/BorrowedBooksCard";
import { fetchAccountRequest, fetchBooks, fetchBorrowDetails, fetchStatsData } from "@/lib/data";
import AccountRequestCard from "@/components/admin/home/AccountRequestCard";
import { Plus } from "lucide-react";
import BooksCard from "@/components/admin/home/BooksCard";
import Link from "next/link";

const dateFormat = (date: Date | string) =>
  format(new Date(date), "MM/dd/yy");

export default async function Page() {
  // Fetching data
    // Stats Data

    const [
      statsData,
      borrowDetails,
      users,
      books
    ] = await Promise.all([
      fetchStatsData(),
      fetchBorrowDetails(),
      fetchAccountRequest(),
      fetchBooks(),
    ]);

  const statsArray = Object.entries(statsData);
  const booksWithFormattedDate = books.map(book => ({
    ...book,
    createdAtFormatted: book.createdAt
      ? dateFormat(book.createdAt)
      : "—", // or "N/A"
  }));




  return (
    <div>
      {/* Stats  */}
      <section className="flex gap-3 pb-4">
        {statsArray.map(([index, { value, total, title}]) => (
          <StatsCard key={index} change={value} value={total} stat={title}/>
          )
        )}
      </section>
      <section className="flex justify-between">
        {/* Borrow and Account request */}
        <div className="flex flex-col gap-3">
          {/* Borrow request */}  
          <div className="p-[10px] rounded-xl border border-[#E4E4F0] bg-white max-w-[540px] h-[380px]">
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-xl font-semibold text-gray-900">Borrow Requests</h2>
              <Link href="/admin/borrow-records">
                <button className="text-sm font-semibold text-blue-800 cursor-pointer bg-admin-gray p-2 rounded-sm hover:text-blue-600">View all</button>
              </Link>
            </div>
            <div className="relative flex flex-col gap-3 max-h-[300px] w-full overflow-y-auto pr-2 rounded-md">
              {borrowDetails.map((borrowedBook) => (
                <BorrowedBooksCard 
                  key={borrowedBook.borrowId}
                  borrowDate={dateFormat(borrowedBook.borrowDate)}
                  bookAuthor={borrowedBook.bookAuthor}
                  bookColor={borrowedBook.coverColor}
                  bookCover={borrowedBook.coverUrl}
                  bookGenre={borrowedBook.bookGenre}
                  bookTitle={borrowedBook.bookTitle}
                  userFullName={borrowedBook.fullName}
                />
              ))}
            </div>
            <div className="relative bottom-[75px] left-0 right-0 h-[75px] z-10 bg-gradient-to-b from-transparent to-white pointer-events-none"></div>
          </div> 
          {/* Account request  */}
          <div className="p-[10px] rounded-xl border border-[#E4E4F0] bg-white max-w-[540px] h-[380px] flex flex-col relative">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Account Requests</h2>
              <Link href="/admin/account-requests">
                <button className="text-sm font-semibold text-blue-800 cursor-pointer bg-admin-gray p-2 rounded-sm hover:text-blue-600">View all</button>
              </Link>
            </div>
            {/* Scrollable content with gradient overlay */}
            <div className="relative flex-1 overflow-hidden">
              <div className="grid grid-cols-3 gap-2 overflow-y-auto pr-2 h-full">
                {users.map((user, index) => (
                  <AccountRequestCard key={index} fullName={user.fullName} email={user.email} />
                ))}
              </div>
              {/* Gradient overlay */}
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-white pointer-events-none z-10" />
            </div>
          </div>
        </div>
        {/* Books */}
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
      </section>
      
    </div>

  )
}