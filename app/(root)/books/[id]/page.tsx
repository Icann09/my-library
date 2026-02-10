import { auth } from "@/auth";
import BookOverview from "@/components/ui/BookOverview";
import BookVideo from "@/components/ui/BookVideo";
import type { Metadata } from "next";
import { fetchBookWithId } from "@/lib/data";
import { notFound } from "next/navigation";


export const metadata: Metadata = {
  title: "Book Details",
};


export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // ✅ THIS is the key

  const [session, [bookDetails]] = await Promise.all([
    auth(),
    fetchBookWithId(id),
  ]);

  if (!bookDetails) notFound();

  return (
    <div>
      <BookOverview {...bookDetails} userId={session?.user?.id as string} />

      <div className="book-details">
        <div className="flex-[1.5]">
          <section className="flex flex-col gap-7">
            <h3>Video</h3>
            <BookVideo videoUrl={bookDetails.videoUrl} />
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

