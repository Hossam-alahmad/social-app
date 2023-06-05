import express from "express";
import authRoute from "./auth.js";
import userRoute from "./users.js";
import postRoute from "./posts.js";

const router = express.Router();

router.use("/auth", authRoute);
router.use("/users", userRoute);
router.use("/posts", postRoute);
export default router;
