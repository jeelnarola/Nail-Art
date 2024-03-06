const mongoose=require("mongoose");

const UserSchema=new mongoose.Schema({
    username:String,
    email:String,
    password:String,
    mobile_no:Number,
})

const UserSingup=mongoose.model("user",UserSchema)

module.exports=UserSingup