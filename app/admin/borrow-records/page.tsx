import { db } from "@/database/drizzle";
import { books, borrowRecords, users } from "@/database/schema";
import { eq } from "drizzle-orm";
import BookCover from "@/components/ui/BookCover";
import BorrowedStatusBtn from "@/components/admin/BorrowedStatusBtn";
import { cn } from "@/lib/utils";




export default async function Page() {
  const isGenerated = false;
  //Fetch data
  const borrowDetails = await db
    .select({
      borrowId: borrowRecords.id,
      borrowDate: borrowRecords.borrowDate,
      dueDate: borrowRecords.dueDate,
      returnDate: borrowRecords.returnDate,
      status: borrowRecords.status,
      userId: users.id,
      fullName: users.fullName,
      email: users.email,
      bookId: books.id,
      bookTitle: books.title,
      coverUrl: books.coverUrl,
      coverColor: books.coverColor,
    })
    .from(borrowRecords)
    .innerJoin(users, eq(borrowRecords.userId, users.id))
    .innerJoin(books, eq(borrowRecords.bookId, books.id));


  
  // Render
  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="text-center bg-gray-50">
            <th className="p-4">Book</th>
            <th className="p-4">User Requested</th>
            <th className="p-4">Status</th>
            <th className="p-4">Borrowed Date</th>
            <th className="p-4">Return Date</th>
            <th className="p-4">Due Date</th>
            <th className="p-4">Receipt</th>
          </tr>
        </thead>
        <tbody>
          {borrowDetails.map(record => (
            <tr key={record.borrowId} className="border-b  hover:bg-gray-50">
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <BookCover coverColor={record.coverColor} coverImage={record.coverUrl} variant="extraSmall"/> 
                  <p className="font-semibold">
                    {record.bookTitle}
                  </p>
                </div>
              </td>
              <td className="p-4 flex items-center gap-3">
                {record.avatar ? (
                  <img
                    src={record.avatar}
                    alt="avatar"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                    {record.fullName
                    ?.split(' ')
                    .slice(0, 2) // only take the first two words (first and second name)
                    .map(n => n.charAt(0).toUpperCase())
                    .join('')}
                  </div>
                )}
                <div>
                  <p className="font-medium">{record.fullName}</p>
                  <p className="text-sm text-gray-500">{record.email}</p>
                </div>
              </td>
              <td className="p-4">
                <BorrowedStatusBtn status={record.status} borrowId={record.borrowId}/>
              </td>
              <td className="p-4 text-center">
                {record.borrowDate
                  ? new Date(record.borrowDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                  : "N/A"}
              </td>
              <td className="p-4 text-center">
                {record.returnDate ? record.returnDate : "N/A"}
              </td>
              <td className="p-4 text-center">
                {record.dueDate}
              </td>
              <td className="p-4 text-center">
                <button
                  disabled={isGenerated}
                  className={cn(
                    "px-3 py-1 text-sm rounded-md text-white transition",
                    isGenerated
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-700"
                  )}
                  onClick={() => {
                    if (isGenerated) {
                      console.log("Generate receipt for", record.borrowId);
                    }
                  }}
                >
                  {isGenerated ? "Receipt Generated" : "Generate Receipt"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


