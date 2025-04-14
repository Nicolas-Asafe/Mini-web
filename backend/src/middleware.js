import dotenv from "dotenv";
import {Response} from '../src/utils/responses.js'
import jwt from 'jsonwebtoken'
dotenv.config()

export default function VerifyToken(req,res,next){
    const header = req.headers['authorization']
    const token = header && header.split(' ')[1]
    if(!token){
        return Response('Token not exists',false);
    }
    jwt.verify(token,process.env.SECRET_KEY,(err,user)=>{
        if(err) return Response(`Token invalide: ${err}`,false)
        
        req.user = user
        next()
    })
}

