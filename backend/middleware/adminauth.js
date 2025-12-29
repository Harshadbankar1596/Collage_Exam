import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import AsyncHandler from "express-async-handler";
import Admin from "../model/admin/admin.js";

const AdminAuth = AsyncHandler(async (req ,res , next) => {
    const token = req.cookies.token
    console.log("token => " , token);
    

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {   
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if(decoded.exp < Date.now() / 1000) {
            return  res.status(401).json({ message: "Token expired" });
        }

        const admin = await Admin.findById(decoded.id).select("_id").lean()

        if(!admin){
            res.status(401).json({message : "Admin Not Unauthorized"})
        }

        next()
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
});

export default AdminAuth;