import dotenv from "dotenv";
dotenv.config();
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import User from "../../model/user/user.js";
import validator from "validator";

export const RegisterUser = asyncHandler(async (req, res) => {
  try {
    const { Name, Email, Phone ,Password } = req.body;

    if (!Name || !Email || !Phone || !Password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    if (!validator.isEmail(Email))
      return res.status(400).json({ message: "Invalid email address" });

    if (!validator.isMobilePhone(Phone, "en-IN"))
      return res.status(400).json({ message: "Invalid phone number" });

    if (
      !validator.isStrongPassword(Password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters long and include upper, lower, number, and symbol.",
      });
    }

    const userExist = await User.findOne({ Email });
    if (userExist)
      return res
        .status(400)
        .json({ message: "User with this email already exists" });

    const hash = await bcrypt.hash(Password, 10);
    const user = await User.create({
      Name,
      Email,
      Phone,
      Password: hash,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        Name: user.Name,
        Email: user.Email,
        Phone: user.Phone,
      },
      token,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


export const UserLogin = asyncHandler(async (req, res) => {
  const { Email, Password } = req.body;

  if (!Email || !Password) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  const user = await User.findOne({ Email });

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const isPasswordValid = await bcrypt.compare(Password, user.Password);

  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    message: "Login successful",
    user: {
      Name: user.Name,
      Email: user.Email,
      RollNo: user.RollNo,
      PRN: user.PRN,
      token: token,
    },
  });
});
