import BookOverview from "@/components/ui/BookOverview";
import BookList from "@/components/ui/BookList";
import { auth } from "@/auth";
import { fetchBooksUser } from "@/lib/data";


export default async function Home() {
  const session = await auth();
  if (!session?.user) throw new Error("Not authenticated");


  const latestBooks = await fetchBooksUser();

  if (!latestBooks.length) {
    return <p>No books available</p>;
  }

  const featuredBooks = latestBooks[0];
  return (
    <>
      <BookOverview {... featuredBooks} userId={session?.user?.id as string} />
      <BookList
        variant="Book" 
        title="Popular Books" 
        books={latestBooks} 
        containerClassName="mt-20 mx-auto max-w-7xl flex flex-col items-center py-2"
      />
    </>
  )
}