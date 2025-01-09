import User from "../models/user.model.js";
import { generateToken } from "../Utils/tokenThings.js";
import bcrypt from "bcrypt";



export const signupUsers = async (req, res) => {
    try {
      const newUserData = req.body;
  
      // Check if the user already exists
      const ifUserExist = await User.findOne({ email: newUserData.email });
      if (ifUserExist) {
        return res.status(409).json({ message: "User already exists" });
      }
  
      // Create the new user
      const newUser = await User.create(newUserData);
  
      // Convert the Mongoose object to a plain JavaScript object to safely delete sensitive fields
      const userObject = newUser.toObject();  // Or use `newUser.lean()` if needed
  
      // Remove sensitive fields
      delete userObject.password;
      delete userObject.email;
  
      // Generate the token
      const token = generateToken(newUser._id.toString());
     
      // Send response with user data and token
      return res.status(201).json({ user:userObject, token: token });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Something went wrong on the server side" });
    }
  };
  


export const singinUsers = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const validUser = await User.findOne({ email: email });
    if (!validUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, validUser.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Wrong credentials" });
    }

    // Generate token
    const token = generateToken(validUser._id);

    // Convert to plain object and remove sensitive fields
    const userObject = validUser.toObject(); // or use `validUser.lean()` if the query supports it
    delete userObject.password;
    delete userObject.email;

    // Return user details with token
    return res.status(200).json({ user: userObject, token: token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong on server side" });
  }
};
