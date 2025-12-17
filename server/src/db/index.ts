import { createClient } from "@libsql/client";
//gpt
export const db = createClient({
  url: "file:users.db"
});

await db.execute(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL
  )
`);
