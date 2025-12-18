import { Request, Response, Router } from "express";
import { v4 as uuid } from 'uuid'
import bcrypt from 'bcrypt'
import { db } from "../db/index.js";

const router = Router();

router.post('/signup', async (req: Request, res: Response) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "missing fields" });
    }

    const exists = db.data!.users.find(u => u.username === username);
    if (exists) return res.status(400).json({ error: "user exists" });

    const newUser = {
        id: uuid(),
        username,
        password: bcrypt.hashSync(password, 10),
    };

    db.data!.users.push(newUser);
    await db.write();

    res.json({ message: "user created" });
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = db.data!.users.find(u => u.username === username);
    if (!user) return res.status(400).json({ error: 'user does not exist' });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ error: 'invalid credentials' });

    res.json({ userId: user.id });
})

export { router as authRouter };