"use client";

import { useMemo } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import BookCard from "@/components/ui/BookCard";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";


type ClientSearchProps = {
  latestBooks: Book[];
  genres: string[];
};

export default function ClientSearch({ latestBooks, genres }: ClientSearchProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // URL-based state
  const query = searchParams.get("q") ?? "";
  const selectedGenre = searchParams.get("genre") ?? "";
  const page = Number(searchParams.get("page") ?? "1");
  const [input, setInput] = useState(query);

  useEffect(() => {
    setInput(query);
  }, [query]);


  const perPage = 12;

  const updateParams = useCallback(
    (params: Record<string, string | null>) => {
      const sp = new URLSearchParams(searchParams.toString());

      Object.entries(params).forEach(([key, value]) => {
        if (!value) sp.delete(key);
        else sp.set(key, value);
      });

      router.push(`${pathname}?${sp.toString()}`);
    },
    [router, pathname, searchParams]
  );

  useEffect(() => {
    const id = setTimeout(() => {
      updateParams({
        q: input || null,
        page: "1",
      });
    }, 300); // debounce delay

    return () => clearTimeout(id);
  }, [input]);


  const filteredBooks = useMemo(() => {
    return latestBooks.filter(
      (book) =>
        book.title.toLowerCase().includes(query.toLowerCase()) &&
        (selectedGenre === "" || book.genre === selectedGenre)
    );
  }, [latestBooks, query, selectedGenre]);

  const totalPages = Math.ceil(filteredBooks.length / perPage);

  const paginatedBooks = useMemo(() => {
    return filteredBooks.slice((page - 1) * perPage, page * perPage);
  }, [filteredBooks, page]);

  return (
    <section className="py-3  md:py-10" aria-labelledby="search-page-heading">
      {/* Search */}
      <div className="text-center mb-10">
        <h2 className="text-lg text-gray-400 mb-2">
          DISCOVER YOUR NEXT GREAT READ:
        </h2>
        <h1 id="search-page-heading" className="text-4xl font-bold mb-6">
          Explore and Search for{" "}
          <span className="text-yellow-300">Any Book</span> In Our Library
        </h1>

        <div className="max-w-xl mx-auto relative">
          <label htmlFor="book-search" className="sr-only">
            Search books by title
          </label>
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              aria-hidden="true"
            />

            <Input
              id="book-search"
              type="text"
              placeholder="Search books by title…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="pl-9"
              aria-describedby="search-help"
            />
          </div>
          <p id="search-help" className="sr-only">
            Results update automatically as you type
          </p>
        </div>
      </div>

      {/* Filter */}
      <div className="mx-auto max-w-7xl flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">
          Search Results for{" "}
          <span className="text-yellow-300">{query || "All Books"}</span>
        </h3>
        <label htmlFor="genre-filter" className="sr-only">
          Filter books by genre
        </label>
        <select
          id="genre-filter"
          className="bg-gray-800 border border-gray-700 px-4 py-2 rounded"
          value={selectedGenre}
          onChange={(e) =>
            updateParams({
              genre: e.target.value,
              page: "1",
            })
          }
        >
          <option value="">All Genres</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>

      {/* Results */}
      <div
        className="mx-auto max-w-7xl"
        aria-live="polite"
        aria-busy={false}
      >
        {paginatedBooks.length > 0 ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-6">
              {paginatedBooks.map((book) => (
                <BookCard key={book.id} {...book} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-2 mt-10">
              <Button
                variant="ghost"
                disabled={page === 1}
                aria-label="Previous page"
                onClick={() => updateParams({ page: String(page - 1) })}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              {Array.from({ length: totalPages }).map((_, i) => (
                <Button
                  aria-current={page === i + 1 ? "page" : undefined}
                  key={i + 1}
                  variant={page === i + 1 ? "default" : "ghost"}
                  onClick={() =>
                    updateParams({ page: String(i + 1) })
                  }
                >
                  {i + 1}
                </Button>
              ))}

              <Button
                variant="ghost"
                disabled={page === totalPages}
                aria-label="Next page"
                onClick={() => updateParams({ page: String(page + 1) })}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <Image
              src="/images/not-found.png"
              alt="not found"
              width={200}
              height={200}
            />
            <h3 className="text-yellow-300 font-bold text-lg">
              No Results Found
            </h3>
            <p>Try different keywords or filters.</p>
            <Button
              onClick={() => updateParams({ q: null, genre: null, page: null })}
              className="bg-yellow-300 text-black"
            >
              CLEAR SEARCH
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
