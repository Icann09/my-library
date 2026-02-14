import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool, neonConfig } from "@neondatabase/serverless";
import ws from "ws";

// 👇 IMPORT YOUR SCHEMA
import * as schema from "./schema";

neonConfig.webSocketConstructor = ws;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
});

// 👇 PASS SCHEMA HERE
export const dbPool = drizzle(pool, { schema });
