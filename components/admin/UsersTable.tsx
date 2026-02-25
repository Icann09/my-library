// UsersTable.tsx (SERVER)
import ViewIdCardButton from "@/components/admin/ViewIdCardBtn";
import { fetchUsersWithBorrowCount } from "@/lib/data";
import { Trash2 } from "lucide-react";
import UsersTableController from "./home/UsersTableController";



export default async function UsersTable() {
  const users = await fetchUsersWithBorrowCount();
  const ROLES: ("USER" | "ADMIN")[] = ["USER", "ADMIN"];

  return (
    <UsersTableController>
    {users.map(user => (
      <tr key={user.id} className="border-b hover:bg-gray-50">
        <td className="p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
            {user.fullName
            ?.split(' ')
            .slice(0, 2) // only take the first two words (first and second name)
            .map(n => n.charAt(0).toUpperCase())
            .join('')}
          </div>
        <div>
            <p className="font-medium">{user.fullName}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </td>
        <td className="p-4 text-center">
          {user.createdAt
            ? new Date(user.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })
            : "N/A"}
        </td>
        <td className="p-4 text-center">
          {/* Users Role Switcher Component */}
          {/* =============================== */}

          <div className="relative">
            {/* Toggle Button */}
            <button
              data-action="toggle-role"
              data-user-id={user.id}
              data-current-role={user.role}
              className={`px-2 py-1 rounded-full text-xs ${
                user.role === "USER"
                  ? "bg-pink-100 text-pink-600"
                  : "bg-green-100 text-green-600"
              }`}
            >
              {user.role}
            </button>

            {/* Dropdown */}
            <div
              data-dropdown-role
              className="absolute bg-white shadow-md rounded-xl border w-28 mt-1 z-10 hidden"
            >
              {ROLES.map((roleOption) => (
                <div
                  key={roleOption}
                  data-action="change-role"
                  data-new-role={roleOption}
                  className={`px-3 py-2 flex items-center gap-2 cursor-pointer hover:bg-gray-100 ${
                    user.role === roleOption ? "font-semibold" : ""
                  }`}
                >
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      roleOption === "USER"
                        ? "bg-pink-100 text-pink-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {roleOption}
                  </span>
                </div>
              ))}
            </div>
          </div>
          {/* =============================== */}
        </td>
        <td className="p-4 text-center">{user.borrowCount}</td>
        <td className="p-4 text-center">{user.universityId}</td>
        <td className="p-4 text-center">
          <ViewIdCardButton imageUrl={user.universityCard}/>
        </td>
        <td className="p-4 text-center">
          {/* Users Delete Button */}
          {/* =============================== */}
          <button 
            data-action="delete-user"
            data-user-id={user.id}
            className="text-red-500 hover:text-red-700">
            <Trash2 size={18} />
          </button>
          {/* =============================== */}
        </td>
      </tr>
    ))}
    </UsersTableController>

  );
}
