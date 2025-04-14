// server.js
import Express from 'express';
import cors from 'cors';
import UserRouter from './routers/user.router.js';
import { ConnectDB } from './utils/MongooseHandler.js';
const app = Express();

app.use(cors());
app.use(Express.json());
ConnectDB()

app.use(UserRouter)


app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
