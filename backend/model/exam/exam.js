import mongoose from "mongoose"
// import { Exam_DB } from "../../DB/db.js";

const ExamSchema = new mongoose.Schema({

    ExamName: {
        type: String,
        require: true
    },

    ExamCode: {
        type: String,
        require: true,
        unique: true,
        index: true
    },

    Class: {
        type: String,
        required: true
    },

    AdminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
        required: true,
        index: true,
    },

    Questions: [
        {
            Name: { type: String, required: true },
            Options:[],
            Answer: { type: String, require: true }
        }
    ],

    Duration: {
        type: Number
    }

}, { timestamps: true })


export default mongoose.model("Exam", ExamSchema)