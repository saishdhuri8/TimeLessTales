import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router'; 
import { clearUser } from '../services/slices/userSlice';

const Navbar = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.isAuth); 
    const profilePic = useSelector(state => state.profilePic);
    const userId = useSelector(state => state.userId);
    const navigate = useNavigate();
    const name = useSelector(state => state.name);
    const lastName = useSelector(state => state.lastName);

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); 

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleLogout = () => {
        localStorage.clear();
        dispatch(clearUser());
        navigate("/");
    };

    return (
        <nav className="fixed w-screen z-20 flex items-center justify-between bg-black py-4 px-6 shadow-md">
            {/* Logo Section */}
            <div className="flex items-center space-x-3">
                <img src="https://res.cloudinary.com/ddnpfkfe0/image/upload/v1736457544/i4gwlrxicmejzillb8te.png" alt="logo" className="h-10 w-10" />
                <Link to={"/"}>
                    <span className="text-white text-lg font-bold hover:underline">TimeLessTales</span>
                </Link>
            </div>

            {/* Conditional Rendering Based on Login Status */}
            {isLoggedIn ? (
                <div className="relative">
                    <div className='flex flex-row gap-6 justify-between items-center font-bold'>
                        <div className='text-white'>
                            <span className='text-violet-400'>WELCOME</span>
                            <span className='hidden lg:inline'>{` ${name.toUpperCase()} ${lastName.toUpperCase()}`}</span>
                        </div>
                        <button
                            onClick={toggleDropdown}
                            className="flex items-center focus:outline-none">
                            <img
                                src={profilePic}
                                alt="User Profile"
                                className="h-10 w-10 rounded-full border-2 border-white"
                            />
                        </button>
                    </div>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-black rounded-lg shadow-lg py-2 border border-violet-600">
                            <Link to={`/user/${userId}`} className="block px-4 py-2 text-white hover:bg-violet-600">Profile</Link>
                            <Link to={"/user/addpost"} className="block px-4 py-2 text-white hover:bg-violet-600">Add Posts</Link>
                            <Link to={"/user/deletepost"} className="block px-4 py-2 text-white hover:bg-violet-600">Delete Post</Link>
                            <Link to={"/user/editprofile"} className="block px-4 py-2 text-white hover:bg-violet-600">Edit Profile</Link>
                            <button onClick={handleLogout} className="flex justify-start px-4 py-2 w-full text-white hover:bg-violet-600">Logout</button>
                        </div>
                    )}
                </div>
            ) : (
                <>
                    {/* Normal Buttons (hidden on small screens) */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/auth/login" className="text-white font-bold hover:text-violet-500 transition duration-200">Login</Link>
                        <Link to="/auth/signup" className="bg-violet-600 font-extrabold text-white px-4 py-2 rounded-lg hover:bg-violet-700 transition duration-200">
                            Sign Up
                        </Link>
                    </div>

                    {/* Hamburger Menu Button (visible on small screens) */}
                    <button
                        className="md:hidden text-white text-2xl focus:outline-none"
                        onClick={toggleSidebar}
                    >
                        ☰
                    </button>

                    {/* Sidebar */}
                    <div
                        className={`fixed top-0 right-0 h-full w-64 bg-black text-white transform ${
                            isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
                        } transition-transform duration-300 ease-in-out shadow-lg`}
                    >
                        <button
                            onClick={toggleSidebar}
                            className="absolute top-4 right-4 text-2xl"
                        >
                            ✕
                        </button>
                        <div className="mt-16 flex flex-col items-center space-y-6">
                            <Link to="/auth/login" className="text-lg font-bold hover:text-violet-500" onClick={toggleSidebar}>
                                Login
                            </Link>
                            <Link to="/auth/signup" className="bg-violet-600 font-extrabold text-white px-4 py-2 rounded-lg hover:bg-violet-700 transition duration-200" onClick={toggleSidebar}>
                                Sign Up
                            </Link>
                        </div>
                    </div>
                </>
            )}
        </nav>
    );
};

export default Navbar;
