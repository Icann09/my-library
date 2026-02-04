import { fetchAccountRequest } from "@/lib/data"
import ViewIdCardButton from "../ViewIdCardBtn";
import ApproveRequestBtn from "../ApproveRequestBtn";
import RejectRequestBtn from "../RejectRequstBtn";


export default async function AccountRequestsTable() {
  const accountRequests = await fetchAccountRequest();

  return (
  <tbody>
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
          <div className="flex justify-center gap-3">
            <ApproveRequestBtn userId={user.id} />
            <RejectRequestBtn userId={user.id}/>
          </div>
          
        </td>
      </tr>
    ))}
  </tbody>
    )
  }
