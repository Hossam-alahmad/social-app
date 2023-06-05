import axios from "axios";
const API_ENDPOINT = process.env.REACT_APP_BACKEND_API + "api/users/";
import { authHeader } from "./authHeader";
const addRemoveFriend = async (userId, friendId) => {
    const response = await axios.patch(
        `${API_ENDPOINT}/${userId}/${friendId}`,
        null,
        {
            headers: authHeader(),
        }
    );

    return response;
};

const getFriends = async userId => {
    const response = await axios.get(`${API_ENDPOINT}${userId}/friends`, {
        headers: authHeader(),
    });
    return response.data;
};

const getUser = async userId => {
    const response = await axios.get(`${API_ENDPOINT}${userId}`, {
        headers: authHeader(),
    });

    return response.data;
};

const uploadProfileImage = async data => {
    return await axios.post(`${API_ENDPOINT}upload-image-profile`, data, {
        headers: authHeader(),
    });
};
export default {
    uploadProfileImage,
    addRemoveFriend,
    getFriends,
    getUser,
};
