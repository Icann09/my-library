import AccountRequestActionBtn from "./AccountRequestActionBtn";


interface AccountRequest {
  id: string;
  fullName: string;
  email: string;
  createdAt: Date | null;
  universityId: number;
  universityCard: string;
} 


export default function AccountRequestsTable({
  accountRequests,
}: {
  accountRequests: AccountRequest[];
}) {
  return (
    <tbody>
      {accountRequests.map((user) => (
        <tr key={user.id} className="border-t">
          <td className="px-4 py-3">
            <p className="font-medium">{user.fullName}</p>
            <p className="text-gray-500 text-xs">{user.email}</p>
          </td>

          <td className="px-4 py-3 text-center">
            {user.createdAt
              ? new Date(user.createdAt).toLocaleDateString("en-US")
              : "N/A"}
          </td>

          <td className="px-4 py-3 text-center">
            {user.universityId}
          </td>

          <td className="px-4 py-3 flex justify-center">
            {/* <ViewIdCardButton imageUrl={user.universityCard} /> */}
            <button
              data-id-card
              data-image={user.universityCard}
              className="text-blue-600 hover:underline flex items-center gap-1"
            >
              View ID Card
            </button>
          </td>
          <AccountRequestActionBtn userId={user.id} />
        </tr>
      ))}
    </tbody>
  );
}
