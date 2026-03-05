"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { deleteUser } from "@/lib/admin/actions/user";
import { toast } from "sonner";

export default function UserDeleteButton({
  userId,
}: {
  userId : string;
}) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    const res = await deleteUser(userId);

    if (res.success) {
      toast.success("User deleted");
      router.refresh();
    } else {
      toast.error("Failed to delete user");
    }
  };

  return (
    <div className="flex items-center justify-center">
      <Trash2
        onClick={handleDelete}
        className="text-red-600 cursor-pointer"
        size={16}
      />
    </div>
  
  );
}
