import mongoose from "mongoose"

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

    Admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
        required: true,
        index: true,
    },

    MarkPerQuestion : {
        type : Number,
        required : true
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
    },

    Participants : {
        type : Number,
        default : 0
    }

    // StartTime :{
    //     type : Date,
    // }

}, { timestamps: true })


export default mongoose.model("Exam", ExamSchema)