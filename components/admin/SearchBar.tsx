"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";
import { searchAdmin } from "@/lib/admin/actions/search";
import { useCallback, useState } from "react";

type Result = {
  id: string;
  type: "book" | "user";
  title: string;
  subtitle?: string;
};

export default function AdminSearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [open, setOpen] = useState(false);

  const router = useRouter();
  

   const handleSearch = useCallback(async (val: string) => {
    if (!val.trim()) {
      setResults([]);
      setOpen(false);
      return;
    }

    try {
      const res = await searchAdmin(val);
      setResults(res || []);
      setOpen(res && res.length > 0);
    } catch (error) {
      console.error("Search failed:", error);
      setResults([]);
      setOpen(false);
    }
  }, []); // ✅ Empty deps = stable forever

  // ✅ Now works perfectly
  useDebounce(query, 300, query.length > 0, handleSearch);

  const handleSelect = (item: Result) => {
    setOpen(false);
    setQuery("");

    if (item.type === "book") {
      router.push(`/admin/books/${item.id}`);
    } else {
      router.push(`/admin/users/${item.id}`);
    }
  };

  return (
    <div className="relative w-full max-w-[450px]">
      {/* Input */}
      <div className="flex items-center gap-2 rounded-md bg-white border border-gray-300 px-4 py-2 md:py-3 shadow-sm">
        <Search className="text-gray-500 size-5" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search users, books..."
          className="outline-none w-full text-sm md:text-base bg-transparent"
        />
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute top-full left-0 w-full mt-2 bg-white border rounded-md shadow-lg z-50 max-h-[300px] overflow-y-auto">
          {results.length > 0 ? (
            results.map((item) => (
              <div
                key={`${item.type}-${item.id}`}
                onClick={() => handleSelect(item)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex flex-col"
              >
                <span className="font-medium">{item.title}</span>
                {item.subtitle && (
                  <span className="text-xs text-gray-500">
                    {item.subtitle}
                  </span>
                )}
              </div>
            ))
          ) : (
            <p className="p-4 text-sm text-gray-500">
              No results found
            </p>
          )}
        </div>
      )}
    </div>
  );
}