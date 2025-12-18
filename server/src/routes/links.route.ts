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
    const { userId, url, name } = req.body;

    if (!userId && name && url) return res.status(400).json({ message: "missing userid or name or url" });

    //lets check the ounership 
    //it become authorization only when our code already know user userID...
    //For that we will send the userid from frontend and store it in the localstorage
    const user = db.data!.users.find(u => u.id === userId);
    if (user?.id !== userId) {
        return res.status(401).json({ message: "unauthorized user" })
    }

    const link = {
        id: uuid(),
        name,
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

router.patch('/update', async (req: Request, res: Response) => {
    const { linkID, userId,newURL } = req.body
    // check all are there or not
    if (!linkID || !userId || !newURL) {
        return res.status(400).json({ message: "missing required fields" });
    }


    // check user exists
    const user = db.data!.users.find(u => u.id === userId);
    if (!user) {
        return res.status(401).json({ message: "unauthorized user" });
    }

    //see the link
    const link = db.data!.links.find(l => l.id === linkID);
    if (!link) {
        return res.status(404).json({ message: "link not found" });
    };
    // console.log(link)
    
    //check authorization
    if (link.userId !== userId) {
        return res.status(403).json({ message: "forbidden: not your link" });
    }
    
    //update
    link.url = newURL;
    await db.write();

    return res.status(201).json({ message: "updated successfully",link})
})

export { router as linksRouter };