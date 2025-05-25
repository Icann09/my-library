import BookCover from "@/components/ui/BookCover"
import { Calendar, Eye } from "lucide-react"
import { getInitials } from "@/lib/utils";

interface Props {
  bookAuthor: string;
  bookTitle: string;
  bookCover: string;
  bookColor: string;
  bookGenre: string;
  userFullName: string;
  borrowDate: string;
}

export default function BorrowedBooksCard(props : Props) {
  const {
    bookAuthor,
    bookTitle,
    bookCover,
    bookColor,
    bookGenre,
    userFullName,
    borrowDate,
  } = props;
  
  return (
    <div className="flex gap-2 p-2 bg-admin-gray justify-between rounded-md w-[508px]">
      <BookCover coverColor={bookColor} coverImage={bookCover} variant="small" />
      <div className="flex flex-col justify-between pr-9 w-[340px]">
        <div className="">
          <p className="font-semibold text-lg">{bookTitle}</p>
          <p className="text-sm text-gray-500">By {bookAuthor} • {bookGenre}</p>
        </div>
        <div className="flex items-center gap-1 mt-2 text-gray-500">
          <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold">
            {getInitials(userFullName)}
          </div>
          <p className="text-[10px]">{userFullName}</p>
          <Calendar size={16} className="ml-2"/>
          <span>{borrowDate}</span>
        </div>
      </div>
      <div className="flex items-start">
        <div className="p-2 bg-white rounded-md">
          <Eye className="cursor-pointer hover:text-gray-700" />
        </div>
      </div>
    </div>

  );
}
