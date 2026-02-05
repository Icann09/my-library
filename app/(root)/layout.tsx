 import Header from "@/components/ui/Header";
 import { redirect } from "next/navigation";
 import { auth } from "@/auth";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq, and, ne } from "drizzle-orm";
import MobileNavigation from "@/components/ui/MobileNavigation";
 
 
 export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if(!session) redirect("/sign-in");

  if (session?.user?.id) {
    const today = new Date().toISOString().slice(0, 10);
    await db
      .update(users)
      .set({ lastActivityDate: today })
      .where(
        and(
          eq(users.id, session.user.id),
          ne(users.lastActivityDate, today)
        )
      );
  }
  return (
    <main className="root-container">
       <div className="">
        <MobileNavigation session={session}/>
        <Header session={session}/>
        <div className="mt-10 pb-20 items-center">{children}
        </div>
       </div>
    </main>
  );
}