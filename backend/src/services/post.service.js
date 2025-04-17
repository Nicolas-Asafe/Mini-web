import { Response } from '../utils/responses.js'
import { Verify } from '../utils/verifyBody.js'
import modelPost from '../models/post.model.js'
import modelUser from '../models/user.model.js'


const verify = new Verify({})

async function SERVICE_posts_createpost(body, user) {
    if (!user?.id) {
        return Response('User ID not provided', false);
    }

    verify.NewBody({ Content: '' })
    const result = verify.VerifyIfIsCorrect(body)
    if (!result[1]) return Response(result[0], result[1])

    try {
        const newPost = await modelPost.create({ content: body.Content, _authId: user.id })
        return Response(`Post created with sucess`, true, newPost)
    } catch (err) {
        return Response(`Err for create post: ${err}`, false)
    }
}

async function SERVICE_posts_getposts() {
    try {
        const Posts = await modelPost.find() || []

        const postsWithAuthor = await Promise.all(Posts.map(async (p) => {
            const user = await modelUser.findById(p._authId)
            return {
                Content: p.content,
                Author: user?.name || 'Unknown',
                id: p._id
            }
        }))

        return Response('Posts listed', true, postsWithAuthor)
    } catch (err) {
        return Response(`Err getting posts: ${err}`, false)
    }
}
async function SERVICE_posts_selectpost(params) {
    const PostId = params.id;
    const Post = await modelPost.findById(PostId)
    if (!PostId) return Response('Post id not provide', false)
    if (!Post) return Response('Post not exists', false)
    const author = await modelUser.findById(Post._authId)

    return Response('Post listed with sucess', true, { Content: Post.content, Author: author?.name || 'Unknown' })
}
async function SERVICE_posts_deletepost(body) {
    verify.NewBody({ PostId: '' })
    const result = verify.VerifyIfIsCorrect(body)
    if (!result[1]) return Response(result[0], result[1])

    const Post = await modelPost.findById(body.PostId)
    if (!Post) return Response('Post not exists', false)
    try {
        await modelPost.findByIdAndDelete(body.PostId)
        return Response('Post deleted with sucess', true)
    } catch (err) {
        return Response(`error deleting post: ${err}`, false)
    }
}




export { SERVICE_posts_deletepost, SERVICE_posts_createpost, SERVICE_posts_getposts, SERVICE_posts_selectpost }