"use client"

import Image from "next/image";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Separator } from "./separator";
import { Avatar, AvatarFallback } from "./avatar"; 
import { getInitials } from "@/lib/utils";
import { signOut } from "next-auth/react";
import { LogOutIcon } from "lucide-react";






interface Props {
  $id: string,
  accountId: string,
  fullName: string, 
  avatar: string,
  email: string,
}


export default function MobileNavigation({ session }: { session: any })  {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const user = session?.user;
  const initials = getInitials(user?.name || "IN");
  return (
    <header className="flex h-[60px] justify-between px-5 py-7 md:hidden">
      <Link href="/">
        <Image src="/logo.png" alt="logo" width={40} height={40} />
      </Link>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <Image src="/icons/menu.svg" alt="menu" width={30} height={30}/>
        </SheetTrigger>
        <SheetContent className="shad-sheet h-screen px-3">
          <SheetTitle>
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
            <Separator className="mb-4 bg-light-200/20"/>
          </SheetTitle>
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
          <Separator className="my-5 bg-light-200/20"/>
          <div className="flex flex-col justify-between gap-5">
            <button
              onClick={() => signOut()}
              aria-label="Log out"
              className="text-red-400 hover:text-red-500 transition-colors"
            >
              <LogOutIcon className="w-6 h-6" />
            </button>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  )
}
