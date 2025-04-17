import { Router } from 'express'
import VerifyToken from '../middleware.js'
import { CreatePost, ListPosts, SelectOnePost,DeletePost } from '../controllers/post.controller.js'

const PostRouter = Router()

PostRouter.post('/CreatePost', VerifyToken, CreatePost)
PostRouter.get('/ListPosts', ListPosts)
PostRouter.get('/SelectPost/:id', SelectOnePost)
PostRouter.delete('/DeletePost',VerifyToken,DeletePost)

export default PostRouter