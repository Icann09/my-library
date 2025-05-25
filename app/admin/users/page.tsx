import BorrowRecordDelBtn from "@/components/admin/BorrowRecordDelBtn";
import UserRoleBtn from "@/components/admin/UserRoleSwitcher";
import ViewIdCardButton from "@/components/admin/ViewIdCardBtn";
import { db } from "@/database/drizzle";
import { borrowRecords, users } from "@/database/schema";
import { eq } from "drizzle-orm";



export default async function Page() {
  // Step 1: Fetch data
  const userList = await db.select().from(users).where(eq(users.status, "APPROVED"));
  const borrowList = await db.select({ userId: borrowRecords.userId }).from(borrowRecords);

  // Step 2: Count borrow records per user
  const borrowCountMap = new Map<string, number>();

  for (const record of borrowList) {
    const userId = record.userId;
    borrowCountMap.set(userId, (borrowCountMap.get(userId) || 0) + 1);
  }

  // Step 3: Add `borrowCount` to each user
  const userListWithBorrowCount = userList.map(user => ({
    ...user,
    borrowCount: borrowCountMap.get(user.id) || 0,
  }));


  // Render
  return (
    <div className="overflow-x-auto p-4">
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
        <tbody>
          {userListWithBorrowCount.map(user => (
            <tr key={user.id} className="border-b hover:bg-gray-50">
              <td className="p-4 flex items-center gap-3">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt="avatar"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                    {user.fullName
                    ?.split(' ')
                    .slice(0, 2) // only take the first two words (first and second name)
                    .map(n => n.charAt(0).toUpperCase())
                    .join('')}
                  </div>
                )}
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
      </table>
    </div>
  );
}


