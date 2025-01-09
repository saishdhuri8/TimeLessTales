import axios from 'axios'


const api = axios.create({
    baseURL: "https://time-less-tales-api.vercel.app/"
    // baseURL: "http://localhost:5000/"

})


export const getDetailedPost = async (postId) => {
    const post = await api.get(`postInfo/${postId}`);
    return post.data;
}
export const getUserBasicInfo = async (userId) => {
    const user = await api.get(`basicuserinfo/${userId}`);
    return user.data;
}

export const getCompleteUserInfo = async (userId) => {
    const user = await api.get(`userinfo/${userId}`);
    return user.data;
}

export const getALLPosts = async () => {
    const allPostData = await api.get("posts");
    return allPostData;
}

export const getUserPosts = async (array) => {
    const allPosts = await api.post("posts/array", { allPostIds: array });
    return allPosts.data;
}


export const getAllComments = async (array) => {
    console.log(array);
    
    try {
        const allComments = await api.post("getcomments", { commentsArray: array });
        return { status: allComments.status, finalComments: allComments.data };
    } catch (error) {
        console.log(error);
        return { status: error.status, finalComments: [] };
    }

}