import express from "express"
import { mongoSanitizeMiddleware } from "../../middleware/datasinitizedauth.js"
import { RegisterUser, UserLogin } from "../../controller/user/login.js"
import { GetAllExam, GetExam, SubmitExams } from "../../controller/user/user.js"
import UserAuth from "../../middleware/userauth.js"
const router = express.Router()


router.post("/register-user", RegisterUser)

router.post("/login-user", UserLogin)

router.post("/submit-exam" , UserAuth , mongoSanitizeMiddleware , SubmitExams)



router.get("/get-exam/:examId"  ,UserAuth , mongoSanitizeMiddleware ,  GetExam)
router.get("/get-all-exams" , UserAuth , GetAllExam)

// router.get("/get-exam/:examId" , UserAuth , GetExam)

export default router