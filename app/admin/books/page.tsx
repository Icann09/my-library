
import BooksTable from "@/components/admin/BooksTable";
import { Pagination } from "@/components/admin/Pagination";
import { Button } from "@/components/ui/button";
import { BooksTableSkeleton } from "@/components/ui/Skeletons";
import { fetchBooksAdmin } from "@/lib/data";
import Link from "next/link";
import { Suspense } from "react";


export default async function Page({ searchParams }: { searchParams?: Promise<{ page?: string }> }) {
  const page = Number((await searchParams)?.page) || 1;
  const limit = 10;
  const { data: books, total } = await fetchBooksAdmin({ page, limit });
  const totalPages = Math.ceil(total / limit);


  return (
    <section className="w-full rounded-2xl bg-white p-4 text-sm">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">All Books</h2>
        <Button className="bg-primary-admin" asChild>
          <Link href="/admin/books/new" className="text-white">
            + Create a New Book
          </Link>
        </Button>
      </div>
      <div className="mt-7 w-full overflow-hidden">
        <div className="overflow-x-auto p-4">
          <table className="min-w-full table-auto border-collapse" id="books-table">
            <thead>
              <tr className="text-left bg-gray-50">
                <th className="p-4">Book Title</th>
                <th className="p-4">Author</th>
                <th className="p-4">Genre</th>
                <th className="p-4">Date Created</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <Suspense fallback={<BooksTableSkeleton />}>
              <BooksTable books={books} />
            </Suspense>
          </table>
          <Pagination page={page} totalPages={totalPages} />
        </div>
      </div>
    </section>
  );
}