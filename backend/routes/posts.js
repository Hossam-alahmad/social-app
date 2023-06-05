import express from "express";
import { verifyToken } from "../middleware/userAuth.js";
import {
    createPost,
    getFeedPosts,
    getUserPosts,
    likePost,
    addComment,
} from "../controllers/posts.js";
import { storage } from "../utils/multer-config.js";
import multer from "multer";

const upload = multer({ storage: storage });

const router = express.Router();

router.use(verifyToken);
router.post("/", upload.single("picturePath"), createPost);

router.get("/", getFeedPosts);
router.get("/:userId/posts", getUserPosts);

router.patch("/:id/like", likePost);
router.post("/:id/comment", addComment);
export default router;
