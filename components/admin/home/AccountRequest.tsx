import Link from "next/link";
import AccountRequestCard from "./AccountRequestCard";
import { fetchAccountRequest } from "@/lib/data";

export default async function AccountRequest() {
  const accountRequest = await fetchAccountRequest();

  return (
    <div className="p-[10px] rounded-xl border border-[#E4E4F0] bg-white max-w-[540px] h-[380px] flex flex-col relative">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Account Requests</h2>
        <Link href="/admin/account-requests">
          <button className="text-sm font-semibold text-blue-800 cursor-pointer bg-admin-gray p-2 rounded-sm hover:text-blue-600">View all</button>
        </Link>
      </div>
      {/* Scrollable content with gradient overlay */}
      <div className="relative flex-1 overflow-hidden">
        <div className="grid grid-cols-3 gap-2 overflow-y-auto pr-2 h-full">
          {accountRequest.map((account, index) => (
            <AccountRequestCard key={index} fullName={account.fullName} email={account.email} />
          ))}
        </div>
        {/* Gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-white pointer-events-none z-10" />
      </div>
    </div>
  )
}
