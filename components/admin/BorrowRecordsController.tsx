"use client";

import { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { updateBorrowStatus } from "@/lib/admin/actions/borrow";
import { toast } from "sonner";
import { generateReceipt } from "@/lib/admin/actions/borrow";

export default function BorrowRecordController({
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
      // 1️⃣ TOGGLE STATUS DROPDOWN
      // ===============================
      const toggleBtn = target.closest("[data-action='toggle-status']");
      if (toggleBtn) {
        const dropdown = toggleBtn.nextElementSibling as HTMLElement;
        dropdown?.classList.toggle("hidden");
        return;
      }

      // ===============================
      // 2️⃣ CHANGE BORROW STATUS
      // ===============================
      const changeBtn = target.closest("[data-action='change-status']");
      if (changeBtn) {
        const dropdown = changeBtn.closest("[data-dropdown]");
        const parentBtn = dropdown?.previousElementSibling as HTMLElement;

        const borrowId = parentBtn?.dataset.borrowId;
        const bookId = parentBtn?.dataset.bookId;
        const currentStatus = parentBtn?.dataset.currentStatus;
        const newStatus = changeBtn.getAttribute("data-new-status");

        if (!borrowId || !bookId || !newStatus) return;

        const res = await updateBorrowStatus(
          borrowId,
          newStatus as any,
          bookId,
          currentStatus as any
        );

        if (res.success) {
          // imperative cleanup before refresh
          (dropdown as HTMLElement)?.classList.add("hidden");

          toast.success("Status updated");

          requestAnimationFrame(() => {
            router.refresh();
          });
        } else {
          toast.error("Update failed");
        }

        return;
      }

      // ===============================
      // 3️⃣ GENERATE RECEIPT
      // ===============================
      const generateBtn = target.closest("[data-action='generate-receipt']");
      if (generateBtn) {
        const btn = generateBtn as HTMLButtonElement;

        const borrowId = btn.dataset.borrowId;
        const alreadyGenerated = btn.dataset.generated === "true";

        if (!borrowId || alreadyGenerated) return;

        btn.textContent = "Sending...";
        btn.disabled = true;

        const res = await generateReceipt(borrowId);

        if (res.success) {
          btn.textContent = "Receipt Generated";
          btn.classList.remove("bg-indigo-600", "hover:bg-indigo-700");
          btn.classList.add("bg-gray-300", "cursor-not-allowed");
          btn.dataset.generated = "true";

          toast.success("Receipt generated");

          requestAnimationFrame(() => {
            router.refresh();
          });
        } else {
          btn.textContent = "Generate Receipt";
          btn.disabled = false;
          toast.error("Failed to generate receipt");
        }

        return;
      }
    };

    table.addEventListener("click", handler);
    return () => table.removeEventListener("click", handler);
  }, [router]);

  return <tbody ref={tableRef}>{children}</tbody>;
}