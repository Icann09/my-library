import BookAction from "@/components/admin/BookAction";
import BookCover from "@/components/ui/BookCover";
import { Button } from "@/components/ui/button"; 
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import Link from "next/link";




export default async function Page() {
  const bookRecord = await db.select().from(books);
  console.log(bookRecord[0]);
  return (
    <section className="w-full rounded-2xl bg-white p-4 text-sm">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">All Books</h2>
        <Button className="bg-primary-admin" asChild>
          <Link href="/admin/books/new" className="text-white">
          + Create a New Book
          </Link>
        </Button>
      </div>
      <div className="mt-7 w-full overflow-hidden">Table</div>
      <div className="overflow-x-auto p-4">
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="text-left bg-gray-50">
                  <th className="p-4">Book Title</th>
                  <th className="p-4">Author</th>
                  <th className="p-4">Genre</th>
                  <th className="p-4">Date Created</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {bookRecord.map(book => (
                  <tr key={book.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 flex items-center gap-3">
                      <div className="">
                        <BookCover coverColor={book.coverColor} coverImage={book.coverUrl} variant="extraSmall"/> 
                      </div>
                      <p className="font-semibold">
                        {book.title}
                      </p>
                    </td>
                    <td className="p-4 max-w-40">
                      {book.author}
                    </td>
                    <td className="p-4">
                      {book.genre}
                    </td>
                    <td className="p-4">
                      {new Date(book.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                    </td>
                    <td className="p-4">
                      <BookAction bookId={book.id}/>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
    </section>
  )
}

