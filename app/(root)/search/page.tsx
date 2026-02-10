// app/search/page.tsx

import ClientSearch from "@/components/ui/ClientSearch";
import { fetchBooksUser } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search Books",
};

export default async function SearchPage() {

  const latestBooks = await fetchBooksUser();
  const genres = [...new Set(latestBooks.map((book) => book.genre).filter(Boolean))];

  return (
    <ClientSearch
      latestBooks={latestBooks}
      genres={genres}
    />
  );
}
