import BorrowRecordsTable from "@/components/admin/BorrowRecordsTable";
import { Pagination } from "@/components/admin/Pagination";
import { BorrowRecordsTableSkeleton } from "@/components/ui/Skeletons";
import { fetchBorrowDetails } from "@/lib/data";
import { Suspense } from "react";

export default async function Page({ searchParams }: { searchParams?: Promise<{ page?: string }> }) {

  const page = Number((await searchParams)?.page ?? 1);
  const limit = 10;
  const { data, total } = await fetchBorrowDetails({ page, limit });
  const totalPages = Math.ceil(total / limit);

  return (
    <section className="overflow-x-auto p-4 mb-10 sm:mb-0">
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="text-center bg-gray-50">
            <th className="p-4">Book</th>
            <th className="p-4">User Requested</th>
            <th className="p-4">Status</th>
            <th className="p-4">Borrowed Date</th>
            <th className="p-4">Return Date</th>
            <th className="p-4">Due Date</th>
            <th className="p-4">Receipt</th>
          </tr>
        </thead>
        <Suspense fallback={<BorrowRecordsTableSkeleton />}>
          <BorrowRecordsTable borrowRecords={data}/>
        </Suspense>
      </table>
      <Pagination page={page} totalPages={totalPages} />
    </section>
  );
}


