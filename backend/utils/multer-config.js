import multer from "multer";
import path from "path";
/* File storage for  */
let storagePath;
export const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (req.baseUrl.includes("posts")) {
            storagePath = "/posts";
        } else if (req.baseUrl.includes("users")) {
            storagePath = "/users";
        }
        cb(null, `public/assets${storagePath}`);
    },
    filename: (req, file, cb) => {
        cb(
            null,
            `${new Date().getTime()}_post_picture${path.extname(
                file.originalname
            )}`
        );
    },
});
