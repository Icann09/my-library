import BorrowRecordsTable from "@/components/admin/home/BorrowRecordsTable";
import { BorrowRecordsTableSkeleton } from "@/components/ui/Skeletons";
import { Suspense } from "react";

export default async function Page() {

  return (
    <div className="overflow-x-auto p-4">
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
          <BorrowRecordsTable />
        </Suspense>
      </table>
    </div>
  );
}


