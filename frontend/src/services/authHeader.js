import { getCookie } from "../utils/cookies";

export const authHeader = () => {
    const token = getCookie("token");
    if (token !== "") {
        return {
            token: token,
        };
    }
    return {};
};
