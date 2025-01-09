import { Router } from "express";
import { signupUsers, singinUsers } from "../controllers/auth.controllers.js";
import authMiddleware from "../middlewares/auth.js";
import User from "../models/user.model.js";




const authRouter=Router();

authRouter.post("/signup",signupUsers);
authRouter.post("/signin",singinUsers);

authRouter.get("/validatetoken", authMiddleware, async (req, res) => {
    try {
      const { userId } = req.body;
      const validUser = await User.findById(userId).select("-password -email");
      if (!validUser) return res.status(404).json({ message: "User not found" });
      const user=validUser;
      return res.status(200).json(user);
    } catch (error) {
      console.error("Error validating token:", error.message);
      return res.status(500).json({ message: "Something went wrong on the server side" });
    }
})
  













export default authRouter;