"use client"

import { adminSideBarLinks } from "@/constants"
import { cn, getInitials } from "@/lib/utils";
import Image from "next/image"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Session } from "next-auth";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";


export default function Sidebar({ session }: { session: Session }) {
  const pathname = usePathname();
  return (
    <div className="admin-sidebar">
      <div>
        <div className="logo">
          <Image src="/icons/admin/logo.svg" alt="logo" height={37} width={37} />
          <h1>My Library</h1>
        </div>
        <div className="mt-10 flex flex-col gap-5">
          {adminSideBarLinks.map((link) => {
            const isSelected = (link.route !== "/admin" && pathname.includes(link.route) && link.route.length > 1) || pathname === link.route;
            return (
              <Link href={link.route} key={link.route}>
                <div className={cn("link", isSelected && "bg-primary-admin shadow-sm",)}>
                  <div className="relative size-5">
                    <Image src={link.img} alt="icon" fill className={isSelected ? "brightness-0 invert" : "object-contain"}/>
                  </div>
                  <p className={cn(isSelected ? "text-white" : "text-dark")}>{link.text}</p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
      <div className="user items-center">
        <Avatar className="size-14">
          <AvatarFallback className="bg-amber-100 font-semibold text-xl">
            {getInitials(session?.user?.name || "IN")}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col max-md:hidden">
          <p className="font-semibold text-dark-200">
          {(session?.user?.name ?? '')
            .split(' ')
            .slice(0, 2)
            .map(n => n.charAt(0).toUpperCase() + n.slice(1).toLowerCase())
            .join(' ')}
          </p>
          <p className="text-light-500 text-xs">{session?.user?.email}</p>
        </div>
        <button
          title="Logout"
          onClick={() => signOut()} // <-- wrap it in a function
        >
          <LogOut className="w-6 h-6 text-red-400 hover:text-red-500" />
        </button>
      </div>
    </div>
  )
}