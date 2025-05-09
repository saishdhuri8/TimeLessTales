import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import Card from './Card';
import { getCompleteUserInfo, getUserPosts } from '../services/APIS/apihit';

const UserProfile = () => {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const { userId } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchAll = async () => {
      try {
        const userDetails = await getCompleteUserInfo(userId);
        setUser(userDetails);
        const allPosts = await getUserPosts(userDetails.posts);
        setPosts(allPosts);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false); // Stop loader when data is fetched
      }
    };
    fetchAll();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <div className="loader2"></div> {/* Loader */}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center py-10">

      {/* Profile Picture */}
      <div className="mb-6">
        <img
          src={user.profilePic || "https://w7.pngwing.com/pngs/177/551/png-transparent-user-interface-design-computer-icons-default-stephen-salazar-graphy-user-interface-design-computer-wallpaper-sphere-thumbnail.png"}
          alt="User Profile"
          className="h-40 w-40 rounded-full border-4 border-violet-600"
        />
      </div>

      {/* Bio Section */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">{`${user.name || ""} ${user.lastName || ""}`}</h1>
        <p className="text-lg text-gray-400">{user.bio || ""}</p>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 px-6 my-11">
        {posts.map((currentPost, i) => (
          <Card cardData={currentPost} key={i * 2} />
        ))}
      </div>

    </div>
  );
};

export default UserProfile;
