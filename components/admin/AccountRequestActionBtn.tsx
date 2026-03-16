"use client";

import { approveAccountRequest, rejectAccountRequest } from "@/lib/admin/actions/user";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type Action = "approve" | "reject" | null;

export default function AccountRequestActionBtn({ userId }: { userId: string }) {
  const [loadingAction, setLoadingAction] = useState<Action>(null);
  const router = useRouter();

  async function handleAction(e: React.MouseEvent<HTMLTableCellElement>) {
    const button = (e.target as HTMLElement).closest<HTMLButtonElement>("[data-action]");
    if (!button || loadingAction) return;

    const action = button.dataset.action as Action;
    const id = button.dataset.id;

    if (!action || !id) return;

    setLoadingAction(action);

    try {
      const result =
        action === "approve"
          ? await approveAccountRequest(id)
          : await rejectAccountRequest(id);

      if (result.success) {
        toast.success(`Account ${action}d successfully`);
        router.refresh();
      } else {
        toast.error(`Failed to ${action} account`);
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoadingAction(null);
    }
  }

  return (
    <td className="px-4 py-3 text-center space-x-2" onClick={handleAction}>
      <button
        data-action="approve"
        data-id={userId}
        disabled={loadingAction !== null}
        className="px-3 py-1 rounded bg-green-200 text-green-800 hover:bg-green-300 disabled:opacity-50"
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
        disabled={loadingAction !== null}
        className="px-3 py-1 text-red-600 disabled:opacity-50"
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