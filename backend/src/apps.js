// server.js
import Express from 'express';
import cors from 'cors';
import UserRouter from './routers/user.router.js';
import PostRouter from '../src/routers/post.router.js'
import { ConnectDB } from './utils/MongooseHandler.js';
import env from 'dotenv'
env.config();
const app = Express();
app.use(cors());



app.use((req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    if (apiKey !== process.env.SECRET_KEY_ACCESS) {
      return res.status(403).json({ message: "you can't access this api" });
    }
    next();
  });
  
app.use(Express.json());
ConnectDB()

app.use(UserRouter)
app.use(PostRouter)


app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
