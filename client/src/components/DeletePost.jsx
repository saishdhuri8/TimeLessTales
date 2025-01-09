import React, { useState, useEffect } from 'react';
import { getUserPosts } from '../services/APIS/apihit';
import { useSelector } from 'react-redux';
import DeleteCard from './DeleteCard';

const DeletePost = () => {
  const post = useSelector(state => state.posts);
  const [posts, setposts] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      const allposts = await getUserPosts(post);
      setposts(allposts);
    };
    fetchAll();
  }, [post]);

  return (
    <div className="min-h-screen text-white flex flex-col items-center py-10">

      {/* Instruction Message */}
      <div className="text-center py-4 text-2xl text-white font-semibold mb-8 px-8 rounded-lg shadow-xl bg-opacity-60 backdrop-blur-md">
      <p className="bg-red-400 bg-opacity-60 text-white font-semibold text-xl py-4 px-8 rounded-lg shadow-lg mb-6 text-center backdrop-blur-md transition-all duration-300 hover:bg-red-500 ">
  Click on a post to delete it
</p>


      </div>

      {/* Cards Section */}
      <div className="flex flex-wrap justify-center gap-20">
        {posts.map((currentPost, i) => (
          <DeleteCard cardData={currentPost} setposts={setposts} key={i * 2} />
        ))}
      </div>

    </div>
  );
};

export default DeletePost;
