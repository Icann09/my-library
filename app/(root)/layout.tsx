 import Header from "@/components/ui/Header";
 import { redirect } from "next/navigation";
 import { auth } from "@/auth";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import MobileNavigation from "@/components/ui/MobileNavigation";
 
 
 export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if(!session) redirect("/sign-in");

  if (session?.user?.id) {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, session.user.id))
      .limit(1);
    const today = new Date().toISOString().slice(0, 10);
    if (user.length === 0 || user[0].lastActivityDate !== today) {
      await db
        .update(users)
        .set({ lastActivityDate: today })
        .where(eq(users.id, session.user.id));
    }
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