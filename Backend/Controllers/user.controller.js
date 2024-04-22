const UserSingup = require("../Models/Signup.Schema");
const bcrypt=require("bcrypt")
const otpgenretor=require("otp-generator")
const nodemailer=require("nodemailer")
const jwt=require("jsonwebtoken")
require("dotenv").config()
let otp;

    // OTP Genret

otp=otpgenretor.generate(6,{
    specialChars:false,
    lowerCaseAlphabets:false,
    upperCaseAlphabets:false,
})
// let token=jwt.sign({email:data.email},"JWT",{
//     expiresIn:10,
// })
    // Nodemail Email Auth

const transport=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.USER,
        pass:process.env.PASS
    }
})


    // Signup Data Post With Password Bcrypt Use

const signup=async(req,res)=>{

    try {
        let {username,email,password}=req.body;
        let data=await UserSingup.findOne({email:email})
        if(data){
            res.status(200).send("User Alrdy Extis...")
        }else{
            bcrypt.hash(password,5,async(err,hash)=>{
                if(err){
                    console.log(err);
                }
                else{
                    let obj={username,email,password:hash,role:"user"}
                    let data=await UserSingup.create(obj)
                    res.status(200).cookie('userId',data._id).cookie('role',data.role).json({data})
                }
            })
        }
        
    } catch (error) {
        console.log(error);
    }
}

    // Signup Email Cheak

const SignupCheak=async(req,res)=>{
    try {
        let {email}=req.query
        let data=await UserSingup.findOne({email:email})
       if(data){
        res.status(200).send({data:data})
       }else{
        res.status(404).send({msg:"user Not"})
       }
    } catch (error) {
        console.log(error);
    }
}

    // Login Email Enter Check

const Login=async(req,res)=>{
    try {
        let {email,passwor}=req.query
        let data=await UserSingup.findOne({email:email})
    
            if(data){
                
                res.status(200).json({data})

            }else{
            res.status(404).send({msg:"User Not"})
        }
    } catch (error) {
        console.log(error);
    }
}

// Login Email Enter Extis With Password Check Use For Bcrypt

const LoginCheck=async(req,res)=>{
    try{
        let {email,password}=req.body
    let data=await UserSingup.findOne({email:email})
    
    if(data){
        bcrypt.compare(password,data.password,(err,done)=>{
            if(err)
            {
                console.log(err);
            }
            if(done){
                res.status(200).send({data:data})

            }else{
                res.status(400).send("worng password !")
            }
        })
    }
    }catch(error){
        console.log("LoginCheck",error);
    }
}


    // EmaliVerify Pop Open And Enter Email Our Check Email Extis And Send OTP Email

const EmailVerify=async(req,res)=>{
    try{
        let {email}=req.body
    let data=await UserSingup.findOne({email:email})
    if(data){
        const mailoptions={
            from:process.env.user,
            to:email,
            subject:"reset password",
            html:`otp --> ${otp} link= http://127.0.0.1:5501/Frontend/Views/FrogetPassword.html`
         }
         transport.sendMail(mailoptions,(err,info)=>{
            if(err){
               console.log(err);
            }
            else{
               console.log(info);
            }
         })
        res.status(200).json(data)
    }
    else{
        res.status(400).json({msg:"Not Match Email..."})
    }
    }catch(error){
        console.log("EmailVerify",error);
    }
}

    // User Email OTP Send To OTP box Open To Enter OTP And Check OTP

const OTPverify=async(req,res)=>{
    try{
        let Verif=req.body.data
    
    let myotp=''
    
    for(let i=0;i<Verif.length;i++){
        myotp+=Verif[i]
    }

    if(otp==myotp){
        res.status(200).json({msg:"Otp Verify !"})
    }
    else{
        res.status(400).json({msg:"Otp Not Verify !"})
    }
    }catch(error){
        console.log("OTPverify",error);
    }

}

const FrogetPassword=async(req,res)=>{
   try{
    let {id}=req.params
    let {password}=req.body

    if(id){
        bcrypt.hash(password,5,async(err,hash)=>{
            if(err){   
                console.log(err)
            }else{
                let obj={password:hash}
                let data=await UserSingup.findByIdAndUpdate(id,obj)
                console.log(data);
                res.status(200).json("done")
            }
        })

    }
   }catch(error){
    console.log("Frogetpassword",error)
   }

}

    // All Controller Expots Use For Router Componet

module.exports={signup,Login,SignupCheak,LoginCheck,EmailVerify,OTPverify,FrogetPassword}