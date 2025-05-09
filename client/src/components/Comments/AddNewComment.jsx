import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { commentOnAPost } from '../../services/APIS/userApis';
import { clearUser } from '../../services/slices/userSlice';
import { useNavigate } from 'react-router';



const AddNewComment = ({ postId, setComments }) => {

    const userId = useSelector(state => state.userId)
    const name = useSelector(state => state.name)
    const lastName = useSelector(state => state.lastName)
    const profilePic = useSelector(state => state.profilePic)
    const dispatch=useDispatch()

    const [newComment, setNewComment] = useState('');
    const navigate=useNavigate();


    const handleAddComment = async (e) => {
        e.preventDefault();
        if (newComment !== '') {
            const finalComment = {
                comment: newComment,
                userId: userId,
                user: {
                    name: name,
                    lastName: lastName,
                    profilePic: profilePic,
                }
            }

            const response = await commentOnAPost({ userId: userId, postId: postId, comment: newComment })
            if (response.status < 400) {
                setComments(pre => [...pre, finalComment]);
                setNewComment("")
            }
            else if (response.status === 401) {
                alert("You are unauthorized to perform this action. Please login.");
                dispatch(clearUser());
                localStorage.clear();
                navigate("/auth/login");
                return;
            }
        }
    }
    return (
        <div className="my-6">
            <textarea
                className="w-full bg-gray-700 text-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                placeholder="Write your comment here..."
                rows="4"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
            ></textarea>
            <button
                onClick={handleAddComment}
                className="bg-violet-500 hover:bg-violet-700 text-white font-medium px-6 py-2 rounded-lg mt-4 transition"
            >
                Add Comment
            </button>
        </div>
    )
}

export default AddNewComment