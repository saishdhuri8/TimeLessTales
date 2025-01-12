import React, { useState } from 'react';
import { signinCurrentUser } from '../../services/APIS/authApis';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../services/slices/userSlice';
import { useNavigate } from 'react-router';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userExists, setUserExists] = useState(false);
  const [passwordCorrect, setPasswordCorrect] = useState(false);
  const [serverError, setServerError] = useState(false);
  const [loading, setLoading] = useState(false);  // Added state for loading
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Please fill in both fields');
      return;
    }

    setLoading(true); // Start loading

    try {
      const { status, userData } = await signinCurrentUser({ email, password });

      if (status === 404) {
        setUserExists(true);
        setLoading(false); // Stop loading
        return;
      }
      if (status === 500) {
        setServerError(true);
        setLoading(false); // Stop loading
        return;
      }
      if (status === 401) {
        setPasswordCorrect(true);
        setLoading(false); // Stop loading
        return;
      }

      dispatch(updateUser(userData.user));
      localStorage.setItem("profile", userData.token);

      setEmail('');
      setPassword('');
      setPasswordCorrect(false);
      setServerError(false);
      setUserExists(false);
      setLoading(false); // Stop loading
      navigate("/");
    } catch (error) {
      console.error('Error during login:', error);
      setServerError(true);
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-violet-900 to-black flex items-center justify-center">
      <form>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
          <div className="w-full bg-white/10 rounded-lg shadow-lg border border-gray-700 backdrop-blur-sm md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-6 md:space-y-8 sm:p-8">
              <p className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl text-center">
                WELCOME BACK
              </p>
              {/* Error Message Display */}
              {userExists && (
                <div className="w-full text-center text-white bg-red-500 p-2 mb-4 rounded-lg">
                  User not found. Please check your email.
                </div>
              )}
              {passwordCorrect && (
                <div className="w-full text-center text-white bg-red-500 p-2 mb-4 rounded-lg">
                  Incorrect password. Please try again.
                </div>
              )}
              {serverError && (
                <div className="w-full text-center text-white bg-red-500 p-2 mb-4 rounded-lg">
                  Something went wrong on the server side. Please try again later.
                </div>
              )}
              {/* Loader */}
              {loading && (
                <div className="w-full text-center text-white bg-violet-600 p-2 mb-4 rounded-lg">
                  Loading...
                </div>
              )}
              {/* Name and Last Name Fields */}
              <div className="flex flex-col gap-4">
                <div className="w-full">
                  <label
                    className="block mb-2 text-sm font-medium text-white"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} // Update email state
                    placeholder="Email"
                    className="bg-gray-800 border border-gray-600 text-white sm:text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:ring-violet-500 focus:border-violet-500"
                    id="email"
                    type="email"
                  />
                </div>
                <div>
                  <label
                    className="block mb-2 text-sm font-medium text-white"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} // Update password state
                    className="bg-gray-800 border border-gray-600 text-white sm:text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:ring-violet-500 focus:border-violet-500"
                    placeholder="••••••••"
                    id="password"
                    type="password"
                  />
                </div>
              </div>
              <button
                className="w-full bg-violet-600 hover:bg-violet-700 focus:ring-4 focus:outline-none focus:ring-violet-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white transition duration-200"
                type="submit"
                onClick={handleClick} // Trigger the handleClick function
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
