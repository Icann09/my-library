import BooksTable from "@/components/admin/BooksTable";
import { Button } from "@/components/ui/button";
import { BooksTableSkeleton } from "@/components/ui/Skeletons";
import Link from "next/link";
import { Suspense } from "react";


export default async function Page() {

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
      <div className="mt-7 w-full overflow-hidden">Table</div>
      <div className="overflow-x-auto p-4">
            <table className="min-w-full table-auto border-collapse">
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
                <BooksTable />
              </Suspense>
            </table>
          </div>
    </section>
  )
}

