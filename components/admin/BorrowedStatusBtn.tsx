"use client";

import { useState } from "react";
import { updateBorrowStatus } from "@/lib/admin/actions/borrow";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Check } from "lucide-react";

type BorrowStatusBtnProps = {
  status: "BORROWED" | "RETURNED" | "LATE RETURN";
  borrowId: string;
  bookId: string;
};

const STATUSES = ["BORROWED", "RETURNED", "LATE RETURN"] as const;

export default function BorrowedStatusBtn({ status, borrowId, bookId }: BorrowStatusBtnProps) {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hoveredStatus, setHoveredStatus] = useState<string | null>(null);

  const handleStatusChange = async (borrowId: string, newStatus: typeof STATUSES[number]) => {
    if (status === newStatus) {
      setIsDropdownOpen(false);
      return;
    }

    const update = await updateBorrowStatus(borrowId, newStatus, bookId, status);
    

    if (update.success) {
      toast.success("Borrow status updated");
      router.refresh();
    } else {
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="relative">
      {isDropdownOpen ? (
        <div className="absolute bg-white shadow-md rounded-xl border w-32 mt-1 z-10">
          {STATUSES.map((statusOption) => (
            <div
              key={statusOption}
              className={`px-3 py-2 flex items-center gap-2 cursor-pointer hover:bg-gray-100 ${
                status === statusOption ? "font-semibold" : ""
              }`}
              onMouseEnter={() => setHoveredStatus(statusOption)}
              onMouseLeave={() => setHoveredStatus(null)}
              onClick={async () => {
                await handleStatusChange(borrowId, statusOption);
                setIsDropdownOpen(false);
              }}
            >
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  statusOption === "BORROWED"
                    ? "bg-purple-100 text-purple-700"
                    : statusOption === "RETURNED"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {statusOption}
              </span>
              {hoveredStatus === statusOption && <Check size={16} />}
            </div>
          ))}
        </div>
      ) : (
        <button
          onClick={() => setIsDropdownOpen(true)}
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            status === "BORROWED"
              ? "bg-purple-100 text-purple-700"
              : status === "RETURNED"
              ? "bg-blue-100 text-blue-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {status ?? "UNKNOWN"}
        </button>
      )}
    </div>
  );
}
