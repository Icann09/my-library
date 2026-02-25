"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { updateUserRole, deleteUser } from "@/lib/admin/actions/user";
import { toast } from "sonner";

export default function UsersTableController({
  children,
}: {
  children: React.ReactNode;
}) {
  const tableRef = useRef<HTMLTableSectionElement>(null);
  const router = useRouter();

  useEffect(() => {
    const table = tableRef.current;
    if (!table) return;

    const handler = async (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // ===============================
      // 1️⃣ TOGGLE ROLE DROPDOWN
      // ===============================
      const toggleBtn = target.closest("[data-action='toggle-role']");
      if (toggleBtn) {
        const dropdown = toggleBtn.nextElementSibling as HTMLElement;
        dropdown?.classList.toggle("hidden");
        return;
      }

      // ===============================
      // 2️⃣ CHANGE USER ROLE
      // ===============================
      const changeRoleBtn = target.closest("[data-action='change-role']");
      if (changeRoleBtn) {
        const dropdown = changeRoleBtn.closest(
          "[data-dropdown-role]"
        ) as HTMLElement;

        const parentBtn = dropdown?.previousElementSibling as HTMLElement;

        const userId = parentBtn?.dataset.userId;
        const newRole = changeRoleBtn.getAttribute("data-new-role");

        if (!userId || !newRole) return;

        const res = await updateUserRole(userId, newRole as any);

        if (res.success) {
          dropdown?.classList.add("hidden");

          toast.success("Role updated");

          requestAnimationFrame(() => {
            router.refresh();
          });
        } else {
          toast.error("Update failed");
        }

        return;
      }

      // ===============================
      // 3️⃣ DELETE USER
      // ===============================
      const deleteBtn = target.closest("[data-action='delete-user']");
      if (deleteBtn) {
        const userId = deleteBtn.getAttribute("data-user-id");
        if (!userId) return;

        const confirmed = confirm(
          "Are you sure you want to delete this user's records?"
        );
        if (!confirmed) return;

        const res = await deleteUser(userId);

        if (res.success) {
          toast.success("User deleted");

          requestAnimationFrame(() => {
            router.refresh();
          });
        } else {
          toast.error("Delete failed");
        }

        return;
      }
    };

    table.addEventListener("click", handler);

    return () => {
      table.removeEventListener("click", handler);
    };
  }, [router]);

  return <tbody ref={tableRef}>{children}</tbody>;
}