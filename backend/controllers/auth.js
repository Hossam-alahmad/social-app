import bcrypt from "bcrypt";
import User from "../models/user.js";
import { generateJWT } from "../helpers/jwtGenerate.js";
import asyncHandler from "express-async-handler";
/* Register user */
export const register = async (req, res) => {
    try {
        const { firstName, lastName, password, email, location, occupation } =
            req.body;
        const isEmailExist = await User.findOne({ email });
        if (isEmailExist) {
            res.status(404);
            throw new Error("Email already exist");
        }
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        const newUser = await User.create({
            firstname: firstName,
            lastname: lastName,
            password: passwordHash,
            email,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000),
        });
        if (newUser) return res.status(201).json(newUser);
        res.status(404).json({ message: "Register user failed" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) {
        if ((await bcrypt.compare(password, user.password)) === false) {
            res.status(400);
            throw new Error("password invalid");
        }
        const token = generateJWT({
            id: user._id,
            fullname: user.firstname + " " + user.lastname,
        });
        return res.status(200).json({
            user: {
                ...user._doc,
                picturePath: user.picturePath
                    ? "assets/users/" + user.picturePath
                    : "",
            },
            token: token,
            expireHours: 8,
        });
    }
    res.status(400);
    throw new Error("email not found");
});
