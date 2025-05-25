import BookForm from "@/components/admin/BookForm"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Page() {
  return (
    <div>
      <Button className="back-btn" asChild>
        <Link href="/admin/books">Go Back</Link>
      </Button>
      <section className="w-full max-w-2xl">
        <BookForm type="create"/>
      </section>
    </div>
  )
}