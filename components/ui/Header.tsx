import Link from "next/link"
import Image from "next/image";
import { Button } from "./button";
import { signOut } from "@/auth";

export default function Header() {
  return (
    <header className="my-10 flex justify-between gap-5">
      <Link href="/">
        <Image src="/logo.png" alt="logo" width={40} height={40}/>
      </Link>
      <ul className="flex flex-row items-center gap-8">
        <li>
          <form action={async() => {
            "use server"
            await signOut();
          }} className="mb-10"> 
            <Button>Logout</Button>
          </form>
          {/* <Link href="/my-profile">
            <Avatar>
              <AvatarFallback className="bg-amber-100 text-black">
                {getInitials(session?.user?.name || "IN")}
              </AvatarFallback>
            </Avatar>
          </Link> */}
        </li>
      </ul>
    </header>
  )
}