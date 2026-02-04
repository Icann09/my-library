import BookForm from "@/components/admin/BookForm";
import { Button } from "@/components/ui/button";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";

export default async function Page({ params }: { params: { bookId: string } }) {

  const bookId  = params.bookId 
  const [book] = await db.select().from(books).where(eq(books.id, bookId));

  const bookData = {
    id: book.id,
    title: book.title,
    description: book.description,
    author: book.author,
    genre: book.genre,
    rating: book.rating,
    totalCopies: book.totalCopies,
    coverUrl: book.coverUrl,
    coverColor: book.coverColor,
    videoUrl: book.videoUrl,
    summary: book.summary,
  };


  return (
    <div>
      <Button className="back-btn" asChild>
        <Link href="/admin/books">Go Back</Link>
      </Button>
      <section className="w-full max-w-2xl">
        <BookForm type="update" {...bookData} />
      </section>
    </div>
  );
}
