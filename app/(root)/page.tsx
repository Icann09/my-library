import BookOverview from "@/components/ui/BookOverview";
import BookList from "@/components/ui/BookList";
import { sampleBooks } from "@/constants";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";



export default async function Home() {
  const result = await db.select().from(users);
  console.log(JSON.stringify(result, null, 2));
  return (
    <>
      <BookOverview {...sampleBooks[0]}/>
      <BookList title="Latest Books" books={sampleBooks} containerClassname="mt-20"/>
    </>
  )
}