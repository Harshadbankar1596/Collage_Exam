import asyncHandler from "express-async-handler";
import Exam from "../../model/exam/exam.js";
import Admin from "../../model/admin/admin.js";
import mongoose from "mongoose";
import SubmitExam from "../../model/exam/submitexam.js";
import User from "../../model/user/user.js";


export const CreateExam = asyncHandler(async (req, res) => {
    console.log(req.body)

    const { ExamName, ExamCode, Class, AdminId, Questions, Duration, MarkPerQuestion } = req.body;

    if (!ExamName || !ExamCode || !Class || !AdminId || !Questions || !MarkPerQuestion) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const existExam = await Exam.findOne({ExamCode : ExamCode})
    if(existExam) {
        res.status(404).json({message : "Exam Code Already Exist"})
    }

    const admin = await Admin.findById(AdminId).lean()

    if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
    }

    const exam = await Exam.create({
        ExamName,
        ExamCode,
        Class,
        Admin: AdminId,
        MarkPerQuestion,
        Questions,
        Duration
    });

    await Admin.updateOne(
        { _id: new mongoose.Types.ObjectId(AdminId) },
        { $push: { ConductedExams: exam._id } }
    );

    return res.status(201).json({
        message: "Exam created successfully",
    });

})

export const DeleteExam = asyncHandler(async (req, res) => {
    const { ExamId, AdminId } = req.body;

    if (!ExamId || !AdminId) {
        res.status(400).json({ message: "ExamId and AdminId are required" });
        return;
    }

    const exam = await Exam.findById(ExamId).lean()

    if (!exam) {
        res.status(404).json({ message: "Exam not found" });
        return;
    }

    if (exam.Admin.toString() !== AdminId) {
        res.status(403).json({ message: "You are not authorized to delete this exam" });
        return;
    }

    await Promise.all([
        Admin.updateOne(
            { _id: new mongoose.Types.ObjectId(AdminId) },
            { $pull: { ConductedExams: ExamId } }
        ),
        Exam.deleteOne({ _id: ExamId })
    ])

    res.status(200).json({ message: "Exam deleted successfully" });

})

export const GetAllExams = asyncHandler(async (req, res) => {
    const { AdminId } = req.params;
    const page = Math.max(parseInt(req.query.page) || 1);
    const limit = Math.min(parseInt(req.query.limit) || 10);
    const skip = (page - 1) * limit;

    if (!AdminId || !AdminId.trim()) {
        return res.status(400).json({
            success: false,
            message: "AdminId is required.",
        });
    }

    if (!mongoose.isValidObjectId(AdminId)) {
        return res.status(400).json({
            success: false,
            message: "Invalid AdminId format.",
        });
    }

    const [exams, total] = await Promise.all([
        Exam.find({ AdminId })
            .select("ExamName ExamCode Class Questions Duration createdAt Participants MarkPerQuestion")
            .hint({ AdminId: 1 })
            .skip(skip)
            .limit(limit)
            .lean(),
        Exam.countDocuments({ AdminId }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return res.status(200).json({
        success: true,
        total,
        page,
        totalPages,
        limit,
        count: exams.length,
        exams,
    });
})

export const GetExamById = asyncHandler(async (req , res)=>{
    const {ExamId} = req.params

    if(!ExamId){
        return res.status(404).json({message : "ExamId Not Found"})
    }

    const exam = await Exam.findById(ExamId).lean()

    if(!exam){
        return res.status(404).json({message : "Exam Not Found"})
    }

    res.status(200).json({message : "Sucsses" , Exam : exam})
})

export const UpdateExam = asyncHandler(async (req, res) => {
    const { ExamId, AdminId, updateData } = req.body;

    if (!ExamId || !AdminId || !updateData || typeof updateData !== "object") {
        return res.status(400).json({ message: "ExamId, AdminId, and updateData are required" });
    }

    const examObjectId = new mongoose.Types.ObjectId(ExamId);
    const adminObjectId = new mongoose.Types.ObjectId(AdminId);

    delete updateData._id;
    delete updateData.AdminId;
    delete updateData.ExamCode;

    const result = await Exam.updateOne(
        { _id: examObjectId, AdminId: adminObjectId },
        { $set: updateData }
    );

    if (result.matchedCount === 0) {
        return res.status(404).json({ message: "Exam not found or unauthorized" });
    }

    if (result.modifiedCount === 0) {
        return res.status(200).json({ message: "No changes detected" });
    }

    res.status(200).json({ message: "Exam updated successfully" });
})

export const GetSubmitedExam = asyncHandler(async (req, res) => {

    const { ExamId } = req.params

    if (!ExamId) return res.status(400).json({ message: "ExamId Required" });
    const exam = await Exam.findById(ExamId).lean()

    if (!exam) return res.status(404).json({ message: "Exam Not Found" });

    const SubmitedExam = await SubmitExam.find({ Exam: ExamId }).lean().populate("UserId")

    if (!SubmitedExam) return res.status(404).json({ message: "Exam Not Found" });

    res.status(200).json({ SubmitedExam: SubmitedExam , Exam : exam })

})

export const GetUser = asyncHandler(async (req , res) => {
    // const {AdminId} = req.params

    // if(!AdminId) return res.status(400).json({message : "AdminId Required"});

    const students = await User.find().lean().select("Name Email Phone RollNo PRN");

    if(!students) return res.status(404).json({message : "Students Not Found"});

    res.status(200).json({students})
})

export const GetAllAdmin = asyncHandler(async (req , res) => {
    const admins = await Admin.find().lean().select("Name Email Role CollegeName");
    if(!admins) return res.status(404).json({message : "Admins Not Found"});
    res.status(200).json({admins})
})