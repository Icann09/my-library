"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle, Loader2, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import {
  approveAccountRequest,
  rejectAccountRequest,
} from "@/lib/admin/actions/user";
import { useRouter } from "next/navigation";

export default function AccountRequestActionController() {
  const router = useRouter();

  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [action, setAction] = useState<"approve" | "reject" | null>(null);
  const [loading, setLoading] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLTableSectionElement>) => {
    const target = e.target as HTMLElement;
    const btn = target.closest("[data-action]");

    if (!btn) return;

    const actionType = btn.getAttribute("data-action");
    const userId = btn.getAttribute("data-user-id");

    if (!actionType || !userId) return;

    setSelectedUserId(userId);
    setAction(actionType as "approve" | "reject");
  };

  const handleConfirm = async () => {
    if (!selectedUserId || !action) return;

    setLoading(true);

    try {
      const res =
        action === "approve"
          ? await approveAccountRequest(selectedUserId)
          : await rejectAccountRequest(selectedUserId);

      if (res.success) {
        toast.success("Action success");
        router.refresh();
      }
    } finally {
      setLoading(false);
      setAction(null);
      setSelectedUserId(null);
    }
  };

    useEffect(() => {
      const tbody = document.getElementById("account-request-body");
      if (!tbody) return;

      const handler = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const btn = target.closest("[data-action]");
        if (!btn) return;

        const action = btn.getAttribute("data-action");
        const userId = btn.getAttribute("data-user-id");

        if (!action || !userId) return;

        setSelectedUserId(userId);
        setAction(action as "approve" | "reject");
      };

      tbody.addEventListener("click", handler);

      return () => {
        tbody.removeEventListener("click", handler);
      };
    }, []);


  return (
    <>
      <Dialog open={!!action} onOpenChange={() => setAction(null)}>
        <DialogContent className="text-center px-8 py-6 max-w-md">
          <DialogHeader>
            <div className="mx-auto mb-4">
              {action === "approve" ? (
                <CheckCircle className="text-green-600 w-10 h-10" />
              ) : (
                <AlertCircle className="text-red-600 w-10 h-10" />
              )}
            </div>

            <DialogTitle>
              {action === "approve"
                ? "Approve Account Request"
                : "Reject Account Request"}
            </DialogTitle>
          </DialogHeader>

          <Button onClick={handleConfirm} disabled={loading}>
            {loading && (
              <Loader2 className="animate-spin w-4 h-4 mr-2" />
            )}
            Confirm
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
