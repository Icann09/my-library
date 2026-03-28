// BooksTable.tsx (SERVER)
import { fetchBooksAdmin } from "@/lib/data";
import BookCover from "@/components/ui/BookCover";
import Link from "next/link";
import BookDeleteButton from "./BookDeleteBtn";

export default async function BooksTable() {
  const bookRecord = await fetchBooksAdmin();

  return (
    <tbody>
      {bookRecord.map((book) => (
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
