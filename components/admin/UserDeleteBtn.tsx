"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { deleteUser } from "@/lib/admin/actions/user";
import { toast } from "sonner";

export default function UserDeleteButton({ userId }: { userId: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this user? This action cannot be undone.")) return;

    try {
      const res = await deleteUser(userId);
      if (res.success) {
        toast.success("User deleted successfully");
        router.refresh();
      } else {
        toast.error(res.error || "Failed to delete user");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors flex items-center justify-center w-10 h-10"
      title="Delete user"
      aria-label="Delete user"
    >
      <Trash2 size={16} />
    </button>
  );
}