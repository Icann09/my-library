"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import BookCard from "@/components/ui/BookCard";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useQueryParams } from "@/hooks/useQueryParams";
import { useDebounce } from "@/hooks/useDebounce";
import { useCallback } from "react";


type Props = {
  books: Book[];
  total: number;
  page: number;
  perPage: number;
  query: string;
  genre: string;
  genres: string[];
};

const normalize = (val: string) =>
  val.trim().replace(/\s+/g, " ");

export default function ClientSearch({
  books,
  total,
  page,
  perPage,
  query,
  genre,
  genres,
}: Props) {

  const { updateParams, isPending } = useQueryParams();
  const [searchInput, setSearchInput] = useState(query);

  // sync server → client


  useEffect(() => {
    if (normalize(query) !== normalize(searchInput)) {
      setSearchInput(query);
    }
  }, [query]);

  const debounceSearch = useCallback((val: string) => {

    const normalized = normalize(val);

    if (normalized === query) return;

    updateParams({
      q: normalized || null,
      page: "1",
    });
  }, [updateParams, query]);

  useDebounce(searchInput, 300, true, debounceSearch);

  const totalPages = Math.ceil(total / perPage);

  return (
    <section className="py-3 md:py-10">
      {/* Search */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-6">
          Explore and Search for{" "}
          <span className="text-yellow-300">Any Book</span>
        </h1>

        <div className="max-w-xl mx-auto relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

          <Input
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
            }}
            placeholder="Search books..."
            className="pl-9"
          />
        </div>
      </div>

      {/* Filter */}
      <div className="mx-auto max-w-7xl flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">
          Results for{" "}
          <span className="text-yellow-300">
            {query || "All Books"}
          </span>
        </h3>

        <select
          value={genre}
          onChange={(e) =>
            updateParams({
              genre: e.target.value,
              page: "1",
            })
          }
          className="bg-gray-800 border border-gray-700 px-4 py-2 rounded"
        >
          <option value="">All Genres</option>
          {genres.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>

      {/* Results */}
      <div className="mx-auto max-w-7xl">
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
                disabled={page === 1 || isPending}
                onClick={() =>
                  updateParams({ page: String(page - 1) })
                }
              >
                <ChevronLeft />
              </Button>

              {Array.from({ length: totalPages }).map((_, i) => (
                <Button
                  key={i}
                  variant={page === i + 1 ? "default" : "ghost"}
                  disabled={isPending}
                  onClick={() =>
                    updateParams({ page: String(i + 1) })
                  }
                >
                  {i + 1}
                </Button>
              ))}

              <Button
                disabled={page === totalPages || isPending}
                onClick={() =>
                  updateParams({ page: String(page + 1) })
                }
              >
                <ChevronRight />
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
            <h3 className="text-yellow-300 font-bold">
              No Results Found
            </h3>

            <Button
              onClick={() =>
                updateParams({
                  q: null,
                  genre: null,
                  page: "1",
                })
              }
            >
              Clear Search
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}