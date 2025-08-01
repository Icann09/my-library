// app/search/page.tsx

import ClientSearch from "@/components/ui/ClientSearch";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { desc } from "drizzle-orm";


export default async function SearchPage() {
  const latestBooks = await db
    .select()
    .from(books)
    .orderBy(desc(books.createdAt))
    .limit(50);

  const genres = [...new Set(latestBooks.map((book) => book.genre))];

  return <ClientSearch latestBooks={latestBooks} genres={genres} />;
}
