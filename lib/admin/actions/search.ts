"use server";
import { db } from "@/database/drizzle";
import { books as booksTable, users as usersTable } from "@/database/schema";
import { ilike, sql } from "drizzle-orm";


export const searchAdmin = async (query: string) => {
  const normalized = query.trim();

  if (!normalized) return [];

  // fetch books
  const books = await db
    .select({
      id: booksTable.id,
      title: booksTable.title,
      type: sql<"book">`'book'`,
    })
    .from(booksTable)
    .where(ilike(booksTable.title, `%${normalized}%`))
    .limit(5);

  // fetch users
  const users = await db
    .select({
      id: usersTable.id,
      title: usersTable.fullName,
      subtitle: usersTable.email,
      type: sql<"user">`'user'`,
    })
    .from(usersTable)
    .where(ilike(usersTable.fullName, `%${normalized}%`))
    .limit(5);

  return [...books, ...users];
};