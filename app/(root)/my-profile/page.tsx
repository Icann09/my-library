
import { auth, signOut } from "@/auth";
import BookList from "@/components/ui/BookList";
import { db } from "@/database/drizzle";
import { books, borrowRecords, users } from "@/database/schema";
import { desc, eq, sql } from "drizzle-orm";
import { InferSelectModel } from "drizzle-orm"; // <-- helper for types
import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import type { Metadata } from "next";



export const metadata: Metadata = {
  title: "Profile",
};
// Base Book type from schema
type Book = InferSelectModel<typeof books>;

// Extended type for borrowed books
type LoanedBook = Book & {
  borrowedAt: Date;
};

export default async function Page() {
  const session = await auth();
  const userId = session?.user?.id;
  const initials = getInitials(session?.user?.name || "IN");
  
  const userUniversity = await db
  .select({
    universityId: users.universityId,
  })
  .from(users)
  .where(eq(users.id, userId))
  .limit(1);

  const universityId = userUniversity[0]?.universityId;

  const borrowedBooks: LoanedBook[] = await db
  .select({
    ...books,                
    borrowedAt: borrowRecords.createdAt,
    dueDate: borrowRecords.dueDate,
    borrowStatus: borrowRecords.status,
    isLoanedBook: sql`
      CASE 
        WHEN ${borrowRecords.status} = 'BORROWED' 
        THEN true 
        ELSE false 
      END
    `.as("isLoanedBook"),
  })
  .from(borrowRecords)
  .innerJoin(books, eq(borrowRecords.bookId, books.id))
  .where(eq(borrowRecords.userId, userId))
  .orderBy(desc(borrowRecords.createdAt));



  return (
  <div className="flex flex-col gap-8 w-full lg:flex-row">
    {/* ID Card */}
    <div className="bg-[linear-gradient(#232839,#12141D)] rounded-2xl w-full max-w-xl mx-auto relative flex flex-col items-center pt-10 pb-8">
      <Image
        src="/images/frame-id.png"
        width={59}
        height={88}
        alt="frame-id"
        className="absolute -top-6 left-1/2 -translate-x-1/2"
      />

      {/* Profile Info */}
      <div className="w-full px-6 flex flex-col gap-6 mt-12">
        {/* Avatar */}
        <div className="flex items-center gap-4">
          <div className="bg-[#323a54] h-20 w-20 rounded-full flex items-center justify-center shrink-0">
            <Avatar className="w-16 h-16">
              <AvatarFallback className="bg-amber-100 text-black font-bold text-2xl">
                {initials}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-xs text-gray-400">Verified student</p>
            <p className="font-bold text-lg">{session?.user?.name}</p>
            <p className="text-sm break-all">{session?.user?.email}</p>
          </div>
        </div>

        {/* University */}
        <div>
          <p className="text-xs text-gray-400">University</p>
          <p className="font-semibold text-lg">Hasanuddin University</p>
        </div>

        {/* Student ID */}
        <div>
          <p className="text-xs text-gray-400">Student ID</p>
          <p className="font-semibold text-lg">{universityId}</p>
        </div>
      </div>

      {/* ID Card Image */}
      <div className="w-full px-6 mt-6">
        <Image
          src="/images/id-card.png"
          alt="id-card"
          width={486}
          height={287}
          className="rounded w-full h-auto"
        />
      </div>
    </div>

    {/* Borrowed Books */}
    <div className="w-full lg:flex-1 min-w-0">
      <BookList
        variant="BorrowedBook"
        title="Borrowed Books"
        books={borrowedBooks}
        containerClassName="flex flex-col justify-around h-full"
      />
    </div>
  </div>
);

}
