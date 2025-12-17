import Database from "better-sqlite3";

export const db = new Database('users.db');

db.pragma('foreign_keys = ON');

db.prepare(`
    CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY
        username TEXT UNIQUE NOT NULL
        password_hash TEXT NOT NULL
    )
`).run();

db.prepare(`
    CREATE TABLE IF NOT EXISTS links(
        id TEXT PRIMARY KEY
        userid TEXT NOT NULL
        linkURL TEXT UNIQUE NOT NULL
       activeURL INTEGER DEFAULT 0
FORIGN KEY (userid) REFERENCES users(id)
    )        
`).run();
