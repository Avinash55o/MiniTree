import { Request, Response, Router } from "express";
import bcrypt from "bcryptjs";
import { getDB } from "../db/index.js";

const router = Router();

export const sessions = new Map<string, string>();

router.post('/signup', async (req: Request, res: Response) => {
    const { username, password } = req.body;

    if (!username || !password)
        return res.status(400).json({ error: "missing fields" });

    const hash = bcrypt.hashSync(password, 10);
    const id = crypto.randomUUID();

    try {
        const db = getDB();
        await db.run(
            "INSERT INTO users (id, username, password_hash) VALUES (?, ?, ?)",
            id,
            username,
            hash
        );
    } catch (error) {
        res.status(400).json({ error: "something went wrong" });
    }
});

router.post('/login', async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const db = getDB();

    const user = await db.get<{
        id: string;
        username: string;
        password_hash: string;
    }>(
        "SELECT * FROM users WHERE username = ?",
        username
    );

    if (!user)
        return res.status(401).json({ error: "invalid credentials" });

    if (!bcrypt.compareSync(password, user.password_hash))
        return res.status(401).json({ error: "invalid credentials" });

    const token = crypto.randomUUID();
    sessions.set(token, user.id);

    res.json({ token });
})

export default router;
