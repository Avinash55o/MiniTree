// user
// id string @unique
// username string
// links Link[]
// password string

// Link
// id string
// url string
// isActive boolean

import Database from "better-sqlite3";

export const db = new Database('users.db');

db.pragma('foreign_keys = ON');

db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        username TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
    )
`);

db.exec(`
    CREATE TABLE IF NOT EXISTS links(
        id TEXT PRIMARY KEY,
        userid Text NOT NULL,
        linkURL TEXT UNIQUE NOT NULL,
        activeURL INTEGER DEFAULT 0
        FORIGN KEY (userid) REFERENCES users(id)
    )        
`);