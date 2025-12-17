import { Request, Response, Router } from "express";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
import { db } from "../db/index.js";

const router = Router();

export const sessions = new Map<string, string>();

router.post("/signup", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "missing fields" });
  }

  const id = randomUUID();
  const hash = await bcrypt.hash(password, 10);

  try {
    await db.execute({
      sql: `
        INSERT INTO users (id, username, password_hash)
        VALUES (?, ?, ?)
      `,
      args: [id, username, hash],
    });

    return res.status(201).json({ message: "user created" });
  } catch (err) {
    return res.status(400).json({ error: "username already exists" });
  }
});

router.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "missing fields" });
  }

  const result = await db.execute({
    sql: "SELECT * FROM users WHERE username = ?",
    args: [username],
  });

  const row = result.rows[0];

  if (!row) {
    return res.status(401).json({ error: "invalid credentials" });
  }

  const user = {
    id: String(row.id),
    username: String(row.username),
    password_hash: String(row.password_hash),
  };

  if (!user) {
    return res.status(401).json({ error: "invalid credentials" });
  }

  const valid = await bcrypt.compare(password, user.password_hash);

  if (!valid) {
    return res.status(401).json({ error: "invalid credentials" });
  }

  const token = randomUUID();
  sessions.set(token, user.id);

  return res.json({ token });
});

export default router;
