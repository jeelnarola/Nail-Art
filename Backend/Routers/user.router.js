const {Router}=require('express')

    // Controller In Sub-Componet Improt 
const { signup, Login, SignupCheak, LoginCheck, EmailVerify, OTPverify } = require('../Controllers/user.controller')
const { productAdd, Upload } = require('../Controllers/Product.controller')

const router=Router()

// Signup Email Enter Check Email API
router.get("/SignupCheak",SignupCheak)

// Signup Form All Data Post API 
router.post("/signup",signup)

// Login Email Enter Check Email API
router.get("/login",Login)

// Login Form All Data Post API 
router.post("/Logincheak",LoginCheck)

// Email Enter A Verify And OTP Send API
router.post("/emailverify",EmailVerify)

// OTP Enter A Verify API
router.post("/OTPverify",OTPverify)

router.post("/productAdd",Upload,productAdd)

// router Exprots For Use A index.js
module.exports=router