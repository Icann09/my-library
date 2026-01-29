import { db } from "@/database/drizzle"
import { users } from "@/database/schema"
import { eq } from "drizzle-orm"
import Image from "next/image";
import ApproveRequestBtn from "@/components/admin/ApproveRequestBtn";
import RejectRequestBtn from "@/components/admin/RejectRequstBtn";
import ViewIdCardButton from "@/components/admin/ViewIdCardBtn";
import { fetchAccountRequest } from "@/lib/data";
import AccountRequestsTable from "@/components/admin/home/AccountRequestsTable";
import { Suspense } from "react";
import { AccountRequestsTableSkeleton } from "@/components/ui/Skeletons";

export default async function Page() {
  // const accountRequests = await db.select().from(users).where(eq(users.status, "PENDING"));
  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold mb-4">Account Registration Requests</h2>
      <div className="overflow-x-auto rounded-lg shadow border">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr className="text-center text-gray-700">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Date Joined</th>
              <th className="px-4 py-2">University ID No</th>
              <th className="px-4 py-2">University ID Card</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <Suspense fallback={<AccountRequestsTableSkeleton />}>
            <AccountRequestsTable />
          </Suspense>
        </table>
      </div>
    </div>
  );
}