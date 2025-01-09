import React, { useEffect, useState } from 'react';
import Card from './Card';
import { getALLPosts } from '../services/APIS/apihit';

const AllCards = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const allPostsData = await getALLPosts();
        setAllPosts(allPostsData.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false); // Stop loader when data is fetched
      }
    };
    fetchAll();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loader2">Loading...</div> {/* You can replace this with a spinner or loader */}
      </div>
    );
  }

  return (
    <div className='flex flex-wrap justify-center gap-12'>
      {allPosts.map((currentCard) => (
        <Card cardData={currentCard} key={currentCard._id} />
      ))}
    </div>
  );
};

export default AllCards;
