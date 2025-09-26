import { Button } from "@/components/ui/button";
import { auth, signOut } from "@/auth";
import BookList from "@/components/ui/BookList";
import { db } from "@/database/drizzle";
import { books, borrowRecords } from "@/database/schema";
import { desc, eq } from "drizzle-orm";
import { InferSelectModel } from "drizzle-orm"; // <-- helper for types

// Base Book type from schema
type Book = InferSelectModel<typeof books>;

// Extended type for borrowed books
type LoanedBook = Book & {
  borrowedAt: Date;
};

export default async function Page() {
  const session = await auth();
  const userId = session?.user?.id;

  const borrowedBooks: LoanedBook[] = await db
    .select({
      ...books,                // ✅ Drizzle auto expands book columns
      borrowedAt: borrowRecords.createdAt,
    })
    .from(borrowRecords)
    .innerJoin(books, eq(borrowRecords.bookId, books.id))
    .where(eq(borrowRecords.userId, userId))
    .orderBy(desc(borrowRecords.createdAt));

  return (
    <div>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
        className="mb-10"
      >
        <Button>Logout</Button>
      </form>

      <BookList title="Borrowed Books" books={borrowedBooks} />
    </div>
  );
}
