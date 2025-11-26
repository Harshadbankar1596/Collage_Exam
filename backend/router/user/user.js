import express from "express"

import { RegisterUser, UserLogin } from "../../controller/user/login.js"
import { GetExam, SubmitExams } from "../../controller/user/user.js"
import UserAuth from "../../middleware/userauth.js"
const router = express.Router()


router.post("/register-user", RegisterUser)

router.post("/login-user", UserLogin)

router.post("/submit-exam" , UserAuth , SubmitExams)

router.get("/get-exam/:examId"  , GetExam)
// router.get("/get-exam/:examId" , UserAuth , GetExam)

export default router