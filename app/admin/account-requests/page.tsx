import AccountRequestsTable from "@/components/admin/AccountRequestsTable";
import { fetchAccountRequest } from "@/lib/data";
import { Pagination } from "@/components/admin/Pagination";


export default async function Page({
  searchParams,
}:{
  searchParams?: Promise<{ page?: string }>;
}) {
  const page = Number((await searchParams)?.page ?? 1);
  const limit = 20;

  const { data, total } = await fetchAccountRequest({ page, limit });
  const totalPages = Math.ceil(total / limit);

  return (
    <section className="p-4 mb-10 sm:mb-0">
      <h2 className="text-lg font-semibold mb-4">
        Account Registration Requests
      </h2>

      <div className="overflow-x-auto rounded-lg shadow border">

        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr className="text-center text-gray-700">
              <th className="p-1 md:p-3">Name</th>
              <th className="p-1 md:p-3">Date Joined</th>
              <th className="p-1 md:p-3">University ID No</th>
              <th className="p-1 md:p-3">University ID Card</th>
              <th className="p-1 md:p-3">Actions</th>
            </tr>
          </thead>
          <AccountRequestsTable accountRequests={data} />
        </table>
        <Pagination page={page} totalPages={totalPages} />
      </div>
    </section>
  );
}
