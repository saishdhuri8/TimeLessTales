import mongoose from "mongoose";

const commentsSchema = new mongoose.Schema({
    userId: { type: String },
    comment: { type: String },
});

const postSchema = new mongoose.Schema({
    owner: { type: String },
    title:String,
    backgroundImage:String,
    tags: { type: [String], default: [] },
    summery: { type: String },
    mainContent: { type: String },
    likes: { type: [String], default: [] },
    comments: { type: [commentsSchema], default: [] }, 
});
const Post=mongoose.model("posts",postSchema);
export default Post;