import dotenv from "dotenv"
dotenv.config()
import express from "express"
import ConnectDB from "./DB/db.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import helmet from "helmet"
import ratelimit from "express-rate-limit"
import hpp from "hpp";
import Admin from "./router/admin/admin.js"
import User from "./router/user/user.js"



const app = express()
const PORT = process.env.PORT || 2000
const limiter = ratelimit({
    windowMs: 5 * 60 * 1000,
    max: 10,
    message: "Too many requests from this IP, please try again after 15 minutes"
})
// app.use(limiter)
app.use(express.json());
app.use(express.urlencoded({ limit: '20mb', extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(helmet())
app.use(hpp());
app.use("/api/admin", Admin)
app.use("/api/user", User)
ConnectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Server Running On Port ${PORT}`);
    });
}).catch((error) => {
    console.error("Failed to connect to the database:", error);
})