import axios from "axios";
const API_ENDPOINT = process.env.REACT_APP_BACKEND_API + "api/posts/";
import { authHeader } from "./authHeader";
const createPost = data => {
    return axios.post(API_ENDPOINT, data, {
        headers: authHeader(),
    });
};

const getFeedPosts = async () => {
    const response = await axios.get(API_ENDPOINT, {
        headers: authHeader(),
    });

    return response.data;
};
const getUserPosts = async userId => {
    const response = await axios.get(`${API_ENDPOINT}${userId}/posts`, {
        headers: authHeader(),
    });

    return response.data;
};
const addRemoveLike = async (postId, userId) => {
    return axios.patch(
        `${API_ENDPOINT}${postId}/like`,
        { userId: userId },
        {
            headers: authHeader(),
        }
    );
};
const addComment = async (postId, data) => {
    return axios.post(`${API_ENDPOINT}${postId}/comment`, data, {
        headers: authHeader(),
    });
};
export default {
    createPost,
    getFeedPosts,
    addRemoveLike,
    getUserPosts,
    addComment,
};
