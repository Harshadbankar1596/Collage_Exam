import Admin from "../../model/admin/admin.js";
import Exam from "../../model/exam/exam.js";
import asyncHandler from "express-async-handler";
import User from "../../model/user/user.js";
import SubmitExam from "../../model/exam/submitexam.js";

export const GetExam = asyncHandler(async (req, res) => {
  const { examId } = req.params;

  if (!examId) return res.status(400).json({ message: "examId is required" });

  const exam = await Exam.findOne({ ExamCode: examId }).populate(
    "Admin",
    "Name Email Role CollegeName"
  );

  if (!exam) {
    return res.status(404).json({ message: "Exam not found" });
  }

  const Questions = exam.Questions.map((q) => {
    return { Name: q.Name, Options: q.Options, _id: q._id };
  });

  res.json({
    ExamName: exam.ExamName,
    ExamCode: exam.ExamCode,
    Class: exam.Class,
    Duration: exam.Duration,
    Admin: exam.Admin,
    Questions: Questions,
  });
});

// export const SubmitExams = asyncHandler(async (req, res) => {
//     const { ExamId, UserId, Answers } = req.body

//     if (!ExamId || !UserId || !Answers) {
//         return res.status(400).json({ message: "All Fealds Are Required" })
//     }

//     const existexam = await Exam.findById(ExamId)

//     if (!existexam) return res.status(404).json({ message: "Exam Not Found" });

//     const existuser = await User.findById(UserId).lean()

//     if (!existuser) return res.status(404).json({ message: "User Not Found" });

//     const submiteduser = await SubmitExam.findOne({ UserId: UserId })

//     existexam.Participants += 1

//     if(submiteduser) return res.status(404).json({message : "User Already Submitted Exam"})

//     const newexam = await SubmitExam.create({
//         UserId,
//         Exam : ExamId,
//         Answers,
//         Admin : existexam.Admin
//     })

//     await existexam.save()

//     res.status(201).json({ message: "Exam Submmited Succsess Full" })

// })

// export const SubmitExams = asyncHandler(async (req, res) => {
//   const { ExamId, UserId, Answers } = req.body;

//   if (!ExamId || !UserId || !Answers) {
//     return res.status(400).json({ message: "All Fields Are Required" });
//   }

//   const existexam = await Exam.findById(ExamId);
//   if (!existexam) return res.status(404).json({ message: "Exam Not Found" });

//   const existuser = await User.findById(UserId).lean();
//   if (!existuser) return res.status(404).json({ message: "User Not Found" });

//   const submiteduser = await SubmitExam.findOne({
//     UserId,
//     Exam: ExamId,
//   });

//   if (submiteduser)
//     return res
//       .status(400)
//       .json({ message: "User Already Submitted This Exam" });

//   existexam.Participants += 1;

//   await SubmitExam.create({
//     UserId,
//     Exam: ExamId,
//     Answers,
//     Admin: existexam.Admin,
//   });

//   await existexam.save();

//   res.status(201).json({ message: "Exam Submitted Successfully" });
// });

export const SubmitExams = asyncHandler(async (req, res) => {
  const { ExamId, UserId, Answers } = req.body;
  // console.log("req.body : " ,req.body);

  if (!ExamId || !UserId || !Array.isArray(Answers)) {
    return res.status(400).json({ message: "Invalid submission data" });
  }

  const existexam = await Exam.findById(ExamId);
  if (!existexam) return res.status(404).json({ message: "Exam Not Found" });

  const existuser = await User.findById(UserId);
  if (!existuser) return res.status(404).json({ message: "User Not Found" });

  const alreadySubmitted = await SubmitExam.findOne({
    UserId,
    Exam: ExamId,
  });

  if (alreadySubmitted)
    return res
      .status(400)
      .json({ message: "User Already Submitted This Exam" });

  // ✅ Save submission
  await SubmitExam.create({
    UserId,
    Exam: ExamId,
    Admin: existexam.Admin,
    Answers: Answers.map((a) => ({
      QuestionId: a.QuestionId,
      Submit: a.Submit || "",
    })),
  });

  // ✅ SAFE increment (NO validation of Questions)
  await Exam.updateOne({ _id: ExamId }, { $inc: { Participants: 1 } });

  res.status(201).json({ message: "Exam Submitted Successfully" });
});

export const GetAllExam = asyncHandler(async (req, res) => {
  const Exams = await Exam.find().lean();

  if (!Exam || Exam.length === 0) {
    return res.status(400).json({ error: "Exam Not ound" });
  }

  res.status(200).json({ message: "Sucsess", Exams: Exams });
});
