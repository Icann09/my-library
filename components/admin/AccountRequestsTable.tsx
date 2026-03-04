import ViewIdCardButton from "./ViewIdCardBtn";
import AccountRequestActionBtn from "./AccountRequestActionBtn";

export default function AccountRequestsTable({
  accountRequests,
}: {
  accountRequests: any[];
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

          <td className="px-4 py-3 text-center">
            <ViewIdCardButton imageUrl={user.universityCard} />
          </td>

          <td className="px-4 py-3 text-center">
            <AccountRequestActionBtn action="approve" userId={user.id} />
            <AccountRequestActionBtn action="reject" userId={user.id} />
          </td>
        </tr>
      ))}
    </tbody>
  );
}
