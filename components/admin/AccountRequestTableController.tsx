"use client";

import { useEffect, useState } from "react";
import { approveAccountRequest, rejectAccountRequest } from "@/lib/admin/actions/user";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Action = "approve" | "reject";

export default function AccountRequestTableController() {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  useEffect(() => {
    const handler = async (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      const button = target.closest<HTMLButtonElement>("[data-action]");
      if (!button) return;

      const action = button.dataset.action as Action;
      const userId = button.dataset.id;

      if (!action || !userId || loadingId) return;

      setLoadingId(userId);

      try {
        const result =
          action === "approve"
            ? await approveAccountRequest(userId)
            : await rejectAccountRequest(userId);

        if (result.success) {
          toast.success(`Account ${action}d successfully`);
          router.refresh();
        } else {
          toast.error(`Failed to ${action} account`);
        }
      } catch {
        toast.error("Something went wrong");
      } finally {
        setLoadingId(null);
      }
    };

    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [loadingId, router]);

  return null;
}