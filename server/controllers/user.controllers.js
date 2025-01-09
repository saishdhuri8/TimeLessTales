import { url } from "inspector/promises";
import { deleteFromCloudinary, uploadToCloudinary } from "../Utils/cloudinary.upload.js";
import User from "../models/user.model.js";
import Post from "../models/posts.model.js";



export const updateProfilePictureOfUser=async(req,res)=>{

    try {
        if(!req.file)return res.status(500).json({message:"Upload failed"});

        const cloudinaryUploadResults=await uploadToCloudinary(req.file.path);

        if(!cloudinaryUploadResults)return res.status(500).json({message:"Upload failed"});

        const {userId}=req.body;

        const updatedUser=await User.findByIdAndUpdate(userId,{profilePic:cloudinaryUploadResults.url},{new:true}).select("-password -email");
        if(!updatedUser)return res.status(404).json({message:"User Not Found"});

        return res.status(200).json(updatedUser);
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Uploat failed"});
    }
}

export const getUserInfo=async(req,res)=>{
    try {
            const{userId}=req.params;
            const userData = await User.findById(userId).select('-password -email');
            if(!userData)return res.status(404).json({message:"User not Found"})           
            return res.status(200).json(userData)   
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Something wrong on server side"})
    }
}

export const updateUserBasicInfo=async(req,res)=>{
    try {
            const {userId,bio,oldProfilePic}=req.body;
            
            let URL="";

            if(req.file){
                const cloudinaryUploadResults=await uploadToCloudinary(req.file.path);
                URL=cloudinaryUploadResults.url;
                if (oldProfilePic.includes("cloudinary")) {
                    await deleteFromCloudinary(oldProfilePic);
                  }
            }

            let updatedUser=null;
            if(URL===""){
                updatedUser=await User.findOneAndUpdate({_id:userId},{bio:bio},{new:true})
            }
            else{
                updatedUser=await User.findOneAndUpdate({_id:userId},{bio:bio,profilePic:URL},{new:true})
            }

            if(updatedUser===null)return res.status(500).json({message:"Something went wrong on server side"});

            return res.status(200).json(updatedUser);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Something went wrong on server side"})
    }
}

export const checkIfLikedOrNot=async (req, res) => {
    try {
      const { userId, postId } = req.body;
  
     
      const post = await Post.findById(postId).select("likes");
      
      if (!post) return res.status(404).json({ message: "Post Not Found" });
  
      const liked = post.likes.includes(userId);
  
      return res.status(200).json({ liked:liked,likes:post.likes.length });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Something went wrong" });
    }
}

export const getAllUserPost= async (req, res) => {
    const { allPostIds } = req.body;
    if (!allPostIds || !Array.isArray(allPostIds)) {
        return res.status(400).json({ message: "Invalid or missing post IDs" });
    }

    try {
        const allPosts = await Post.find({ _id: { $in: allPostIds } })
            .select('owner title tags summery likes backgroundImage');
        if (!allPosts.length) {
            return res.status(404).json({ message: "No posts found" });
        }
        return res.status(200).json(allPosts);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getBasicInfoOfUser=async(req,res)=>{
    try {
            const {userId}=req.params;
            const basicUserDetails=await User.findById(userId).select('name lastName _id profilePic')
            if(!basicUserDetails)return res.status(404).json({message:"User Not found"});
            return res.status(200).json(basicUserDetails);
        } catch (error) {
            console.log(error);
            return res.status(500).json({message:"Server side problem"});
        
    }
}
