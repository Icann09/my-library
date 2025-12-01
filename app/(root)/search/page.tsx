// app/search/page.tsx

import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { desc } from "drizzle-orm";
import ClientSearch from "@/components/ui/ClientSearch";

export default async function SearchPage() {
  const rawBooks = await db
    .select()
    .from(books)
    .orderBy(desc(books.createdAt))
    .limit(50);

  // ❗ Convert Date → string so they can be passed safely to a client component
  const latestBooks = rawBooks.map((book) => ({
    ...book,
    createdAt: book.createdAt.toISOString(),
  }));

  const genres = [...new Set(latestBooks.map((book) => book.genre))];

  return <ClientSearch latestBooks={latestBooks} genres={genres} />;
}
