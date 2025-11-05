import dotenv from "dotenv";
dotenv.config();
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser";
import User from "../../model/user/user.js"
import validator from "validator";

export const RegisterUser = asyncHandler(async (req, res) => {
    const { Name, Email, Phone, RollNo, PRN, Password } = req.body
    console.log(req.body)
    if (!Name || !Email || !Phone || !RollNo || !PRN || !Password) {
        return res.status(400).json({ message: "Please fill all fields" })
    }

    if (!validator.isEmail(Email)) {
        return res.status(400).json({ message: "Invalid email address" })
    }

    if (!validator.isMobilePhone(Phone)) {
        return res.status(400).json({ message: "Invalid phone number" })
    }

    if (!validator.isStrongPassword(Password)) {
        return res.status(400).json({ message: "Password is not strong enough" })
    }

    const userExist = await User.findOne({ Email })

    if (userExist) return res.status(400).json({ message: "User with this email already exists" })

    const hash = await bcrypt.hash(Password, 10)

    const user = await User.create({
        Name,
        Email,
        Phone,
        RollNo,
        PRN,
        Password: hash
    })

    res.status(201).json({ message: "User registered successfully" })
})

export const UserLogin = asyncHandler(async (req, res) => {
    const { Email, Password } = req.body

    if (!Email || !Password) {
       return res.status(400).json({ message: "Please fill all fields" })
    }

    const user = await User.findOne({ Email })

    if (!user) {
       return res.status(400).json({ message: "User not found" })
    }

    const isPasswordValid = await bcrypt.compare(Password, user.Password)

    if (!isPasswordValid) {
       return res.status(400).json({ message: "Invalid credentials" })
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" })
    res.cookie("token", token, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

    res.status(200).json({
        message: "Login successful", user: {
            Name: user.Name,
            Email: user.Email,
            RollNo: user.RollNo,
            PRN: user.PRN,
            token: token
        }
    })

})

