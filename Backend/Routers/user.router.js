const {Router}=require('express')
const { signup, Login, SignupCheak } = require('../Controllers/user.controller')

const router=Router()

router.post("/signup",signup)
router.post("/login",Login)
router.get("/SignupCheak",SignupCheak)

module.exports=router