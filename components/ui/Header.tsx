"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { LogOutIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "./avatar"; // Adjust path if needed
import { getInitials } from "@/lib/utils"; // Helper to get initials


export default function Header({ session }: { session: any })  {
  const pathname = usePathname();
  const user = session?.user;
  const initials = getInitials(user?.name || "IN");



  return (
    <header className="hidden md:flex w-full mx-auto my-6 px-4 justify-between items-center ">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <Image src="/logo.png" alt="logo" width={40} height={40} />
        <h1 className="hidden lg:flex text-2xl font-semibold font-bebas-neue">My Library</h1>
      </Link>

      <div className="flex items-center gap-6 min-w-[180px] justify-center">
        {/* Navigation */}
        <nav className="flex items-center gap-6 whitespace-nowrap">
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
          <span
            className={`text-lg font-medium ${
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
          className="text-red-400 hover:text-red-500 transition-colors cursor-pointer"
        >
          <LogOutIcon className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
}
