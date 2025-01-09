import React from 'react';
import Tags from './Tags';
import { Link } from 'react-router';


const Card = ({ cardData }) => {




  return (

    <>
    <div>

      <div className="flex w-80 justify-between flex-col rounded-xl bg-gradient-to-br from-violet-950/80 to-black bg-clip-border text-white shadow-lg hover:shadow-violet-500/20 transition-all duration-300 hover:-translate-y-1 border border-violet-500/20">
        <div className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-clip-border shadow-lg group">
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src={cardData.backgroundImage}
              alt="Card image"
              className="w-full h-full object-cover rounded-xl"
              />
          </div>
        </div>
        <div className="p-6">
          <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal antialiased text-violet-200 group-hover:text-violet-300 transition-colors duration-300">
            {cardData.title}
          </h5>

          <div className='flex flex-wrap gap-2 mb-4'>
            {cardData.tags.map((word, i) => {
              return <Tags key={i * 2} tag={word} />
            })}
          </div>

          <p className="block font-sans text-base font-light leading-relaxed text-gray-300 antialiased">
            {cardData.summery}
          </p>
        </div>
        <div className="p-6">
          <Link to={`/post/${cardData._id}`}><button className="group relative w-full inline-flex items-center justify-center px-6 py-3 font-bold text-white rounded-lg bg-gradient-to-r from-violet-900 to-violet-700 hover:from-violet-800 hover:to-violet-600 shadow-lg shadow-violet-500/20 hover:shadow-violet-500/30 duration-500 hover:-translate-y-0.5">
            <span className="relative flex items-center gap-2">
              Read More
              <svg
                viewBox="0 0 24 24"
                stroke="currentColor"
                fill="none"
                className="w-5 h-5 transform transition-transform group-hover:translate-x-1"
                >
                <path
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                  strokeWidth="2"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  />
              </svg>
            </span>
          </button>
          </Link>
        </div>
      </div>
                  </div>
    </>
  );
}

export default Card;