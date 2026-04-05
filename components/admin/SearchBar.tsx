import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="flex items-center gap-2 rounded-md bg-white border border-gray-300 px-4 py-2 md:py-3 w-full max-w-[450px] shadow-sm">
      <Search className="text-gray-500 size-5" />
      <input
        type="text"
        placeholder="Search users, books by title, author, or genre."
        className="outline-none border-none text-sm md:text-base w-full placeholder:text-gray-500 bg-transparent"
      />
    </div>
  );
}
