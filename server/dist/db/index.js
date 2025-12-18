import { JSONFile } from "lowdb/node";
import { Low } from "lowdb";
const adapter = new JSONFile('db.json');
export const db = new Low(adapter, {
    users: [],
    links: [],
});
export async function initDB() {
    await db.read();
    db.data ||= { users: [], links: [] };
    await db.write();
}
