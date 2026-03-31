"use client";

import { useState, useTransition } from "react";
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
  const [isOpen, setIsOpen] = useState(false);
  const [role, setRole] = useState<Role>(currentRole);
  const [isPending, startTransition] = useTransition();

  function handleChangeRole(newRole: Role) {
    if (newRole === role) {
      setIsOpen(false);
      return;
    }

    // Optimistic UI
    setRole(newRole);
    setIsOpen(false);

    startTransition(async () => {
      const res = await updateUserRole(userId, newRole);

      if (res.success) {
        toast.success("Role updated");
      } else {
        setRole(currentRole); // rollback
        toast.error("Failed to update role");
      }
    });
  }

  return (
    <div className="relative">
      {/* Toggle */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        disabled={isPending}
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
            <button
              key={roleOption}
              onClick={() => handleChangeRole(roleOption)}
              className={`w-full text-left px-3 py-2 flex items-center gap-2 hover:bg-gray-100 ${
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
            </button>
          ))}
        </div>
      )}
    </div>
  );
}