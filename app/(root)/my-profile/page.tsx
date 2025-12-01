
import { auth, signOut } from "@/auth";
import BookList from "@/components/ui/BookList";
import { db } from "@/database/drizzle";
import { books, borrowRecords, users } from "@/database/schema";
import { desc, eq, sql } from "drizzle-orm";
import { InferSelectModel } from "drizzle-orm"; // <-- helper for types
import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";

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
    <div className="flex flex-col justify-between w-full gap-8 md:flex-row">
      <div className="bg-[linear-gradient(#232839,#12141D)] rounded-2xl max-w-[566px] h-[768px] relative flex flex-col justify-between items-center pt-6 flex-1/2 pb-16">
        <Image src="/images/frame-id.png" width={59} height={88} alt="frame-id" 
        className="absolute top-[-20px] left-1/2 -translate-x-1/2"/>
        <div className="relative top-24 w-[486px] h-[295px] flex flex-col gap-5">
          <div className="flex gap-4 items-center">
            <div className="bg-[#323a54] h-24 w-24 rounded-full flex items-center justify-center">
              <Avatar className="w-20 h-20 ">
                <AvatarFallback className="bg-amber-100 text-black font-bold text-4xl">
                  {initials}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm">verified student</p>
              <p className="font-bold text-xl">{session?.user?.name}</p>
              <p>{session?.user?.email}</p>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-sm">University</p>
            <p className="font-semibold text-xl">Hasanuddin University</p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-sm">Student ID</p>
            <p className="font-semibold text-xl">{universityId}</p>
          </div>
        </div>
        <div>
          <Image 
            src="/images/id-card.png" 
            alt="id-card"  
            width={486} 
            height={287}
            className="rounded"
          />
        </div>
      </div>
      <div className="flex-1/2">
        <BookList variant="BorrowedBook" title="Borrowed Books" books={borrowedBooks} />
      </div>
    </div>
  );
}
