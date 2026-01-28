import { fetchBorrowDetails } from "@/lib/data";
import BorrowedBooksCard from "./BorrowedBooksCard";
import Link from "next/link";
import { dateFormat } from "@/lib/utils";

export default async function BorrowRequest() {
  const borrowDetails = await fetchBorrowDetails();
  const isEmpty = borrowDetails.length === 0;
  // const isEmpty = true;

  return (
    <div className="p-[10px] rounded-xl border border-[#E4E4F0] bg-white max-w-[540px] h-[380px]">
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-xl font-semibold text-gray-900">
          Borrow Requests
        </h2>

        <Link href="/admin/borrow-records">
          <button className="text-sm font-semibold text-blue-800 bg-admin-gray p-2 rounded-sm hover:text-blue-600">
            View all
          </button>
        </Link>
      </div>

      <div className="relative flex flex-col gap-3 max-h-[300px] w-full overflow-y-auto pr-2 rounded-md">
        {isEmpty ? (
          <p className="text-sm text-gray-500 text-center py-10">
            No borrow requests
          </p>
        ) : (
          borrowDetails.map((borrowedBook) => (
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
          ))
        )}
      </div>

      {/* fade-out gradient */}
      <div className="pointer-events-none absolute bottom-[10px] left-[10px] right-[10px] h-[75px] bg-gradient-to-b from-transparent to-white" />
    </div>
  );
}
