import UsersTable from "@/components/admin/UsersTable";
import { UsersTableSkeleton } from "@/components/ui/Skeletons";
import { Suspense } from "react";




export default async function Page() {
  
  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-50 text-center">
            <th className="p-4 text-center">Name</th>
            <th className="p-4">Date Joined</th>
            <th className="p-4">Role</th>
            <th className="p-4">Books Borrowed</th>
            <th className="p-4">University ID No</th>
            <th className="p-4">University ID Card</th>
            <th className="p-4">Action</th>
          </tr>
        </thead>
        <Suspense fallback={<UsersTableSkeleton />}>
          <UsersTable />
        </Suspense>
      </table>
    </div>
  );
}


