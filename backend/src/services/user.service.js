import { Verify } from '../utils/verifyBody.js';
import { Response } from '../utils/responses.js';
import modelUser from '../models/user.model.js';

import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

async function SERVICE_users_CreateUser(body){
    const UserForCreateVerify = new Verify({Name:'',Password:''})
    const verify = UserForCreateVerify.VerifyIfIsCorrect(body)
    if(!verify[1]){ console.log(verify[0]); return verify}
    const UserExists =  await SERVICE_methods_user.CheckUserExists({Name:body.Name})
    if(UserExists[1]){ console.log('this name is already used'); return Response('this name is already used',false);}

    try{
        const newUser = await modelUser.create({name:body.Name,password:body.Password})
        return Response('User created with sucess',true,{NewUser:newUser.name})
    }
    catch(err){
        return Response(`Error: ${err}`,false)
    }

}
async function SERVICE_users_ListUsers(){
    try{
        const users = await modelUser.find()
        return Response(`Users listed with sucess`,true,users)
    }catch(err){
        return Response(`Err: ${err}`,false)
    }
}

async function SERVICE_users_GetAuth(body){
    //Primeira verificação

    const UserCredentials = new Verify({Name:"",Password:""})
    const verify = UserCredentials.VerifyIfIsCorrect(body)
    if(!verify[1]){ console.log(verify[0]); return verify;}

    const UserExists =  await SERVICE_methods_user.CheckUserExists({Name:body.Name})
    if(!UserExists[1]){ console.log(UserExists[0]); return UserExists;}


    const user = await modelUser.findOne({name: body.Name})

    if(body.Password !== user.password){
        return Response('Password incorrect',false)
    }
    

    return SERVICE_methods_user.generateToken(user._id)
}
async function SERVICE_users_GetPerson(user) {
    if (!user?.id) {
        return Response('User ID not provided', false);
    }

    try {
        const userfind = await modelUser.findById(user.id);
        if (!userfind) {
            return Response('User not found', false);
        }

        return Response('Person loaded with success', true, { user: userfind });
    } catch (err) {
        return Response(`Error fetching user: ${err.message}`, false);
    }
}



const SERVICE_methods_user = {
    CheckUserExists:async (body)=>{
        const UserCredentials = new Verify({Name:""})
        const verify = UserCredentials.VerifyIfIsCorrect(body)
        if(!verify[1]){ console.log(verify[0]); return verify}

        const user =  await modelUser.find({name:body.Name})
        return user.length === 0
        ?Response('User does not exist',false)
        :Response('User exists',true,user)
    },
    generateToken:(UserId)=>{
        try{
            const token = jwt.sign({id:UserId},process.env.SECRET_KEY,{expiresIn:'246h'})
            return Response('Authorized with token',true,{token})
        }catch(err){
            return Response(`Err:${err}`,false)
        }    
    }
}

export {
    SERVICE_users_CreateUser,
    SERVICE_users_ListUsers,
    SERVICE_users_GetAuth,
    SERVICE_users_GetPerson
}

