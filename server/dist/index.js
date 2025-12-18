import express from 'express';
import { authRouter } from './routes/auth.route.js';
import { initDB } from './db/index.js';
const app = express();
app.use(express.json());
app.use('/auth', authRouter);
initDB().then(() => {
    app.listen(8080, () => {
        console.log('http://localhost:8080');
    });
});
