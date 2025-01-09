import { createSlice } from "@reduxjs/toolkit";

const initialState={
    name:"",
    lastName:"",
    profilePic:"",
    userId:"",
    bio:"",
    posts:[],
    isAuth:false,
}

export const userSlice=createSlice({
    name:'user',
    initialState,

    reducers:{
        updateUser: (state, action) => {
            const { name, lastName, profilePic, _id ,bio ,posts} = action.payload;
            state.name = name;
            state.lastName = lastName;
            state.profilePic = profilePic;
            state.userId =_id,
            state.bio=bio,
            state.posts=posts,
            state.isAuth = true
        },
        clearUser: (state,action) => {
            state.name = "";
            state.lastName = "";
            state.profilePic = "";
            state.userId = "";
            state.bio="",
            state.posts=[],
            state.isAuth = false;
        },
        updateProfilePicAndBio:(state,action)=>{
            const {profilePic,bio}=action.payload;
            state.profilePic=profilePic;
            state.bio=bio;
        },
        addPost:(state,action)=>{
            state.posts.push(action.payload);
        },
        updatePostsArray:(state,action)=>{
            state.posts = state.posts.filter((e) => e != action.payload);
        }
    }
   

})

export const {updateUser,clearUser,updateProfilePicAndBio,addPost,updatePostsArray}=userSlice.actions;
export default userSlice.reducer;