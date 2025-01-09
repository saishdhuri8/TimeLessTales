import Post from "../models/posts.model.js"
import User from "../models/user.model.js";
import { uploadToCloudinary } from "../Utils/cloudinary.upload.js";

export const getAllPostes=async(req,res)=>{
    try {
        const allPost= await Post.find().select('owner title tags summery likes backgroundImage');
        res.status(200).json(allPost);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Someting went wrong on server side"})
    }
}

export const likePost=async(req,res)=>{
    try {
        const {postId,userId}=req.body;
        const post=await Post.findById(postId);
        if(!post)return res.status(404).json({message:"Post not found"});

        const liked=post.likes.includes(userId);
        
        const action=(liked)?{$pull:{likes:userId}}:{ $addToSet: { likes: userId } };
         
        const updatedPost = await Post.findByIdAndUpdate(postId, action, { new: true });

        return res.status(200).json({message:"POST UPDATED ACCORDINGLY"});
        
    } catch (error) {
        console.log(error);
    return res.status(404).json({message: "Someting went wrong"})
    }
}

export const comentOnPost=async(req,res)=>{

    const {userId,postId,comment}=req.body;
    try {
           const newComment={
                  userId:userId,    
                  comment:comment,
           }
          const commentsUpdated= await Post.findByIdAndUpdate({_id:postId},{$push:{comments:newComment}})
          if(!commentsUpdated)return res.status(404).json({message:"Something went wrong"})
          return  res.status(200).json({message:"Everting went well"})
    } catch (error) {
         return  res.status(404).json({message:"Something well wrong"})          
    }
}

export const updatePost = async (req, res) => {
    try {
        const { userId, postId, tags, summery, mainContent } = req.body;
        const oldPost = await Post.findById(postId);
        if (!oldPost) {
            return res.status(404).json({ message: "Post not found" });
        }
        if (userId !== oldPost.owner.toString()) { 
            return res.status(403).json({ message: "Unauthorized access" });
        }        
        const updatedPost = {
            tags,
            summery,
            mainContent,
        };
        const result = await Post.findOneAndUpdate(
            { _id: postId },
            { $set: updatedPost },
            { new: true } 
        );

        res.status(200).json({ message: "Post updated successfully", post: result });
    } catch (error) {
        console.error("Error updating post:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

export const deletePost = async (req, res) => {
    try {
        const { postId, userId } = req.body;
        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ message: "Post Not Found" });
        if (userId !== post.owner.toString()) {
            return res.status(403).json({ message: "Unauthorized access" });
        }
        await User.updateOne({_id:userId},{$pull:{posts:postId}})
        await Post.findByIdAndDelete(postId);
        return res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong on the server side" });
    }
}

export const addPost=async(req,res)=>{
    try {
           const { userId, tags, summery, mainContent,title} = req.body;
   
           if (!userId || !summery || !mainContent) {
               return res.status(400).json({ message: "Missing required fields" });
           }

           let backgroundPicURL="";
           
           
           if(req.file){
               const cloudinaryUploadResults=await uploadToCloudinary(req.file.path);
               
                backgroundPicURL=cloudinaryUploadResults.url;
           }

           


           const newPost = await Post.create({
               owner: userId,
               tags: tags || [], 
               title:title,
               summery: summery,
               mainContent: mainContent,
               backgroundImage:backgroundPicURL,
           });
           await User.findByIdAndUpdate(
               userId,
               { $push: { posts: newPost._id.toString() } },
               { new: true } 
           );
           res.status(201).json({
               message: "Post created successfully",
               postId: newPost._id,
           });
       } catch (error) {
           console.error(error);
           res.status(500).json({ message: "Something went wrong" });
       }
    
}

export const getAllPostsOfAUser=async(req,res)=>{
    try {
        const { posts } = req.body;
        const allPosts = await Post.find({ _id: { $in: posts } }).select('owner title tags summery likes');
        return res.status(200).json(allPosts);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Something went wrong on the server side' });
      }
}

export const getCompletePostDetail=async(req,res)=>{
    try {
            const {postId}=req.params;
            const post=await Post.findById(postId);
            return res.status(200).json(post);
    } catch (error) {
        return res.status(404).json({message:"Post Not Found"});
    }
}

export const getComments=async (req, res) => {
    try {
        const { commentsArray } = req.body; 

        
  
        const allUsersId = commentsArray.map(comment => comment.userId);

 
        const allUsers = await User.find({ _id: { $in: allUsersId } }).select("name lastName _id profilePic");

        
        const userMap = {};

        allUsers.forEach(user => {
            userMap[user._id] = {
                name: user.name,
                lastName: user.lastName,
                profilePic: user.profilePic
            };
        });


        const updatedComments = commentsArray.map(comment => ({
            userId: comment.userId,
            comment: comment.comment,
            user: userMap[comment.userId] 
        }));

        return res.status(200).json(updatedComments);
    } catch (error) {
        console.error("Error fetching comments:", error);
        return res.status(500).json({message: "Internal Server Error"});
    }
}



