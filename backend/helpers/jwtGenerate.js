import jwt from "jsonwebtoken";

export const generateJWT = (data, expire = "8h") => {
    return jwt.sign(data, process.env.JWT_PRIVATE_KEY, {
        expiresIn: expire,
    });
};
