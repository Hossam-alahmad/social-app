import express from "express";
import { verifyToken } from "../middleware/userAuth.js";
import {
    getFriends,
    getUser,
    addRemoveFriend,
    uploadUserImage,
} from "../controllers/users.js";
const router = express.Router();
import { storage } from "../utils/multer-config.js";
import multer from "multer";

const upload = multer({ storage: storage });
// GET routes
router.use(verifyToken);
router.get("/:id", getUser).get("/:id/friends", getFriends);
router.post(
    "/upload-image-profile",
    upload.single("userImage"),
    uploadUserImage
);
// add routes
router.patch("/:id/:friendId", addRemoveFriend);
export default router;
