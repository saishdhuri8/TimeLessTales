import { Route, Routes } from "react-router"

import Signup from "./components/authComponents/Signup"
import Login from "./components/authComponents/Login"
import AuthLayout from "./components/layouts/AuthLayout"
import HomeLayout from "./components/layouts/HomeLayout"
import DetailedCard from "./components/DetailedCard"
import AllCards from "./components/AllCards"
import UserProfile from "./components/UserProfile"
import AddPost from "./components/AddPost"
import EditProfile from "./components/EditProfile"
import { useEffect } from "react"
import { validateExistingToken } from "./services/APIS/userApis"
import { useDispatch} from "react-redux"
import DeletePost from "./components/DeletePost"



function App() {
  const dispatch=useDispatch();

  useEffect(()=>{
    const response= validateExistingToken(dispatch)
  },[])

  return (
    <div>
      <Routes>

        <Route path="/" element={<HomeLayout />}>

                  <Route path="" element={<AllCards/>}/>
                  <Route path="/post/:postId" element={<DetailedCard />} />
                  <Route path="/user/:userId" element={<UserProfile/>} />
                  <Route path="/user/addpost" element={<AddPost/>} />
                  <Route path="/user/deletepost" element={<DeletePost/>} />
                  <Route path="/user/editprofile" element={<EditProfile/>} />

        </Route>

        <Route path="/auth" element={<AuthLayout />}>

                  <Route path="/auth/login" element={<Login />} />
                  <Route path="/auth/signup" element={<Signup />} />
                  
        </Route>



      </Routes>


    </div>
  )
}

export default App
