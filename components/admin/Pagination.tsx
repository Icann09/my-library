import Link from "next/link";

export function Pagination({
  page,
  totalPages,
}: {
  page: number;
  totalPages: number;
}) {
  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      {/* Previous */}
      <Link
        href={`?page=${page - 1}`}
        className={`px-3 py-1.5 rounded-md border text-sm transition
          ${page === 1
            ? "pointer-events-none opacity-50"
            : "hover:bg-gray-100"
          }`}
      >
        ← Prev
      </Link>

      {/* Page Info */}
      <div className="px-4 py-1.5 text-sm font-medium text-gray-600">
        Page <span className="text-black">{page}</span> of{" "}
        <span className="text-black">{totalPages}</span>
      </div>

      {/* Next */}
      <Link
        href={`?page=${page + 1}`}
        className={`px-3 py-1.5 rounded-md border text-sm transition
          ${page === totalPages
            ? "pointer-events-none opacity-50"
            : "hover:bg-gray-100"
          }`}
      >
        Next →
      </Link>
    </div>
  );
}