import { SERVICE_posts_createpost, SERVICE_posts_getposts, SERVICE_posts_selectpost,SERVICE_posts_deletepost } from '../services/post.service.js'
import { ReceiveResponse } from '../utils/responses.js'

//Controllers:

async function CreatePost(req, res) {
    const response = await SERVICE_posts_createpost(req.body, req.user)
    ReceiveResponse(response, res)
    // res.status(200).json(response);        
}
async function ListPosts(req, res) {
    const response = await SERVICE_posts_getposts()
    ReceiveResponse(response, res)
}
async function SelectOnePost(req, res) {
    const response = await SERVICE_posts_selectpost(req.params)
    ReceiveResponse(response, res)
}
async function DeletePost(req,res){
    const response = await SERVICE_posts_deletepost(req.body)
    ReceiveResponse(response,res)
}

export { CreatePost, ListPosts, SelectOnePost,DeletePost }
