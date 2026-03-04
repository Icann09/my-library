import Link from "next/link";

export function Pagination({
  page,
  totalPages,
}: {
  page: number;
  totalPages: number;
}) {
  return (
    <div className="flex justify-center gap-4 mt-6">
      {page > 1 && (
        <Link href={`?page=${page - 1}`} className="px-3 py-1 border rounded">
          Previous
        </Link>
      )}

      <span>
        Page {page} of {totalPages}
      </span>

      {page < totalPages && (
        <Link href={`?page=${page + 1}`} className="px-3 py-1 border rounded">
          Next
        </Link>
      )}
    </div>
  );
}
