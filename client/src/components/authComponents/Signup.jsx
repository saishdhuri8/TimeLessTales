import React, { useState } from "react";
import { signinCurrentUser, signupCurrentUser } from "../../services/APIS/authApis";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../services/slices/userSlice";
import { useNavigate } from "react-router";

const Signup = () => {
  // State handlers for form fields and error messages
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const [errors, setErrors] = useState("");

  const handleChange = async(e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    // Validate inputs
    if (
      !formData.name ||
      !formData.lastName ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setErrors("All fields are required!");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrors("Passwords do not match!");
      return;
    }

    if (formData.password.length < 6) {
      setErrors("Password must be at least 6 characters long!");
      return;
    }

   
    const userData=formData;
    delete userData.confirmPassword;

    navigate("");
    const {status,user,token} = await signupCurrentUser(userData);

    
    if(status===409){
      setErrors("User Already exits");
      return;
    }
    if(status===500){
      setErrors("Somthing went wrong onr the server side")
      return;
    }
    
    localStorage.setItem("profile",token);
    dispatch(updateUser(user));


    setErrors("");
   
    alert("Account created successfully!");
    navigate("/");
  };


  

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-violet-900 to-black flex items-center justify-center px-4">
      <form
        className="w-full max-w-lg bg-white/10 rounded-lg shadow-lg border border-gray-700 backdrop-blur-sm p-6 space-y-6"
        onSubmit={handleSubmit}
      >
        <p className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl text-center">
          Create an account
        </p>
        {errors && (
          <div className="text-red-500 text-sm font-medium text-center">
            {errors}
          </div>
        )}
        {/* Name and Last Name Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              className="block mb-2 text-sm font-medium text-white"
              htmlFor="name"
            >
              Name
            </label>
            <input
              placeholder="First Name"
              className="bg-gray-800 border uppercase border-gray-600 text-white sm:text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:ring-violet-500 focus:border-violet-500"
              id="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              className="block mb-2 text-sm font-medium text-white"
              htmlFor="lastName"
            >
              Last Name
            </label>
            <input
              placeholder="Last Name"
              className="bg-gray-800 border uppercase border-gray-600 text-white sm:text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:ring-violet-500 focus:border-violet-500"
              id="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
        </div>
        {/* Email Field */}
        <div>
          <label
            className="block mb-2 text-sm font-medium text-white"
            htmlFor="email"
          >
            Email
          </label>
          <input
            placeholder="example@example.com"
            className="bg-gray-800 border lowercase border-gray-600 text-white sm:text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:ring-violet-500 focus:border-violet-500"
            id="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        {/* Password Field */}
        <div>
          <label
            className="block mb-2 text-sm font-medium text-white"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="bg-gray-800 border border-gray-600 text-white sm:text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:ring-violet-500 focus:border-violet-500"
            placeholder="••••••••"
            id="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        {/* Confirm Password Field */}
        <div>
          <label
            className="block mb-2 text-sm font-medium text-white"
            htmlFor="confirmPassword"
          >
            Confirm password
          </label>
          <input
            className="bg-gray-800 border border-gray-600 text-white sm:text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:ring-violet-500 focus:border-violet-500"
            placeholder="••••••••"
            id="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>
        {/* Submit Button */}
        <button
          className="w-full bg-violet-600 hover:bg-violet-700 focus:ring-4 focus:outline-none focus:ring-violet-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white transition duration-200"
          type="submit"
        >
          Create an account
        </button>
      </form>
    </div>
  );
};

export default Signup;
