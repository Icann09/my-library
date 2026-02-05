// UsersTable.tsx (SERVER)
import BorrowRecordDelBtn from "@/components/admin/BorrowRecordDelBtn";
import ViewIdCardButton from "@/components/admin/ViewIdCardBtn";
import UserRoleBtn from "@/components/admin/UserRoleSwitcher";
import { fetchUsersWithBorrowCount } from "@/lib/data";


export default async function UsersTable() {
  const users = await fetchUsersWithBorrowCount();

  return (
    <tbody>
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
          <UserRoleBtn userId={user.id} role={user.role}/>
        </td>
        <td className="p-4 text-center">{user.borrowCount}</td>
        <td className="p-4 text-center">{user.universityId}</td>
        <td className="p-4 text-center">
          <ViewIdCardButton imageUrl={user.universityCard}/>
        </td>
        <td className="p-4 text-center">
          <BorrowRecordDelBtn userId={user.id} />
        </td>
      </tr>
    ))}
    </tbody>
  );
}
