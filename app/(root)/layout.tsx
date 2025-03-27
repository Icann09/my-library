 import Header from "@/components/ui/Header";
 import { redirect } from "next/navigation";
 import { auth } from "@/auth";
 
 
 export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if(!session) redirect("/sign-in");
  return (
    <main className="root-container">
       <div className="mx-auto mx-w-7xl">
        <Header session={session}/>
        
        <div className="mt-20 pb-20">{children}</div>
       </div>
    </main>
  );
}