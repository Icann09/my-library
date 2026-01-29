import { fetchBorrowDetails } from "@/lib/data";
import BookCover from "@/components/ui/BookCover";
import BorrowedStatusBtn from "../BorrowedStatusBtn";
import BorrowReceiptBtn from "../BorrowReceiptBtn";


export default async function BorrowRecordsTable() {
  const borrowDetails = await fetchBorrowDetails();

  return (
    <tbody>
      {borrowDetails.map(record => (
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
            {record.returnDate ? String(record.returnDate) : "N/A"}
          </td>
          <td className="p-4 text-center">
            {String(record.dueDate)}
          </td>
          <td className="p-4 text-center">
            <BorrowReceiptBtn 
              borrowId={String(record.borrowId)}
              isGenerated={Boolean(record.receiptIsGenerated)}
            />
          </td>
        </tr>
      ))}
    </tbody>
  )
}
