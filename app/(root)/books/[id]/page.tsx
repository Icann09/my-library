import { auth } from "@/auth";
import BookOverview from "@/components/ui/BookOverview";
import BookVideo from "@/components/ui/BookVideo";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { fetchBookWithId } from "@/lib/data";


export const metadata: Metadata = {
  title: "Book Details",
};


export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const session = await auth();

  const [bookDetails] = await fetchBookWithId(id);

  if (!bookDetails) redirect("/404");

  return (
    <div>
      <BookOverview {...bookDetails} userId={session?.user?.id as string} />
      <div className="book-details">
        <div className="flex-[1.5]">
          <section className="flex flex-col gap-7">
            <h3>Video</h3>
            <BookVideo videoUrl={bookDetails.videoUrl}/>
          </section>
          <section className="mt-10 flex flex-col gap-7">
            <h3>Summary</h3>
            <div className="space-y-5 text-xl text-light-100">
            {bookDetails.summary.split("\n").map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
