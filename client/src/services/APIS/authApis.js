import axios from "axios";
import { data } from "react-router";

const authApi=axios.create({
    baseURL:"http://localhost:5000/"
})



export const signinCurrentUser = async (credentials) => {
    try {
      const userData = await authApi.post("signin", credentials);
      return { status: userData.status, userData: userData.data || {} };
    } catch (error) {
      console.error("Error during login:", error.message);
      return { status: error.response?.status || 500, userData: {} };
    }
};


export const signupCurrentUser=async(credentials)=>{
    try {
        console.log(credentials);
        
        const response=await authApi.post("signup",credentials);

        return {status:response.status,user:response.data.user,token:response.data.token};
    } catch (error) {
        return { status: error.response?.status || 500, user:{},token:""};
    }
}

