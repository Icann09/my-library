"use client"

import { useState } from "react"
import { updateUserRole } from "@/lib/admin/actions/user";
import { useRouter } from 'next/navigation';
import { toast } from "sonner";
import { Check } from "lucide-react";

type UserRoleBtnProps = {
  role: string | null;
  userId: string;
};

export default function UserRoleBtn({ role, userId }: UserRoleBtnProps) {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hoveredRole, setHoveredRole] = useState<string | null>(null);

  const handleRoleChange = async (userId: string, newRole: "USER" | "ADMIN") => {
    if (role === newRole) {
      setIsDropdownOpen(false);
      return;
    }
    const update = await updateUserRole(userId, newRole);
    console.log("Changing role for user:", userId, "to", newRole);

    if (update.success) {
      toast.success("User role updated successfully");
      router.refresh();
    } else {
      toast.error("User role update failed");
    }
  };

  const roles: ("USER" | "ADMIN")[] = ["USER", "ADMIN"];
  
  return (
    <div className="p-4 relative">
      {isDropdownOpen ? (
        <div className="absolute bg-white shadow-md rounded-xl border w-28 mt-1 z-10 transition-opacity opacity-100">
          {roles.map((roleOption) => (
            <div
              key={roleOption}
              className={`px-3 py-2 flex items-center gap-2 cursor-pointer hover:bg-gray-100 ${
                role === roleOption ? "font-semibold" : ""
              }`}
              onMouseEnter={() => setHoveredRole(roleOption)}
              onMouseLeave={() => setHoveredRole(null)}
              onClick={async () => {
                await handleRoleChange(userId, roleOption);
                setIsDropdownOpen(false);
              }}
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
              {/* Show Check icon only when the role is hovered */}
              {hoveredRole === roleOption && <Check size={16} />}
            </div>
          ))}
        </div>
      ) : (
        <button
          onClick={() => setIsDropdownOpen(true)}
          className={`px-2 py-1 rounded-full text-xs ${
            role === "USER"
              ? "bg-pink-100 text-pink-600"
              : "bg-green-100 text-green-600"
          }`}
        >
          {role}
        </button>
      )}
    </div>
  );
}
