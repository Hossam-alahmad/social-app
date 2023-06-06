import asyncHandler from "express-async-handler";
import User from "../models/user.js";
import Post from "../models/post.js";

export const createPost = asyncHandler(async (req, res) => {
    const { userId, description, picturePath } = req.body;
    if (!userId || !description) {
        res.status(400);
        throw new Error("data not complete");
    }
    const user = await User.findById(userId);
    if (user) {
        const post = await Post.create({
            userId,
            firstname: user.firstname,
            lastname: user.lastname,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath: picturePath !== "" ? req.file.filename : "",
            likes: {},
            comments: [],
        });
        res.status(201).json(post);
    }
    res.status(404);
    throw new Error("User not found");
});
export const getFeedPosts = asyncHandler(async (req, res) => {
    const post = await Post.find().sort("-createdAt");

    const formattedPost = post.map(p => {
        return {
            ...p._doc,
            picturePath: p.picturePath ? "assets/posts/" + p.picturePath : "",
            userPicturePath: p.userPicturePath
                ? "assets/users/" + p.userPicturePath
                : "",
            comments: p.comments.map(c => ({
                ...c,
                userImage: c.userImage ? "assets/users/" + c.userImage : "",
            })),
        };
    });
    res.status(200).json(formattedPost);
});
export const getUserPosts = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    if (!userId) {
        res.status(400);
        throw new Error("userId not found");
    }
    const post = await Post.find({ userId }).sort("-createdAt");

    const formattedPost = post.map(p => {
        return {
            ...p._doc,
            picturePath: p.picturePath ? "assets/posts/" + p.picturePath : "",
            userPicturePath: p.userPicturePath
                ? "assets/users/" + p.userPicturePath
                : "",
            comments: p.comments.map(c => ({
                ...c,
                userImage: c.userImage ? "assets/users/" + c.userImage : "",
            })),
        };
    });
    res.status(200).json(formattedPost);
});
export const likePost = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { userId } = req.body;

    if (!id || !userId) {
        res.status(400);
        throw new Error("data not complete");
    }
    const post = await Post.findById(id);
    if (post) {
        const isLiked = post.likes.get(userId);
        if (isLiked) post.likes.delete(userId);
        else post.likes.set(userId, true);

        const updatePost = await Post.findByIdAndUpdate(
            id,
            {
                likes: post.likes,
            },
            { new: true }
        );
        res.status(200).json(updatePost);
    }
    res.status(404);
    throw new Error("Post not found");
});
export const addComment = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { userId, comment } = req.body;

    if (!id || !userId || !comment) {
        res.status(400);
        throw new Error("data not complete");
    }
    const post = await Post.findById(id);
    if (post) {
        post.comments.push(comment);
        post.save();
        res.status(200).json(post);
    }
    res.status(404);
    throw new Error("Post not found");
});
