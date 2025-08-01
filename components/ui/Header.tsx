"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { LogOutIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "./avatar"; // Adjust path if needed
import { getInitials } from "@/lib/utils"; // Helper to get initials

export default function Header() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const user = session?.user;
  const initials = getInitials(user?.name || "IN");
  console.log(user);

  return (
    <header className="my-10 flex justify-between items-center px-4">
      {/* Logo */}
      <Link href="/">
        <Image src="/logo.png" alt="logo" width={40} height={40} />
      </Link>

      <div className="flex items-center gap-8">
        {/* Navigation */}
        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className={`text-lg font-medium ${
              pathname === "/" ? "text-yellow-300" : "text-gray-400"
            }`}
          >
            Home
          </Link>
          <Link
            href="/search"
            className={`text-lg font-medium ${
              pathname === "/search" ? "text-yellow-300" : "text-gray-400"
            }`}
          >
            Search
          </Link>
        </nav>

        {/* Profile */}
        <Link href="/my-profile" className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback className="bg-amber-100 text-black font-bold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <span className={`text-lg font-medium ${
            pathname === "/my-profile" ? "text-yellow-300" : "text-gray-400"
            }`}
          >
            {user.name || "Guest"}
          </span>
        </Link>

        {/* Logout button */}
        <button
          onClick={() => signOut()}
          aria-label="Log out"
          className="text-red-400 hover:text-red-500 transition-colors"
        >
          <LogOutIcon className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
}
