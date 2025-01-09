import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editUserInfo } from '../services/APIS/userApis';
import { clearUser, updateProfilePicAndBio } from '../services/slices/userSlice';
import { useNavigate } from 'react-router';

const EditProfile = () => {
    const profilePic = useSelector(state => state.profilePic);
    const [bio, setBio] = useState("");
    const [profilePicture, setProfilePicture] = useState(null);
    const userId = useSelector(state => state.userId);
    const [loading, setLoading] = useState(false); // Loading state
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleFileChange = (e) => {
        setProfilePicture(e.target.files[0]);
    };

    const handleBioChange = (e) => {
        setBio(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading) return; // Prevent multiple requests

        setLoading(true); // Show loader

        try {
            const formData = new FormData();
            formData.append("bio", bio);
            formData.append("userId", userId);
            formData.append("oldProfilePic", profilePic);
            if (profilePicture) formData.append("image", profilePicture);

            const response = await editUserInfo(formData);

            if (response.status < 400) {
                dispatch(updateProfilePicAndBio(response));
                alert("Profile updated successfully!");
                navigate("/");
            } else if (response.status === 401) {
                alert("You are unauthorized to perform this action, kindly log in.");
                dispatch(clearUser());
                localStorage.clear();
                navigate("/");
            } else {
                alert("Something went wrong. Please try again later.");
            }
        } catch (error) {
            alert("An error occurred. Please try again.");
        } finally {
            setLoading(false); // Hide loader
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-tr from-gray-900 via-black to-violet-900 text-white flex items-center justify-center py-10 px-6">
            <div className="w-full max-w-2xl bg-black/80 rounded-xl shadow-2xl p-8">
                <h1 className="text-3xl font-extrabold text-violet-500 mb-6 text-center">Edit Profile</h1>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* Profile Picture */}
                    <div className="flex flex-col items-center mb-6">
                        <label htmlFor="profilePicture" className="block text-lg font-semibold text-violet-400 mb-3">
                            Profile Picture
                        </label>
                        <input
                            type="file"
                            id="profilePicture"
                            onChange={handleFileChange}
                            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-violet-500 outline-none"
                        />
                    </div>

                    {/* Bio */}
                    <div>
                        <label htmlFor="bio" className="block text-lg font-semibold text-violet-400 mb-2">
                            Bio
                        </label>
                        <textarea
                            id="bio"
                            name="bio"
                            value={bio}
                            onChange={handleBioChange}
                            className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-violet-500 outline-none"
                            placeholder="Write a short bio about yourself"
                            rows="4"
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center items-center">
                        <button
                            type="submit"
                            className={`bg-violet-600 text-white font-bold px-8 py-3 rounded-lg hover:bg-violet-700 transition duration-200 shadow-md transform hover:scale-105 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={loading}
                        >
                            {loading ? "Saving..." : "Save Changes"}
                        </button>
                        {loading && (
                            <div className="ml-4">
                                <svg
                                    className="animate-spin h-6 w-6 text-violet-500"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v8H4z"
                                    ></path>
                                </svg>
                            </div>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfile;
