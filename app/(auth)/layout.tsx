import { auth } from "@/auth"
import { redirect } from "next/navigation";
import Image from "next/image"

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if(session) redirect("/");
  return (
    <main className="auth-container">
      <section className="auth-form">
        <div className="auth-box gradient-vertical">
          <div className="flex flex-row gap-3">
           <Image src="/icons/logo.svg" alt="logo" width={37} height={37}/>
           <h1 className="text-2xl font-semibold text-white">BookWises</h1>
          </div>
          <div>
            {children}
          </div>
        </div>
      </section>
      <section className="auth-illustration">
        <Image src="/images/auth-illustration.png" alt="auth illustration" width={1000} height={1000} className="size-full object-cover"/>
      </section>
    </main>
  )
}