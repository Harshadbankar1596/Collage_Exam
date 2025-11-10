import dotenv from "dotenv";
dotenv.config();
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import Admin from "../../model/admin/admin.js";
import validator from "validator";

export const CreateAdmin = asyncHandler(async (req, res) => {
    console.log(req.body)
    const { Name, Email, Phone, Password, Role, CollegeName } = req.body;

    if (!Name || !Email || !Phone || !Password || !Role || !CollegeName) {
        return res.status(400).json({ message: "All fields are mandatory" });

    }

    if (!validator.isEmail(Email)) {
        return res.status(400).json({ message: "Invalid email address" });
    }

    if (!validator.isStrongPassword(Password, { minLength: 8 })) {
        return res
            .status(400)
            .json({ message: "Password is not strong enough (min 8 chars, use upper, lower, number & symbol)" });
    }

    const adminExist = await Admin.findOne({ Email });

    if (adminExist) return res.status(400).json({ message: "Admin with this email already exists" });

    const hash = await bcrypt.hash(Password, 10);

    const admin = await Admin.create({
        Name,
        Email,
        Phone,
        Password: hash,
        Role,
        CollegeName,
    });

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "1d" })
    res.cookie("token", token, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

    res.status(201).json({
        message: "Admin created successfully",
        admin: {
            _id: admin._id,
            Name: admin.Name,
            Email: admin.Email,
            Role: admin.Role,
            CollegeName: admin.CollegeName,
            token: token,
            Phone: admin.Phone
        },
    });
});

export const LoginAdmin = asyncHandler(async (req, res) => {
    const { Email, Password } = req.body

    if (!Email || !Password) {
        res.status(400)
        throw new Error("All Fields are Mandatory")
    }

    const admin = await Admin.findOne({ Email })
    if (!admin) {
        return res.status(400).json({ message: "Invalid Credentials" })
    }

    const isPasswordMatch = await bcrypt.compare(Password, admin.Password)

    if (!isPasswordMatch) {
        return res.status(400).json({ message: "Invalid Password" })
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "1d" })
    res.cookie("token", token, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });



    res.status(200).json({
        message: "Login Successful",
        admin: {
            _id: admin._id,
            Name: admin.Name,
            Email: admin.Email,
            Role: admin.Role,
            CollegeName: admin.CollegeName,
            token: token,
            Phone: admin.Phone
        }
    })
})