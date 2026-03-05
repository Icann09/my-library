"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { updateUserRole } from "@/lib/admin/actions/user";


type Role = "USER" | "ADMIN";

const ROLES: Role[] = ["USER", "ADMIN"];

export default function UserRoleSwitcher({
  userId,
  currentRole,
}: {
  userId: string;
  currentRole: Role;
}) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [role, setRole] = useState<Role>(currentRole);
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeRole = async (newRole: Role) => {
    if (newRole === role) {
      setIsOpen(false);
      return;
    }

    try {
      setIsLoading(true);

      // Optimistic UI
      setRole(newRole);

      const res = await updateUserRole(userId, newRole);

      if (res.success) {
        toast.success("Role updated");
        router.refresh();
      } else {
        setRole(currentRole); // rollback
        toast.error("Failed to update role");
      }
    } catch (err) {
      setRole(currentRole); // rollback
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  };

  return (
    <div className="relative">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        disabled={isLoading}
        className={`px-2 py-1 rounded-full text-xs ${
          role === "USER"
            ? "bg-pink-100 text-pink-600"
            : "bg-green-100 text-green-600"
        }`}
      >
        {role}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute bg-white shadow-md rounded-xl border w-28 mt-1 z-10">
          {ROLES.map((roleOption) => (
            <div
              key={roleOption}
              onClick={() => handleChangeRole(roleOption)}
              className={`px-3 py-2 flex items-center gap-2 cursor-pointer hover:bg-gray-100 ${
                role === roleOption ? "font-semibold" : ""
              }`}
            >
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  roleOption === "USER"
                    ? "bg-pink-100 text-pink-600"
                    : "bg-green-100 text-green-600"
                }`}
              >
                {roleOption}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
