import { Request, Response, Router } from "express";
import { db } from "../db/index.js";
import { v4 as uuid } from 'uuid'

const router = Router();

// for the actual app; when someone goes to minitree.com/<username>
// returns only the links owned by <username> + they should be 'active'
router.get('/:username', async (req: Request, res: Response) => {
    const links = db.data!.links.filter(l => {
        if (l.userId === req.params.id && l.active) {
            return l;
        }
    });
    res.json(links);
})

// for when the user is logged in and wants to do admin stuff with his links/urls
// will return him all his urls; active or inactive doesn't matter
router.get('/user/:id', async (req: Request, res: Response) => {
    const links = db.data!.links.filter(l => l.userId === req.params.id);
    res.json(links);
});


router.post('/', async (req: Request, res: Response) => {
    const { userId, url } = req.body;

    const link = {
        id: uuid(),
        userId,
        url,
        active: true
    };

    db.data!.links.push(link);
    await db.write();

    res.json(link);
});

// to activate or inactivate a particular url 
router.patch('/toggle/:id', async (req: Request, res: Response) => {
    const link = db.data!.links.find(l => l.id === req.params.id);
    if (!link) return res.status(404).json({ error: 'not found' });

    link.active = !link.active;
    await db.write()

    res.json(link);
});

router.delete('/:id', async (req: Request, res: Response) => {
    db.data!.links = db.data!.links.filter(l => l.id !== req.params.id)
    await db.write()

    res.json({ message: 'deleted' })
});

export { router as linksRouter };