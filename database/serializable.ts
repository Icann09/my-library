import { dbPool } from "@/database/drizzle-pool";
import { sql } from "drizzle-orm";

export async function runSerializableTx<T>(
  fn: (tx: any) => Promise<T>,
  retries = 3
): Promise<T> {
  try {
    return await dbPool.transaction(async (tx) => {

      // 🧠 UPGRADE isolation level
      await tx.execute(sql`
        SET TRANSACTION ISOLATION LEVEL SERIALIZABLE
      `);
      return fn(tx);
    });
  } catch (e: any) {

    // 🔁 Retry automatically if Neon aborts unsafe concurrent tx
    if (e.code === "40001" && retries > 0) {
      return runSerializableTx(fn, retries - 1);
    }
    throw e;
  }
}
