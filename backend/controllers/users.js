import asyncHandler from "express-async-handler";
import User from "../models/user.js";
import fs from "fs";
import path from "path";
import Post from "../models/post.js";
//@ get User
//@ GET route
export const getUser = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (user) {
            const formattedUser = {
                ...user._doc,
                picturePath: user.picturePath
                    ? "assets/users/" + user.picturePath
                    : "",
            };
            res.status(200).json(formattedUser);
        }
        res.status(404);
        throw new Error("User not found");
    } catch (err) {
        res.status(404);
        throw new Error("User not found");
    }
});
//@ get Friends
//@ GET route
export const getFriends = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        const friends = await Promise.all(
            user.friends.map(id => User.findById(id))
        );
        const formattedFriends = friends.map(f => {
            return {
                ...f._doc,
                picturePath: f.picturePath
                    ? "assets/users/" + f.picturePath
                    : "",
            };
        });
        res.status(200).json(formattedFriends);
    } catch (err) {
        res.status(404);
        throw new Error("Friends not found");
    }
});

//@ add/remove Freind
//@ Patch route
export const addRemoveFriend = asyncHandler(async (req, res) => {
    try {
        const { id, friendId } = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);
        if (!user.friends.includes(friendId)) {
            user.friends.push(friendId);
            friend.friends.push(id);

            // console.log(user);
            // console.log(friend);
            user.save();
            friend.save();
            res.status(200).json({ message: "Add friend successfully" });
        } else {
            user.friends = user.friends.filter(id => id !== friendId);
            friend.friends = friend.friends.filter(id => id !== id);
            user.save();
            friend.save();
            res.status(200).json({ message: "Remove successfully" });
        }
    } catch (err) {
        res.status(404);
        throw new Error("Friend not found");
    }
});

export const uploadUserImage = asyncHandler(async (req, res) => {
    const { id } = req.body;
    if (!id) {
        res.status(404);
        throw new Error("User not found");
    }
    const user = await User.findById(id);
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }
    const imagePath = path.resolve(`./public/assets/users`, user.picturePath);
    if (
        fs.existsSync(path.resolve(`./public/assets/users`, user.picturePath))
    ) {
        fs.unlink(imagePath, err => {
            console.log(err);
        });
    }
    user.picturePath = req.file.filename ? req.file.filename : "";
    const posts = await Post.find();
    if (posts.length > 0) {
        posts.forEach(async cp => {
            const comments = cp.comments.map(c => {
                if (c.userId === id) {
                    return {
                        ...c,
                        userImage: user.picturePath,
                    };
                }
                return c;
            });
            await Post.findByIdAndUpdate(cp._id, {
                ...cp._doc,
                userPicturePath:
                    cp.userId === id ? user.picturePath : cp.userPicturePath,
                comments: comments,
            });
        });
        // await Promise.all(
        //     currentPosts.forEach(cp => {
        //         const comments = cp.map(c => ({
        //             ...c,
        //             userImage: user.picturePath,
        //         }));
        //         Post.updateMany(
        //             { userId: id },
        //             { userPicturePath: user.picturePath, comments: comments }
        //         );
        //     })
        // );
    }
    user.save();

    const formattedUser = {
        ...user._doc,
        picturePath: "assets/users/" + user.picturePath,
    };
    res.status(200).json(formattedUser);
});
