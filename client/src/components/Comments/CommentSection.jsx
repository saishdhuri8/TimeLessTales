import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import AddNewComment from './AddNewComment';
import Comment from './Comment';
import { getAllComments } from '../../services/APIS/apihit';

const CommentSection = ({ allComments,postId }) => {
    const [comments, setComments] = useState([]);

    const isAuth = useSelector((state) => state.isAuth);

    const [showComments, setShowComments] = useState(false);

    const handleToggleComments = async () => {
        setShowComments((prev) => !prev);

        if (!showComments && comments.length === 0) {
            try {
                const response = await getAllComments(allComments);
                if (response.status < 400) {
                    setComments(response.finalComments);
                } else {
                    alert('Something went wrong');
                }
            } catch (error) {
                alert('Error fetching comments');
            }
        }
    };

    return (
        <div className="my-10">
            <h2 className="text-2xl font-semibold text-violet-100 mb-4">Comments</h2>

            {/* See Comments Button */}
            <button
                onClick={handleToggleComments}
                className="bg-violet-500 hover:bg-violet-700 text-white font-medium px-6 py-2 rounded-lg mt-4 transition"
            >
                {showComments ? 'Hide Comments' : 'See Comments'}
            </button>

            {showComments && (
                <>
                    {/* Add a New Comment */}
                    {isAuth ? <AddNewComment postId={postId} setComments={setComments}/> : <div></div>}

                    {/* Display Comments */}

                     <div className='m-5 p-5'>
                    {comments.length > 0 ? (
                        comments.map((e, i) => (
                            <Comment key={i * 4} currentComment={e} />
                        ))
                    ) : (
                        <p className="text-gray-500 mt-4">No comments yet.</p>
                    )}
                    </div>   

                </>
            )}
        </div>
    );
};

export default CommentSection;
