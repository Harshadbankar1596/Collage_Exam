import asyncHandler from "express-async-handler";
import Exam from "../../model/exam/exam.js";
import Admin from "../../model/admin/admin.js";
import mongoose from "mongoose";

export const CreateExam = asyncHandler(async (req, res) => {

    const { ExamName, ExamCode, Class, AdminId, Questions, Duration } = req.body;

    if (!ExamName || !ExamCode || !Class || !AdminId || !Questions) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const admin = await Admin.findById(AdminId).lean()

    if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
    }

    const exam = await Exam.create({
        ExamName,
        ExamCode,
        Class,
        AdminId,
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

});

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

    if (exam.AdminId.toString() !== AdminId) {
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
            .select("ExamName ExamCode Class Questions Duration")
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
});

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
});