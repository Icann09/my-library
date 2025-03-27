import { Button } from "@/components/ui/button";
import { signOut } from "@/auth";
import BookList from "@/components/ui/BookList";
import { sampleBooks } from "@/constants";

export default function Page() {
  return (
    <div>
      <form action={async() => {
        "use server"
        await signOut();
      }} className="mb-10"> 
        <Button>Logout</Button>
      </form>
      <BookList title="Borrowed Books" books={sampleBooks}/>
    </div>
    

  )
}