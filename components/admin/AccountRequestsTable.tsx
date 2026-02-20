import { fetchAccountRequest } from "@/lib/data"
import ViewIdCardButton from "./ViewIdCardBtn";


export default async function AccountRequestsTable() {
  const accountRequests = await fetchAccountRequest();
  

  return (

    <tbody id="account-request-body">
    {accountRequests.map((user) => (
      <tr key={user.id} className="border-t">
        <td className="px-4 py-3 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 font-medium flex items-center justify-center">
              {user.fullName
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </div>
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
          <div>
            {/* Account Actions */}
            <div className="flex gap-3 py-3 text-center">
              <button
                data-action="approve"
                data-user-id={user.id}
                className="cursor-pointer bg-green-200 text-green-800 hover:bg-green-300 px-3 py-1 rounded"
              >
                Approve Account
              </button>

              <button
                data-action="reject"
                data-user-id={user.id}
                className="bg-transparent cursor-pointer"
              >
                <p className="w-4 h-4 rounded-full border-red-500 border-2 flex justify-center items-center text-red-500">
                  ×
                </p>
              </button>
            </div>

          </div>
        </td>
      </tr>
    ))}
    </tbody>
    )
  }
