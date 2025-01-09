import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { likeAPost, likedOrNot } from '../services/APIS/userApis';
import { clearUser } from '../services/slices/userSlice';
import { useNavigate } from 'react-router';

const LikeButton = ({ count ,postId}) => {
  const userId = useSelector((state) => state.userId);
  const isAuth = useSelector((state) => state.isAuth);
  const [liked, setLiked] = useState(null);
  const [likes, setLikes] = useState(0);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  
  
  useEffect(()=>{
    const checkIfLikedOrNot=async()=>{
        const response=await likedOrNot({userId:userId,postId:postId});
       
        
        if(response.status<400){
          setLiked(response.liked);
          setLikes(response.likes)
        }
        else return;
    }
    checkIfLikedOrNot();
  },[])
  
  

  const handleLike = async() => {
    try {
      const response=await likeAPost({userId:userId,postId:postId});
      if(response<400){
        if(liked)setLikes(pre=>pre-1);
        else setLikes(pre=>pre+1);
        setLiked(!liked);

      }
      else if(response==401){
        alert("Please sign in first");
        dispatch(clearUser());
        navigate("/auth/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative flex items-center h-12 w-36 rounded-xl bg-gray-800 overflow-hidden shadow-lg">
      {/* Like Button */}
      <button disabled={!isAuth}
        onClick={handleLike}
        className={`flex items-center justify-center w-3/4 h-full space-x-2 transition-all ${
          liked ? "text-red-500" : "text-gray-400"
        }`}
      >
        <svg
          className="h-6 w-6"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"></path>
        </svg>
        <span className="font-medium text-sm">{liked ? "Liked" : "Like"}</span>
      </button>

      {/* Like Count */}
      <span
        className={`absolute right-0 w-1/4 h-full flex items-center justify-center border-l border-gray-600 text-sm font-medium ${
          liked ? "text-white" : "text-gray-300"
        }`}
      >
        {likes}
      </span>
    </div>
  );
};

export default LikeButton;
