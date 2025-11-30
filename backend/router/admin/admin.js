import { CreateAdmin, LoginAdmin, LogoutAdmin } from "../../controller/admin/login.js";
import { CreateExam, DeleteExam, GetAllExams, GetExamById, GetSubmitedExam, GetUser, UpdateExam, GetAllAdmin, GetDashboardStats } from "../../controller/admin/exam.js";
import AdminAuth from "../../middleware/adminauth.js"
import { mongoSanitizeMiddleware } from "../../middleware/datasinitizedauth.js";
import express from "express";
const router = express.Router();

router.post("/create-admin", CreateAdmin)
router.post("/login-admin", LoginAdmin)
router.post("/logout-admin", AdminAuth, LogoutAdmin)

router.post("/create-exam", AdminAuth, mongoSanitizeMiddleware, CreateExam)
router.post("/delete-exam", AdminAuth, mongoSanitizeMiddleware, DeleteExam)
router.put("/update-exam", AdminAuth, mongoSanitizeMiddleware, UpdateExam)

router.get("/getall-exams/:AdminId", AdminAuth, mongoSanitizeMiddleware, GetAllExams)
router.get("/get-exam/:ExamId", AdminAuth, mongoSanitizeMiddleware, GetExamById)
router.get("/get-submited-exam/:ExamId", AdminAuth, mongoSanitizeMiddleware, GetSubmitedExam)
router.get("/get-students", AdminAuth, mongoSanitizeMiddleware, GetUser)
router.get("/get-all-admins", AdminAuth, mongoSanitizeMiddleware, GetAllAdmin)
router.get("/dashboard-stats/:AdminId", AdminAuth, mongoSanitizeMiddleware, GetDashboardStats)

export default router;