// import mongoose from "mongoose"

// const ExamSchema = new mongoose.Schema({

//     ExamName: {
//         type: String,
//         require: true
//     },

//     ExamCode: {
//         type: String,
//         require: true,
//         index: true
//     },

//     Class: {
//         type: String,
//     },

//     Admin: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Admin",
//         required: true,
//     },

//     MarkPerQuestion : {
//         type : Number,
//         required : true
//     },
    
//     Questions: [
//         {
//             Name: { type: String, required: true },
//             Options:[],
//             Answer: { type: String, require: true }
//         }
//     ],

//     Duration: {
//         type: Number
//     },

//     Participants : {
//         type : Number,
//         default : 0
//     }
// }, { timestamps: true })


// export default mongoose.model("Exam", ExamSchema)


import mongoose from "mongoose";

const ExamSchema = new mongoose.Schema(
  {
    ExamName: {
      type: String,
      required: true,
    },

    ExamCode: {
      type: String,
      required: true,
      index: true,
    },

    Class: {
      type: String,
    },

    Admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },

    MarkPerQuestion: {
      type: Number,
      required: true,
    },

    Questions: [
      {
        QuestionType: {
          type: String,
          enum: ["MCQ", "TEXT"],
          required: true,
        },

        Name: {
          type: String,
          required: true,
        },

        Options: {
          type: [String],
          default: [],
        },

        Answer: {
          type: String,
        },
      },
    ],

    Duration: {
      type: Number,
    },

    Participants: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Exam", ExamSchema);