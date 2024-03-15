const UserSingup = require("../Models/Signup.Schema");
const bcrypt=require("bcrypt")


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
                    res.send("Signup...")
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

const Login=async(req,res)=>{
    try {
        let {email,passwor}=req.query
        let data=await UserSingup.findOne({email:email})
    
            if(data){
                res.send(data)
            }else{
            res.send({msg:"User Not"})
        }
    } catch (error) {
        console.log(error);
    }
}

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


const EmailVerify=(req,res)=>{
    let {email}=req.body

    // otp send   
    console.log(email);
}

module.exports={signup,Login,SignupCheak,LoginCheck,EmailVerify}