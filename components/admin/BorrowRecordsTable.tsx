import { fetchBorrowDetails } from "@/lib/data";
import BookCover from "@/components/ui/BookCover";
// import BorrowedStatusBtn from "./BorrowedStatusBtn";
// import BorrowReceiptBtn from "./BorrowReceiptBtn";
// import BorrowTableBody from "./BorrowRecordsController";
import { cn } from "@/lib/utils";
import BorrowRecordController from "./BorrowRecordsController";



const STATUSES = ["BORROWED", "RETURNED", "LATE RETURN"] as const;


export default async function BorrowRecordsTable() {
  const borrowDetails = await fetchBorrowDetails();
  

  return (
    <BorrowRecordController >
      {borrowDetails.map((record) => {
        const status = record.status as typeof STATUSES[number];
        return (
        <tr key={String(record.borrowId)} className="border-b  hover:bg-gray-50">
          <td className="p-4">
            <div className="flex items-center gap-3">
              <BookCover coverColor={record.coverColor} coverImage={record.coverUrl} variant="extraSmall"/> 
              <p className="font-semibold">
                {record.bookTitle}
              </p>
            </div>
          </td>
          <td className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
              {record.fullName
              ?.split(' ')
              .slice(0, 2) // only take the first two words (first and second name)
              .map(n => n.charAt(0).toUpperCase())
              .join('')}
            </div>
            <div>
              <p className="font-medium">{record.fullName}</p>
              <p className="text-sm text-gray-500">{record.email}</p>
            </div>
          </td>
          <td className="p-4">
            {/* status button component */}
            {/* <BorrowedStatusBtn status={record.status} borrowId={record.borrowId} bookId={record.bookId}/> */}
            <div className="relative">
              <button
                data-action="toggle-status"
                data-borrow-id={record.borrowId}
                data-book-id={record.bookId}
                data-current-status={status}
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  status === "BORROWED"
                    ? "bg-purple-100 text-purple-700"
                    : status === "RETURNED"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {status}
              </button>
              {/* Hidden Dropdown HTML (SSR only) */}
              <div
                data-dropdown
                className="hidden absolute bg-white shadow-md rounded-xl border w-32 mt-1 z-10"
              >
                {STATUSES.map((s) => (
                  <div
                    key={s}
                    data-action="change-status"
                    data-new-status={s}
                    className="px-3 py-2 flex items-center gap-2 cursor-pointer hover:bg-gray-100"
                  >
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        s === "BORROWED"
                          ? "bg-purple-100 text-purple-700"
                          : s === "RETURNED"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {s}
                    </span>
                  </div>
                ))}
              </div>
            </div>

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
            {record.returnDate ? String(record.returnDate) : "N/A"}
          </td>
          <td className="p-4 text-center">
            {String(record.dueDate)}
          </td>
          <td className="p-4 text-center">
            {/* Borrow receipt button */}
            <div>
              <button
                data-action="generate-receipt"
                data-borrow-id={record.borrowId}
                data-generated={record.receiptIsGenerated ? "true" : "false"}
                disabled={record.receiptIsGenerated}
                className={cn(
                  "px-3 py-1 text-sm rounded-md text-white transition",
                  record.receiptIsGenerated
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700"
                )}
              >
                {record.receiptIsGenerated ? "Receipt Generated" : "Generate Receipt"}
              </button>
            </div>
            {/* <BorrowReceiptBtn 
              borrowId={String(record.borrowId)}
              isGenerated={Boolean(record.receiptIsGenerated)}
            /> */}
          </td>
        </tr>
      )})}
    </BorrowRecordController>
  )
}
