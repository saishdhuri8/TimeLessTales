import React from 'react';
import Tags from './Tags';
import { deletePost } from '../services/APIS/userApis';
import { useDispatch, useSelector } from 'react-redux';
import { updatePostsArray } from '../services/slices/userSlice';

const DeleteCard = ({ cardData, setposts }) => {

  const userId = useSelector(state => state.userId);
  const dispatch = useDispatch();

  const handleDeletePost = async (e) => {
    e.preventDefault();

    const response = await deletePost({ userId: userId, postId: cardData._id });
  

    if (response == 403) {
      alert("YOU ARE NOT AUTORISED FOR THIS ACTION PLEASE SIGNIN");
      return;
    }

    if (response == 500) {
      alert("SOMETHING WENT WRONG ON THE SERVER SIDE");
      return;
    }
    if (response > 400) return
    if (response === 200) {
      setposts(pre => pre.filter((e) => { e._id != cardData._id }))
      dispatch(updatePostsArray(cardData._id));
      return;
    }
  }

  return (
    <>
      <div className=''>

        <div className="flex w-80 flex-col justify-between rounded-xl bg-gradient-to-br from-red-700/80 to-black bg-clip-border text-white shadow-lg hover:shadow-violet-500/20 transition-all duration-300 hover:-translate-y-1 border border-red-500/20">
          <div className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-clip-border shadow-lg group">
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src={cardData.backgroundImage}
                alt="Card image"
                className="w-full h-full object-cover rounded-xl opacity-60" // Reduced opacity for a "faded" look
              />
            </div>
          </div>


          <div className="p-6">
            <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal antialiased text-violet-200 group-hover:text-violet-300 transition-colors duration-300">
              {cardData.title}
            </h5>

            <div className="flex flex-wrap gap-2 mb-4">
              {cardData.tags.map((word, i) => {
                return <Tags key={i * 2} tag={word} />;
              })}
            </div>

            <p className="block font-sans text-base font-light leading-relaxed text-gray-300 antialiased">
              {cardData.summery}
            </p>
          </div>



          {/* Delete Button Section */}
          <div className="p-6">
            <button
              onClick={handleDeletePost} // Placeholder for actual delete functionality
              className="w-full py-3 px-6 font-bold text-white bg-gradient-to-r from-red-900 to-red-700 hover:from-red-800 hover:to-red-600 rounded-lg shadow-lg transition duration-300 transform hover:scale-105"
            >
              <span className="flex items-center justify-center gap-2">
                Delete Post
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-5 h-5 transform transition-transform group-hover:translate-x-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </span>
            </button>
          </div>

        </div>
      </div>
    </>
  );
};

export default DeleteCard;
