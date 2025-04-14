import Mongoose from "mongoose";


const model = new Mongoose.Schema({
     content:String,
    _authId:String
})

const modelPost = new Mongoose.model('Post',model)
export default modelPost