import { db } from "@/database/drizzle"
import { users } from "@/database/schema"
import { eq } from "drizzle-orm"
import Image from "next/image";
import ApproveRequestBtn from "@/components/admin/ApproveRequestBtn";
import RejectRequestBtn from "@/components/admin/RejectRequstBtn";
import ViewIdCardButton from "@/components/admin/ViewIdCardBtn";

export default async function Page() {
  const accountRequests = await db.select().from(users).where(eq(users.status, "PENDING"));
  console.log(accountRequests);
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
          <tbody>
            {accountRequests.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="px-4 py-3 flex items-center gap-3">
                  {user.avatarUrl ? (
                    <Image
                      src={user.avatarUrl}
                      alt={user.fullName}
                      width={36}
                      height={36}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 font-medium flex items-center justify-center">
                      {user.fullName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </div>
                  )}
                  <div>
                    <p className="font-medium">{user.fullName}</p>
                    <p className="text-gray-500 text-xs">{user.email}</p>
                  </div>
                </td>
                <td className="px-4 py-3 text-center">
                {user.createdAt
                  ? new Date(user.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                  : "N/A"}
                </td>
                <td className="px-4 py-3 text-center">{user.universityId}</td>
                <td className="px-4 py-3 text-blue-600 font-medium cursor-pointer flex items-center justify-center gap-1 hover:underline">
                  <ViewIdCardButton imageUrl={user.universityCard}/>
                </td>
                <td className="px-4 py-3 text-center"> 
                  <div className="flex justify-center gap-3">
                    <ApproveRequestBtn userId={user.id} />
                    <RejectRequestBtn userId={user.id}/>
                  </div>
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}