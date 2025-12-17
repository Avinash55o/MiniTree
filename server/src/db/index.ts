import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

let db: Database;

// FULL CHATGPT
export async function initDB() {
    db = await open({
        filename: "data.db",
        driver: sqlite3.Database,
    });

    await db.exec("PRAGMA foreign_keys = ON;");

    await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL
    );
  `);

    await db.exec(`
    CREATE TABLE IF NOT EXISTS links (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      url TEXT NOT NULL,
      is_active INTEGER DEFAULT 1,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `);

    return db;
}

export function getDB() {
    if (!db) throw new Error("DB not initialized");
    return db;
}
