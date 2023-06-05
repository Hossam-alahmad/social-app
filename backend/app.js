import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import routes from "./routes/index.js";
import { errorHandler } from "./middleware/errorHandler.js";
/* Configurations */
// this config because we use import insted of require
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* File storage */

/* api */
app.use("/api", routes);
app.use("*", (req, res, next) => {
    res.status(401);
    throw new Error("Connot access this route");
});
app.use(errorHandler);
/* Mongoose setup */

const PORT = process.env.PORT || 6001;

mongoose
    .connect(process.env.DB_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() =>
        app.listen(PORT, () =>
            console.log(`DB Connect and Server running in port ${PORT}`)
        )
    )
    .catch(err => console.log(`${err} did not connect`));
