import { db } from "@/database/drizzle";
import { books, borrowRecords, users } from "@/database/schema";
import { eq, lt, and, sql, desc, getTableColumns, ilike } from "drizzle-orm"
import { subHours } from "date-fns";
import { unstable_cache } from "next/cache";


// Books fetchers
/// Books for public pages with caching
export  const fetchBooksUser  = unstable_cache(
    async () => {
      return await db
        .select()
        .from(books)
        .orderBy(desc(books.createdAt))
        .limit(12);
    },
    ["public-books"],
    { tags: ["books"] }
  );

/// Books count 
export const fetchBooksCountFiltered = async ({
  query,
  genre,
}: {
  query: string;
  genre: string;
}) => {
  const conditions = [];

  if (query) {
    conditions.push(ilike(books.title, `%${query}%`));
  }

  if (genre) {
    conditions.push(eq(books.genre, genre));
  }

  const whereClause =
    conditions.length > 0 ? and(...conditions) : undefined;

  const [{ count }] = await db
    .select({ count: sql<number>`count(*)` })
    .from(books)
    .where(whereClause);

  return Number(count);
};


/// Books for search with filtering and pagination
export const fetchBooksSearch = async ({
  query,
  genre,
  page,
  perPage,
  }: {
    query: string;
    genre: string;
    page: number;
    perPage: number;
  }) => {
  const offset = (page - 1) * perPage;

  const conditions = [];

  if (query) {
    conditions.push(ilike(books.title, `%${query}%`));
  }

  if (genre) {
    conditions.push(eq(books.genre, genre));
  }

  const whereClause =
    conditions.length > 0 ? and(...conditions) : undefined;

  const booksList = await db
    .select()
    .from(books)
    .where(whereClause)
    .orderBy(desc(books.createdAt))
    .limit(perPage)
    .offset(offset);

  return {
    books: booksList,
  };
};
/// Books for admin/dashboard with caching   
export const fetchBooksAdmin = unstable_cache( 
  async () => {
   return await db 
    .select({
      id: books.id,
      title: books.title,
      author: books.author,
      genre: books.genre,
      createdAt: books.createdAt,
      coverUrl: books.coverUrl,
      coverColor: books.coverColor
    }).from(books)
  },
  ["admin-books"],
  { tags: ["books"] }
); 
/// Books with ID
export const fetchBookWithId = async (id: string) => {
  const book = await db
    .select()
    .from(books)
    .where(eq(books.id, id))
    .limit(1);
  
  return book;
}
// Genres fetcher
export const fetchGenres = async () => {
  const result = await db
    .selectDistinct({ genre: books.genre })
    .from(books);

  return result.map((g) => g.genre);
};


// Borrow Records fetchers
/// Borrow records for admin/dashboard 
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
/// Borroed books for user profile page
export const fetchBorrowedBooksUser = async (userId: string) => {
  const bookColumns = getTableColumns(books);
  const borrowedBooks = await db
    .select({
      ...bookColumns,
      isLoanedBook: sql<boolean>`
        CASE 
          WHEN ${borrowRecords.status} = 'BORROWED' 
          THEN true 
          ELSE false 
        END
      `.as("isLoanedBook"),
      dueDate: borrowRecords.dueDate,
      borrowedAt: borrowRecords.createdAt,
    })
    .from(borrowRecords)
    .innerJoin(books, eq(borrowRecords.bookId, books.id))
    .where(eq(borrowRecords.userId, userId))
    .orderBy(desc(borrowRecords.createdAt));

  return borrowedBooks;
};



// Users fetchers
/// Account requests for admin dashboard
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
/// Users with borrow count for admin dashboard
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

export const fetchUserUniversityId = async (userId: string) => {
  const userUniversityId = await db
    .select({ universityId: users.universityId })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);
  
  return userUniversityId[0]?.universityId;
}



// Stats fetchers
/// Stats data for admin dashboard
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



