import { Loader2 } from "lucide-react";

export default function AccountRequestActionBtn({
  userId,
  loadingAction,
}: {
  userId: string;
  loadingAction?: "approve" | "reject" | null;
}) {
  return (
    <td className="px-4 py-3 text-center space-x-2">
      <button
        data-action="approve"
        data-id={userId}
        className="px-3 py-1 rounded bg-green-200 text-green-800 hover:bg-green-300"
      >
        {loadingAction === "approve" ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          "Approve"
        )}
      </button>

      <button
        data-action="reject"
        data-id={userId}
        className="px-3 py-1 text-red-600"
      >
        {loadingAction === "reject" ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          "Reject"
        )}
      </button>
    </td>
  );
}