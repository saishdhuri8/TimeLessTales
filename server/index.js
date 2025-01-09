import dotenv from 'dotenv';
dotenv.config();


import connectDB from "./DB/db.connection.js";
import express from "express";
import cors from "cors"
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";


const app = express();
connectDB().then(app.listen(process.env.PORT,()=>{console.log(`App listening @ ${5000}`)}))

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE","PATCH"], 
    allowedHeaders: ["Content-Type", "Authorization"] 
}));



app.use(express.json())
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))

  
app.use(authRouter);
app.use(userRouter);


