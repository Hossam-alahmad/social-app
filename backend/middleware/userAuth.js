import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

export const verifyToken = asyncHandler(async (req, res, next) => {
    const token = req.headers.Token || req.headers.token;
    if (token) {
        jwt.verify(token, process.env.JWT_PRIVATE_KEY, (err, decode) => {
            if (err) {
                res.status(401);
                throw new Error("User is not authorized");
            }
            next();
        });
    } else {
        res.status(401);
        throw new Error("You dont have token");
    }
});
