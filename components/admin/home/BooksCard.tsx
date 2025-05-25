import BookCover from "@/components/ui/BookCover";
import { Calendar } from "lucide-react";


interface Props {
  title: string;
  author: string;
  genre: string;
  createdAt: string;
  coverColor: string;
  coverUrl: string;
}

export default function BooksCard(props: Props) {
  const {
    title,
    author,
    genre,
    createdAt,
    coverUrl,
    coverColor,
  } = props;
  return (
    <div className="flex items-center gap-4 p-2 bg-white rounded-md w-[508px]">
      <BookCover coverColor={coverColor} coverImage={coverUrl} variant="small" />
      <div className="flex flex-col justify-between pr-9 text-[14px]">
        <div className="">
          <p className="font-semibold text-lg">{title}</p>
          <p className="text-sm text-gray-500">By {author} • {genre}</p>
        </div>
        <div className="flex items-center gap-1 mt-2 text-gray-500">
          <Calendar size={14}/>
          <span>{createdAt}</span>
        </div>
      </div>
    </div>
  )
}
