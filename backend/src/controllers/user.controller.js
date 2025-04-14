import { SERVICE_users_ListUsers,SERVICE_users_CreateUser,SERVICE_users_GetAuth,SERVICE_users_GetPerson } from "../services/user.service.js";
import { ReceiveResponse } from "../utils/responses.js";

async function ListUsers(req,res){
    const response = await SERVICE_users_ListUsers(req.body)
    ReceiveResponse(response,res)
}
async function CreateUser(req,res){
    const response = await SERVICE_users_CreateUser(req.body)
    ReceiveResponse(response,res)
}
async function GetAuth(req,res){
    const response = await SERVICE_users_GetAuth(req.body);
    ReceiveResponse(response,res)
}
async function GetPerson(req,res){
    const serviceResponse = await SERVICE_users_GetPerson(req.user);
    res.status(200).json(serviceResponse);        
}



export {ListUsers,CreateUser,GetAuth,GetPerson}