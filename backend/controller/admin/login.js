import dotenv from "dotenv";
dotenv.config();
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import Admin from "../../model/admin/admin.js";

export const CreateAdmin = asyncHandler(async (req , res)=>{


    const {Name , Email , Phone , Password , Role , CollegeName } = req.body

    if(!Name || !Email || !Phone || !Password || !Role || !CollegeName){
        res.status(400)
        throw new Error("All Fields are Mandatory")
    }

    const adminExist = await Admin.findOne({Email})
    if(adminExist){
        res.status(400)
        throw new Error("Admin Already Exist")
    }

    const hash = await bcrypt.hash(Password , 10)

    const admin = await Admin.create({
        Name,
        Email,
        Phone,
        Password: hash,
        Role,
        CollegeName
    })

    res.status(201).json({
        message: "Admin Created Successfully",
    })
})

export const LoginAdmin = asyncHandler(async (req , res)=>{
    console.log(req.body)
    const {Email , Password} = req.body

    if(!Email || !Password){
        res.status(400)
        throw new Error("All Fields are Mandatory")
    }

    const admin = await Admin.findOne({Email})
    if(!admin){
        res.status(400)
        throw new Error("Admin Not Found")
    }
    const isPasswordMatch = await bcrypt.compare(Password , admin.Password)
    if(!isPasswordMatch){
        res.status(400)
        throw new Error("Invalid Credentials")
    }

    const token = jwt.sign({id: admin._id} , process.env.JWT_SECRET , {expiresIn: "1d"})
    res.cookie("token", token, { httpOnly: true, secure: true, sameSite: 'None', maxAge:24 * 60 * 60 * 1000 });

    res.cookie("token" , token , {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000
    })

    const Temp_Admin = {
        Name : admin.Name,
        Email : admin.Email,
        Phone : admin.Phone,
        Role : admin.Role,
        CollegeName : admin.CollegeName
    }

    res.status(200).json({
        message: "Login Successful",
        token,
        Admin : Temp_Admin
    })  
})