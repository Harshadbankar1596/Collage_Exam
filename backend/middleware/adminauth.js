import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import AsyncHandler from "express-async-handler";

const AdminAuth = AsyncHandler(async (req ,res , next) => {
    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decoded)

        if(decoded.exp < Date.now() / 1000) {
            return  res.status(401).json({ message: "Token expired" });
        }

        next()
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
});

export default AdminAuth;