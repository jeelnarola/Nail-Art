const UserSingup = require("../Models/Signup.Schema");
const bcrypt=require("bcrypt")
const otpgenretor=require("otp-generator")
const nodemailer=require("nodemailer")
require("dotenv").config()
let otp;

    // OTP Genret

otp=otpgenretor.generate(6,{
    specialChars:false,
    lowerCaseAlphabets:false,
    upperCaseAlphabets:false,
})

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
            res.send("User Alrdy Extis...")
        }else{
            bcrypt.hash(password,5,async(err,hash)=>{
                if(err){
                    console.log(err);
                }
                else{
                    let obj={username,email,password:hash}
                    let data=await UserSingup.create(obj)
                    res.json({data})
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
        res.send({data:data})
       }else{
        res.send({msg:"user Not"})
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
                res.json({data})
            }else{
            res.send({msg:"User Not"})
        }
    } catch (error) {
        console.log(error);
    }
}

// Login Email Enter Extis With Password Check Use For Bcrypt

const LoginCheck=async(req,res)=>{
    let {email,password}=req.body
    let data=await UserSingup.findOne({email:email})
    
    if(data){
        bcrypt.compare(password,data.password,(err,done)=>{
            if(err)
            {
                console.log(err);
            }
            if(done){
                res.send({data:data})

            }else{
                res.send("worng password !")
            }
        })
    }
}


    // EmaliVerify Pop Open And Enter Email Our Check Email Extis And Send OTP Email

const EmailVerify=async(req,res)=>{
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
        res.json(data)
    }
    else{
        res.json({msg:"Not Match Email..."})
    }
}

    // User Email OTP Send To OTP box Open To Enter OTP And Check OTP

const OTPverify=async(req,res)=>{
    let Verif=req.body.data
    
    let myotp=''
    
    for(let i=0;i<Verif.length;i++){
        myotp+=Verif[i]
    }

    if(otp==myotp){
        res.json({msg:"Otp Verify !"})
    }
    else{
        res.json({msg:"Otp Not Verify !"})
    }

}

const FrogetPassword=async(req,res)=>{
    let {id}=req.params
    let {password}=req.body

    if(id){
        bcrypt.hash(password,5,async(err,hash)=>{
            if(err){   
                console.log(err)
            }else{
                let obj={password:hash}
                let data=await UserSingup.findByIdAndUpdate(id,obj)
                res.json("done")
            }
        })

    }
    // bcrypt.hash(password,5,async(err,hash)=>{
    //     if(err){
    //         console.log(err);
    //     }
    //     else{
    //         let obj={username,email,password:hash}
    //         let data=await UserSingup.create(obj)
    //         res.json({data})
    //     }
    // })
}

    // All Controller Expots Use For Router Componet

module.exports={signup,Login,SignupCheak,LoginCheck,EmailVerify,OTPverify,FrogetPassword}