// UsersTable.tsx (SERVER)
import ViewIdCardButton from "@/components/admin/ViewIdCardBtn";
import UserDeleteButton from "./UserDeleteBtn";
import UserRoleSwitcher from "./UserRoleSwitcher";
import Link from "next/link";

interface User {
  id: string;
  fullName: string;
  email: string;
  createdAt: Date | null;
  role: "USER" | "ADMIN" | null;
  universityId: number;
  universityCard: string;
  borrowCount: number;
}

export default async function UsersTable({ users }: { users: User[] }) {


  return (
      <tbody className="text-sm">
        {users.map(user => (
          <tr key={user.id} className="border-b hover:bg-gray-50">
            <td className="p-1 md:p-3"> 
              <Link href={`/admin/users/${user.id}`} className="flex items-center gap-3">
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
              </Link>
              </td>
              <td className="p-1 md:p-3 text-center min-w-[120px]">
                {user.createdAt
                  ? new Date(user.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                  : "N/A"}
            
              </td>
              <td className="p-1 md:p-3 text-center">
                {/* Users Role Switcher Component */}
                {/* =============================== */}

                <UserRoleSwitcher
                  userId={user.id}
                  currentRole={user.role === "ADMIN" ? "ADMIN" : "USER"}
                />

                {/* =============================== */}
              </td>
              <td className="p-1 md:p-3 text-center">{user.borrowCount}</td>
              <td className="p-1 md:p-3 text-center">{user.universityId}</td>
              <td className="p-1 md:p-3 text-center min-w-[120px]">
                <ViewIdCardButton imageUrl={user.universityCard} />
              </td>
              <td className="p-1 md:p-3 text-center">
                {/* Users Delete Button */}
                <UserDeleteButton userId={user.id} />
              </td>
            </tr>
          ))}
      </tbody>
  );
}
