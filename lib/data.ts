import { db } from "@/database/drizzle";
import { books, borrowRecords, users } from "@/database/schema";
import { eq, lt, and, sql, desc } from "drizzle-orm"
import { subHours } from "date-fns";
import { unstable_cache } from "next/cache";


export  const getLatestBooks  = unstable_cache(
    async () => {
      return await db
        .select()
        .from(books)
        .orderBy(desc(books.createdAt))
        .limit(50);
    },
    ["latest-books"],
    { revalidate: 3600 }
  );

export const fetchBorrowDetails = async () => {
  const borrowDetails = await db
    .select({
      borrowId: borrowRecords.id,
      borrowDate: borrowRecords.borrowDate,
      dueDate: borrowRecords.dueDate,
      returnDate: borrowRecords.returnDate,
      status: borrowRecords.status,
      userId: users.id,
      fullName: users.fullName,
      email: users.email,
      bookId: books.id,
      bookTitle: books.title,
      bookAuthor: books.author,
      bookGenre: books.genre,
      coverUrl: books.coverUrl,
      coverColor: books.coverColor,
      receiptIsGenerated: borrowRecords.receiptIsGenerated, 
    })
    .from(borrowRecords)
    .innerJoin(users, eq(borrowRecords.userId, users.id))
    .innerJoin(books, eq(borrowRecords.bookId, books.id));
  return borrowDetails;
};

export const fetchAccountRequest = async () => {
  const accountRequest = await db
    .select({
      id: users.id,
      fullName: users.fullName,
      email: users.email,
      createdAt: users.createdAt,
      universityId: users.universityId,
      universityCard: users.universityCard,
    })
    .from(users)
    .where(eq(users.status, "PENDING"));
  return accountRequest;
}

export const fetchBooks = async () => {
  const bookList = await db 
    .select({
      id: books.id,
      title: books.title,
      author: books.author,
      genre: books.genre,
      createdAt: books.createdAt,
      coverUrl: books.coverUrl,
      coverColor: books.coverColor
    }).from(books);
  return bookList;
}

export const fetchStatsData = async () => {
    const date24HoursAgo = subHours(new Date(), 24);
      // Data counts
    const totalUsers = await db.$count(users, eq(users.status, "APPROVED"));
    const totalUsersBefore24Hours = await db
    .select({ count: sql<number>`count(*)` })
    .from(users)
    .where(and(lt(users.createdAt, date24HoursAgo), eq(users.status, 'APPROVED')));

    const totalBooks = await db.$count(books);
    const totalBooksBefore24Hours = await db
    .select({ count: sql<number>`count(*)` })
    .from(books)
    .where(lt(books.createdAt, date24HoursAgo));

    const totalBorrowRecord = await db.$count(borrowRecords);
    const totalBorrowedBooksBefore24Hours = await db
      .select({ count: sql<number>`count(*)` })
      .from(borrowRecords)
      .where(lt(borrowRecords.borrowDate, date24HoursAgo));

    const growthUsers = totalUsers - (totalUsersBefore24Hours[0]?.count ?? 0);
    const growthBooks = totalBooks - (totalBooksBefore24Hours[0]?.count ?? 0);
    const growthBorrowedBooks = totalBorrowRecord - (totalBorrowedBooksBefore24Hours[0]?.count ?? 0);

    return {
      usersStats: { value: growthUsers, total: totalUsers, title: "Total Users" },
      booksStats: { value: growthBooks, total: totalBooks, title: "Total Books" },
      borrowRecordsStats: { value: growthBorrowedBooks, total: totalBorrowRecord, title: "Borrowed Books" },
    };
}


export const fetchUsersWithBorrowCount = async () => {
  const usersWithBorrowCount = await db
    .select ({
      id: users.id,
      fullName: users.fullName,
      email: users.email,
      createdAt: users.createdAt,
      role: users.role,
      universityId: users.universityId,
      universityCard: users.universityCard,
      borrowCount: sql<number>`count(${borrowRecords.id})`,
    })
    .from(users)
    .leftJoin(borrowRecords, eq(users.id, borrowRecords.userId))
    .where(eq(users.status, "APPROVED"))
    .groupBy(users.id);
    
  return usersWithBorrowCount;
}
