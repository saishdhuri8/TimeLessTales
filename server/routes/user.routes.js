import { Router } from "express";
import { addPost, comentOnPost, deletePost, getAllPostes, getAllPostsOfAUser, getComments, getCompletePostDetail, likePost, updatePost } from "../controllers/posts.controller.js";
import authMiddleware from "../middlewares/auth.js";
import upload from "../uploads/multerforimages.js";
import { checkIfLikedOrNot, getAllUserPost, getBasicInfoOfUser, getUserInfo, updateProfilePictureOfUser, updateUserBasicInfo } from "../controllers/user.controllers.js";





const userRouter = Router();

userRouter.get("/posts",getAllPostes);
userRouter.get("/userinfo/:userId",getUserInfo);
userRouter.get("/userspost",getAllPostsOfAUser);
userRouter.get("/postinfo/:postId",getCompletePostDetail);
userRouter.post("/getcomments", getComments);
userRouter.post("/posts/array",getAllUserPost);
userRouter.get("/basicuserinfo/:userId",getBasicInfoOfUser)









userRouter.patch("/updatepost",authMiddleware,updatePost);
userRouter.delete("/deletepost",authMiddleware,deletePost);
userRouter.post("/addpost",authMiddleware,upload.single("image"),addPost);
userRouter.patch("/likepost",authMiddleware,likePost);
userRouter.patch("/commentonpost",authMiddleware,comentOnPost);
userRouter.post("/likedornot", authMiddleware, checkIfLikedOrNot);
userRouter.patch("/updateprofile",authMiddleware,upload.single("image"),updateUserBasicInfo);


  

export default userRouter;
