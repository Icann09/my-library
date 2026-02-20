// app/search/page.tsx

import ClientSearch from "@/components/ui/ClientSearch";
import { fetchBooksCountFiltered, fetchBooksSearch } from "@/lib/data";
import type { Metadata } from "next";
import { fetchGenres } from "@/lib/data";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Search Books",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    genre?: string;
    page?: string;
  }>;
}) {
  const params = await searchParams;

  const query = params.q ?? "";
  const genre = params.genre ?? "";
  const page = Number(params.page ?? "1");
  const perPage = 12;

  const total  = await fetchBooksCountFiltered({ query, genre });

  const totalPages = Math.max(1, Math.ceil(total / perPage));
  
  if (page > totalPages) {
    redirect(`/search?page=${totalPages}`);
  }

  // 👇 clamp invalid page
  const safePage = Math.min(page, totalPages);

  const [{ books }, genres] = await Promise.all([
    fetchBooksSearch({
      query,
      genre,
      page: safePage,
      perPage
    }),
    fetchGenres(),
  ]);

  return (
    <ClientSearch
      books={books}
      total={total}
      page={page}
      perPage={perPage}
      query={query}
      genre={genre}
      genres={genres}
    />
  );
}
