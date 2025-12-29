import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken"
import User from "../model/user/user.js"
import asyncHandler from "express-async-handler";


const UserAuth = asyncHandler(async (req , res , next) => {
    const token = req.cookies.token
    console.log("token => " , token);
    
    if(!token){
        res.status(401).json({message : "Unauthorized"})
    }

    const decoded = jwt.verify(token , process.env.JWT_SECRET)

    const user = await User.findById(decoded.id)

    if(!user){
        return res.status(404).json({message : "User not found"})
    }

    next()
})

export default UserAuth