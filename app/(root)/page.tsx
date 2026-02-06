import BookOverview from "@/components/ui/BookOverview";
import BookList from "@/components/ui/BookList";
import { auth } from "@/auth";
import { getLatestBooks } from "@/lib/data";


export default async function Home() {
  const session = await auth();
  if (!session?.user) throw new Error("Not authenticated");


  const latestBooks = await getLatestBooks();

  if (!latestBooks.length) {
    return <p>No books available</p>;
  }

  const featuredBooks = latestBooks[0];
  const popularBooks = latestBooks.slice(1,13);
  return (
    <>
      <BookOverview {... featuredBooks} userId={session?.user?.id as string} />
      <BookList
        variant="Book" 
        title="Popular Books" 
        books={popularBooks} 
        containerClassName="mt-20 mx-auto max-w-7xl flex flex-col items-center py-2"
      />
    </>
  )
}