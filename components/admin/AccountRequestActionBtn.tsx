"use client";

import { approveAccountRequest, rejectAccountRequest } from "@/lib/admin/actions/user";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";  
import { toast } from "sonner";

export default function AccountRequestActionBtn({ action, userId }: { action: "approve" | "reject"; userId: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAction = async () => {
    setLoading(true);
    try {
      const res =
        action === "approve"
          ? await approveAccountRequest(userId)
          : await rejectAccountRequest(userId);

      if (res.success) {
        toast.success("Action success");
        router.refresh();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleAction}
      className={`px-3 py-1 rounded ${
        action === "approve"
          ? "bg-green-200 text-green-800 hover:bg-green-300"
          : "bg-transparent"
      }`}
      disabled={loading}
    >
      {loading ? <Loader2 size={16} className="animate-spin" /> : action === "approve" ? "Approve Account" : <p className="w-4 h-4 rounded-full border-red-500 border-2 flex justify-center items-center text-red-500">×</p>}
    </button>
  );
}   