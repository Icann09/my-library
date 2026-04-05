"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { adminSideBarLinks } from "@/constants";
import { cn } from "@/lib/utils";

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-white sm:hidden">
      <div className="flex justify-around items-center h-12">
        {adminSideBarLinks.map((link) => {
          const isActive =
            (link.route !== "/admin" &&
              pathname.includes(link.route)) ||
            pathname === link.route;

          return (
            <Link
              key={link.route}
              href={link.route}
              className={cn(
                "flex flex-col items-center justify-center gap-1 p-1.5",
                isActive ? "text-white font-medium bg-primary-admin shadow-sm rounded-sm" : "text-gray-400"
              )}
            >
              <div className="relative w-5 h-5">
                <Image
                  src={link.img}
                  alt={link.text}
                  fill
                  className={cn(
                    "object-contain",
                    isActive && "brightness-0 invert"
                  )}
                />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}