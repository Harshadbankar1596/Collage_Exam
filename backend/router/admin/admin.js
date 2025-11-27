import { CreateAdmin, LoginAdmin, LogoutAdmin } from "../../controller/admin/login.js";
import { CreateExam, DeleteExam, GetAllExams, GetExamById, GetSubmitedExam, GetUser, UpdateExam, GetAllAdmin, GetDashboardStats } from "../../controller/admin/exam.js";
import AdminAuth from "../../middleware/adminauth.js"
import express from "express";
const router = express.Router();

router.post("/create-admin", CreateAdmin)
router.post("/login-admin", LoginAdmin)
router.post("/logout-admin", AdminAuth, LogoutAdmin)

router.post("/create-exam", AdminAuth, CreateExam)
router.post("/delete-exam", AdminAuth, DeleteExam)
router.put("/update-exam", AdminAuth, UpdateExam)

router.get("/getall-exams/:AdminId", AdminAuth, GetAllExams)
router.get("/get-exam/:ExamId", AdminAuth, GetExamById)
router.get("/get-submited-exam/:ExamId", AdminAuth, GetSubmitedExam)
router.get("/get-students", AdminAuth, GetUser)
router.get("/get-all-admins", AdminAuth, GetAllAdmin)
router.get("/dashboard-stats/:AdminId", AdminAuth, GetDashboardStats)

export default router;