import mongoose from "mongoose"

export default async function connectDB() {
    return mongoose.connect(`${process.env.DATA_BASE_URL}`).then(console.log("DB connected")
    )
}