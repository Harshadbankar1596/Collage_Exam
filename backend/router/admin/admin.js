import { CreateAdmin , LoginAdmin, LogoutAdmin } from "../../controller/admin/login.js";
import { CreateExam , DeleteExam , GetAllExams , GetExamById, GetSubmitedExam, GetUser, UpdateExam} from "../../controller/admin/exam.js";
import AdminAuth from "../../middleware/adminauth.js"
import express from "express";
const router = express.Router();

router.post("/create-admin" , CreateAdmin)
router.post("/login-admin" , LoginAdmin)
router.post("/logout-admin" , AdminAuth , LogoutAdmin)

router.post("/create-exam" , CreateExam)
router.post("/delete-exam" , DeleteExam)
router.put("/update-exam" , UpdateExam)

router.get("/getall-exams/:AdminId"  , AdminAuth ,  GetAllExams)
router.get("/get-exam/:ExamId" , AdminAuth , GetExamById)
router.get("/get-submited-exam/:ExamId" , GetSubmitedExam)
router.get("/get-students" , GetUser)

export default router;