"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import BookCard from "@/components/ui/BookCard";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";


type ClientSearchProps = {
  books: Book[];
  total: number;
  page: number;
  perPage: number;
  query: string;
  genre: string;
};


export default function ClientSearch({
  books,
  total,
  page,
  perPage,
  query,
  genre,
  genres
}: ClientSearchProps & { genres: string[] }) {

  const router = useRouter();
  const pathname = usePathname();

  const [input, setInput] = useState(query);
  const [isTyping, setIsTyping] = useState(false);

  

  const updateParams = (params: Record<string, string | null>) => {
  const sp = new URLSearchParams(window.location.search);

  Object.entries(params).forEach(([key, value]) => {
    if (!value) sp.delete(key);
    else sp.set(key, value);
  });

  router.replace(`${pathname}?${sp.toString()}`);
};
  // sync from server
  useEffect(() => {
    setInput(query);
    setIsTyping(false);   // 👈 server update
  }, [query]);
  // only fire when USER types
  useEffect(() => {
    if (!isTyping) return;

    const id = setTimeout(() => {
      updateParams({
        q: input || null,
        page: "1",
      });
    }, 300);

    return () => clearTimeout(id);
  }, [input, isTyping]);

  const totalPages = Math.ceil(total / perPage);

  

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
              onChange={(e) => {
                setInput(e.target.value);
                setIsTyping(true);   // 👈 mark user interaction
              }}
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
          value={genre}
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
        {books.length > 0 ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-6">
              {books.map((book) => (
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
