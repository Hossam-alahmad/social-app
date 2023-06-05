import axios from "axios";
import { authHeader } from "./authHeader";
const API_ENDPOINT = process.env.REACT_APP_BACKEND_API + "api/auth/";

const register = async data => {
    return await axios.post(API_ENDPOINT + "register", data);
};
const login = async data => {
    return await axios.post(API_ENDPOINT + "login", data);
};
const verifyToken = async () => {
    return await axios.get(API_ENDPOINT + "/check-token", {
        headers: authHeader(),
    });
};

export default {
    register,
    login,
    verifyToken,
};
