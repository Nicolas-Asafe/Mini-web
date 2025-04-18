import { CreateUser, ListUsers,GetAuth,GetPerson } from "../controllers/user.controller.js";
import {Router} from 'express'
import VerifyToken from "../middleware.js";

const UserRouter = Router()
UserRouter.get('/Users',ListUsers) 
UserRouter.post('/RegisterUser',CreateUser)
UserRouter.post('/LoginUser',GetAuth)
UserRouter.get('/Person',VerifyToken,GetPerson)

export default UserRouter

//Account test
//504550