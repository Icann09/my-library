// BooksTable.tsx (SERVER)
import BookCover from "@/components/ui/BookCover";
import Link from "next/link";
import BookDeleteButton from "./BookDeleteBtn";

interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  createdAt: Date;
  coverUrl: string;
  coverColor: string;
}

export default async function BooksTable({ books }: { books: Book[] }) {

  return (
    <tbody>
      {books.map((book) => (
        <tr key={book.id} className="border-b hover:bg-gray-50">
          <td className="p-1 md:p-3 flex">
            <Link
              href={`/admin/books/${book.id}`}
              className="flex items-center gap-3 hover:underline"
            >
              <BookCover
                coverColor={book.coverColor}
                coverImage={book.coverUrl}
                variant="extraSmall"
              />
              <p className="font-semibold truncate max-w-[150px] sm:max-w-[250px]">{book.title}</p>
            </Link>
          </td>
          <td className="p-1 md:p-3 max-w-[150px] truncate sm:max-w-[250px]">{book.author}</td>
          <td className="p-1 md:p-3">{book.genre}</td>

          <td className="p-1 md:p-3">
            {book.createdAt
              ? new Date(book.createdAt).toLocaleDateString("en-US")
              : "—"}
          </td>
          <td className="p-1 md:p-3 text-center">
            <BookDeleteButton bookId={book.id} />
          </td>
        </tr>
      ))}
    </tbody>
  );
}
