import axios from 'axios';
import { updateUser } from '../slices/userSlice';

const userApi = axios.create({
  baseURL: "https://time-less-tales-api.vercel.app/"
  // baseURL: "http://localhost:5000/"
});

userApi.interceptors.request.use((req) => {
  const token = localStorage.getItem('profile');
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});



export const validateExistingToken = async (dispatch) => {
  try {
    const response = await userApi.get("validatetoken");
    if (response.status === 200) {
      dispatch(updateUser(response.data));
    }
  } catch (error) {
    console.log(error);
  }
};

export const editUserInfo = async (formData) => {

  try {
    const response = await userApi.patch(
      "updateprofile",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return { status: response.status, profilePic: response.data.profilePic, bio: response.data.bio };
  } catch (error) {
    console.log(error);
    if (error.status == 500) alert("Somthing went wrong on the server side plearse agaain after some time")
    return { status: error.status };
  }

}


export const addUserPost = async (formData) => {

  try {
    const response = await userApi.post(
      "addpost",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return { status: response.status, postId: response.data._id };
  } catch (error) {
    console.log(error);
    return {status: error.status, postId: null};
  }

}

export const commentOnAPost = async (comment) => {
  try {
    const response = await userApi.patch("commentonpost", comment);
    return { status: response.status };
  } catch (error) {
    console.log(error);
    return { status: error.status };
  }

}

export const likedOrNot = async (data) => {
  try {
    const response = await userApi.post("likedornot", data);
    return { status: response.status, liked: response.data.liked, likes: response.data.likes };
  } catch (error) {
    return { status: error.status, liked: null, likes: 0 };
  }
}

export const likeAPost = async (data) => {
  try {
    const response = await userApi.patch("likepost", data);
    return response.status;
  } catch (error) {
    console.log(error);
    return error.status;
  }
}

export const deletePost = async (data) => {
  try {
    console.log(data);
    
    const response = await userApi.delete("deletepost", {data});
    return response.status;
  } catch (error) {
    return error.status;
  }

}
