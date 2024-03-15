const {Router}=require('express')
const { signup, Login, SignupCheak, LoginCheck, EmailVerify } = require('../Controllers/user.controller')

const router=Router()

router.post("/signup",signup)
router.get("/login",Login)
router.get("/SignupCheak",SignupCheak)
router.post("/Logincheak",LoginCheck)

router.post("/emailverify",EmailVerify)

module.exports=router