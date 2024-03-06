const {Router}=require('express')
const { signup, Login } = require('../Controllers/user.controller')

const router=Router()

router.post("/signup",signup)
router.post("/login",Login)

module.exports=router