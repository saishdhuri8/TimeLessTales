import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUserPost } from '../services/APIS/userApis';
import { addPost, clearUser } from '../services/slices/userSlice';
import { useNavigate } from 'react-router';

const AddPost = () => {
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState("");
    const [summary, setSummary] = useState("");
    const [description, setDescription] = useState("");
    const [displayPicture, setDisplayPicture] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);  
    const userId = useSelector(state => state.userId);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setDisplayPicture(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("summery", summary);
            formData.append("mainContent", description);
            formData.append("userId", userId);
            tags.split(',')
                .map(tag => tag.trim())
                .filter(tag => tag.length > 0)
                .forEach(tag => formData.append("tags[]", tag));

            if (displayPicture) formData.append("image", displayPicture);

            const response = await addUserPost(formData);

            if (response.status < 400) {
                dispatch(addPost(response._id));
                navigate("/");
            } else if (response.status === 401) {
                alert("You are unauthorized to perform this action. Please login.");
                dispatch(clearUser());
                localStorage.clear();
                navigate("/auth/login");
            } else {
                alert("Something went wrong. Please try again.");
            }
        } catch (error) {
            console.error("Error publishing post:", error);
            alert("Failed to publish post. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-violet-900 text-white flex flex-col items-center py-10 px-4">
            <h1 className="text-4xl font-extrabold text-violet-500 mb-8">Create Your Post</h1>

            <form className="w-full max-w-3xl bg-black/70 p-8 rounded-lg shadow-2xl" onSubmit={handleSubmit}>
                <div className="mb-6">
                    <label htmlFor="title" className="block text-lg font-semibold text-violet-400 mb-2">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-violet-500 outline-none"
                        placeholder="Enter the title"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="displayPicture" className="block text-lg font-semibold text-violet-400 mb-2">Display Picture</label>
                    <input
                        type="file"
                        id="displayPicture"
                        onChange={handleFileChange}
                        className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-violet-500 outline-none"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="tags" className="block text-lg font-semibold text-violet-400 mb-2">Tags</label>
                    <input
                        type="text"
                        id="tags"
                        name="tags"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-violet-500 outline-none"
                        placeholder="Add tags separated by commas"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="summary" className="block text-lg font-semibold text-violet-400 mb-2">Short Summary</label>
                    <textarea
                        id="summary"
                        name="summary"
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-violet-500 outline-none"
                        placeholder="Write a short summary of the post"
                        rows="3"
                        required
                    ></textarea>
                </div>

                <div className="mb-6">
                    <label htmlFor="description" className="block text-lg font-semibold text-violet-400 mb-2">Complete Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-violet-500 outline-none"
                        placeholder="Write the complete description of the post"
                        rows="6"
                        required
                    ></textarea>
                </div>

                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="bg-violet-600 text-white font-bold px-8 py-3 rounded-lg hover:bg-violet-700 transition duration-200 shadow-lg transform hover:scale-105"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <div className="flex items-center">
                                <div className="loader mr-2"></div>
                                Publishing...
                            </div>
                        ) : 'Publish Post'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddPost;
