import mongoose from "mongoose"

const SubmitExamSchema = new mongoose.Schema({
    UserId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "User",
        index : true
    },
    Exam : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "Exam",
        index : true
    },

    Admin : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "Admin",
        index : true
    },

    Answers : [
        {
            QuestionId : {type : mongoose.Schema.Types.ObjectId},
            Submit : { type: String, required: true }
        }
    ],

   
},{timestamps : true})

export default mongoose.model("SubmitExam" , SubmitExamSchema)