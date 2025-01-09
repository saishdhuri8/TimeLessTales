import React, { useEffect, useState } from 'react'
import Card from './Card'
import { getALLPosts } from '../services/APIS/apihit'

const AllCards = () => {
  const [allPosts, setallPosts] = useState([])

  useEffect(() => {
    const fetchAll = async () => {
      const allPostsData = await getALLPosts();
      setallPosts(allPostsData.data);
    }
    fetchAll();
  }, [])
  return (
    <div className='flex flex-wrap justify-center gap-12 '>
      {allPosts.map((currentCard) => (
        <Card cardData={currentCard} key={currentCard._id} />
      ))}

    </div>
  )
}

export default AllCards