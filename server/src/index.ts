import express from 'express';
import cors from 'cors';
import { authRouter } from './routes/auth.route.js';
import { initDB } from './db/index.js';
import { linksRouter } from './routes/links.route.js';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/auth', authRouter)
app.use('/link', linksRouter)

initDB().then(() => {
    app.listen(8080, () => {
        console.log('http://localhost:8080');
    });
});