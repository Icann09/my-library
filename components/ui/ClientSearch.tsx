// app/search/ClientSearch.tsx

"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import BookCard from "@/components/ui/BookCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Book = {
  id: number;
  title: string;
  department?: string;
  createdAt: string;
};

type ClientSearchProps = {
  latestBooks: Book[];
  genres: string[];
};

export default function ClientSearch({ latestBooks, genres }: ClientSearchProps) {
  const [query, setQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 12;

  const filteredBooks = latestBooks.filter((book) =>
    book.title.toLowerCase().includes(query.toLowerCase()) &&
    (selectedGenre === "" || book.genre === selectedGenre)
  );

  const paginatedBooks = filteredBooks.slice(
    (page - 1) * perPage,
    page * perPage
  );

  const totalPages = Math.ceil(filteredBooks.length / perPage);

  return (
    <main className="px-6 py-10 mx-auto">
      {/* Search */}
      <section className="text-center mb-10">
        <h2 className="text-lg text-gray-400 mb-2">DISCOVER YOUR NEXT GREAT READ:</h2>
        <h1 className="text-4xl font-bold mb-6">
          Explore and Search for <span className="text-yellow-300">Any Book</span> In Our Library
        </h1>
        <div className="max-w-xl mx-auto">
          <Input
            type="text"
            placeholder="Thriller, Mystery..."
            className="w-full px-4 py-3 rounded-lg border border-gray-700"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1); // reset to page 1 when search changes
            }}
          />
        </div>
      </section>

      {/* Filter */}
      <div className="mx-auto max-w-7xl flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-white">Search Results</h3>
        <select
          className="bg-gray-800 text-white border border-gray-700 px-4 py-2 rounded"
          value={selectedGenre}
          onChange={(e) => {
            setSelectedGenre(e.target.value);
            setPage(1); // reset to first page
          }}
        >
          <option value="">All Genres</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>

      {/* Books */}
      <div className="mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-6">
        {paginatedBooks.map((book) => (
          <BookCard key={book.id} {...book} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-10">
        <Button
          variant="ghost"
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        {Array.from({ length: totalPages }).map((_, i) => (
          <Button
            key={i + 1}
            variant={page === i + 1 ? "default" : "ghost"}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </Button>
        ))}

        <Button
          variant="ghost"
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </main>
  );
}
