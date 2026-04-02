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
          <td className="p-4">
            <Link
              href={`/admin/books/${book.id}`}
              className="flex items-center gap-3 hover:underline"
            >
              <BookCover
                coverColor={book.coverColor}
                coverImage={book.coverUrl}
                variant="extraSmall"
              />
              <p className="font-semibold">{book.title}</p>
            </Link>
          </td>
          <td className="p-4 max-w-40">{book.author}</td>
          <td className="p-4">{book.genre}</td>

          <td className="p-4">
            {book.createdAt
              ? new Date(book.createdAt).toLocaleDateString("en-US")
              : "—"}
          </td>
          <td className="p-4 items-center">
            <BookDeleteButton bookId={book.id} />
          </td>
        </tr>
      ))}
    </tbody>
  );
}
