import { JSONFile } from "lowdb/node";
import { Link, User } from "../types/index.js";
import { Low } from "lowdb";


type Data = {
    users: User[];
    links: Link[];
}

const adapter = new JSONFile<Data>('db.json');
export const db = new Low<Data>(adapter, {
    users: [],
    links: [],
});

export async function initDB() {
    await db.read();
    db.data ||= { users: [], links: [] };
    await db.write();
}