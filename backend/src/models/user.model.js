import Mongoose from "mongoose";


const model = new Mongoose.Schema({
    name:String,
    password:String
})

const modelUser = new Mongoose.model('User',model)
export default modelUser