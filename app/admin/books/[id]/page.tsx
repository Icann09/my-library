import BookCover from "@/components/ui/BookCover";
import { Button } from "@/components/ui/button";
import { fetchBookWithId } from "@/lib/data";
import Link from "next/link";
import { Calendar } from "lucide-react";
import { dateFormat } from "@/lib/utils";
import { Pencil } from "lucide-react";
import BookVideo from "@/components/ui/BookVideo";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";




export default async function page({ params }: {params: { id: string } }) {
  const id = params.id;

  const book = await fetchBookWithId(id);


  if (!book) {
    notFound();
  }

  

  return (
    <div className="flex flex-col gap-5">
      <div>
        <Button className="bg-white hover:bg-primary-admin  text-black hover:text-white " asChild>
          <Link href="/admin/books" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            <span>Go Back</span>
          </Link> 
        </Button>
      </div>
      <div className="flex flex-col md:flex-row gap-6 md:gap-8">
        <div
          className="backdrop-blur-md w-full md:w-72 h-60 flex justify-center items-center rounded-md"
          style={{ backgroundColor: `${book[0].coverColor}30` }}
        >
          <BookCover coverColor={book[0].coverColor} coverImage={book[0].coverUrl} variant="medium"/>
        </div>
        <div className="flex flex-col gap-3 md:justify-between">
          <div className="flex gap-2 text-[#64748B]">
              <p>Created at:</p>
              <p className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {dateFormat(book[0].createdAt)}
              </p>

          </div>
          <h3 className="font-semibold text-xl">{book[0].title}</h3>
          <p className="font-semibold">By {book[0].author}</p>
          <p className="text-[#64748B] text-sm">{book[0].genre}</p>
          <Button
            asChild
            className="w-full bg-primary-admin hover:underline hover:bg-white hover:text-black"
          >
            <Link href={`/admin/books/edit/${book[0].id}`} className="flex items-center gap-2">
              <Pencil className="h-4 w-4" />
              Edit Book
            </Link>
          </Button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-6 md:gap-8">
        <div className="flex-1">
          <h3 className="font-semibold py-2">Summary</h3>
          <p className="text-[#64748B]">
            {book[0].summary}
          </p>
        </div>
        <div className="w-full md:w-[438px] shrink-0">
          <h3 className="font-semibold py-2">Video</h3>
          <BookVideo videoUrl={book[0].videoUrl} />
        </div>
      </div>
    </div>
  )
}
