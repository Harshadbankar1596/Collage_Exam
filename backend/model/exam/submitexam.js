// import mongoose from "mongoose"

// const SubmitExamSchema = new mongoose.Schema({
//     UserId : {
//         type : mongoose.Schema.Types.ObjectId,
//         required : true,
//         ref : "User",
//     },
//     Exam : {
//         type : mongoose.Schema.Types.ObjectId,
//         required : true,
//         ref : "Exam",
//     },

//     Admin : {
//         type : mongoose.Schema.Types.ObjectId,
//         required : true,
//         ref : "Admin",
//     },

//     Answers : [
//         {
//             QuestionId : {type : mongoose.Schema.Types.ObjectId},
//             Submit : { type: String, required: true }
//         }
//     ],

   
// },{timestamps : true})

// export default mongoose.model("SubmitExam" , SubmitExamSchema)


import mongoose from "mongoose";

const SubmitExamSchema = new mongoose.Schema(
  {
    UserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    Exam: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Exam",
    },

    Admin: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Admin",
    },

    Answers: [
      {
        QuestionId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true, // ✅ FIX 1
        },

        Submit: {
          type: String,
          default: "", // ✅ FIX 2 (TEXT allowed empty)
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("SubmitExam", SubmitExamSchema);
