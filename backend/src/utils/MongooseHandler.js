import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

export function ConnectDB() {
    const APIURL = process.env.DATABASE_URL
    mongoose.connect(APIURL)
        .then(() => {
            console.log('db connect --- MongooseHandler.line.10')
        }).catch(err => console.log(err))
}

