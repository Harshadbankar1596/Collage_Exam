import mongoose from "mongoose";
// import { Admin_DB } from "../../DB/db.js";
const AdminSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
      trim: true,
    },
    Email: {
      type: String,
      required: true,
      unique: true, 
      lowercase: true,
      trim: true,
      index: true, 
    },
    Phone: {
      type: String,
      required: true,
      trim: true,
    },
    Password: {
      type: String,
      required: true,
      minlength: 6,
    },
    Role: {
      type: String,
      default: "teacher",
    },
    CollegeName: {
      type: String,
      required: true,
      trim: true,
    },
    ConductedExams: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Exam",
      },
    ],
  },
  { timestamps: true }
);


export default mongoose.model("Admin", AdminSchema);