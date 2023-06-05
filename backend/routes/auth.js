import express from "express";
import { login, register } from "../controllers/auth.js";
import { verifyToken } from "../middleware/userAuth.js";

const router = express.Router();

router.post("/register", register).post("/login", login);
router.get("/check-token", verifyToken, (req, res) => {
    res.status(200).json({ message: "token good" });
});
export default router;
