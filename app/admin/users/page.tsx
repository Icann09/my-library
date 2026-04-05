import { Pagination } from "@/components/admin/Pagination";
import UsersTable from "@/components/admin/UsersTable";
import { UsersTableSkeleton } from "@/components/ui/Skeletons";
import { fetchUsersWithBorrowCount } from "@/lib/data";
import { Suspense } from "react";




export default async function Page({ searchParams }: { searchParams?: Promise<{ page?: string }> }) {
  const page = Number((await searchParams)?.page) || 1;
  const limit = 10;
  const { data: users, total } = await fetchUsersWithBorrowCount({ page, limit });
  const totalPages = Math.ceil(total / limit);


  return (
    <section className="overflow-x-auto p-4 mb-10 sm:mb-0">
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
          <UsersTable users={users} />
        </Suspense>
      </table>
      <Pagination page={page} totalPages={totalPages} />
    </section>
  );
}


