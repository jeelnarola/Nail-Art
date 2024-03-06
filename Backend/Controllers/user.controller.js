const UserSingup = require("../Models/Signup.Schema");

const signup=async(req,res)=>{

    try {

        let {email}=req.body;
        let data=await UserSingup.findOne({email:email})
        if(data){
            res.send("user")
        }else{
            let data=await UserSingup.create(req.body)
            res.send(data)
        }
        
    } catch (error) {
        console.log(error);
    }

}

const Login=async(req,res)=>{
    try {
        let {email}=req.body
        let data=await UserSingup.findOne({email:email})

        if(data){
            res.send("signup!")
        }else{
            res.send("User not")
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports={signup,Login}