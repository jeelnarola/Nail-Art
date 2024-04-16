const mongoose=require("mongoose");

const UserSchema=new mongoose.Schema({
    username:String,
    email:String,
    password:String,
    role:{type: String,
        enum: ["user", "admin"], // Define allowed roles
        default: "user",}
})

const UserSingup=mongoose.model("user",UserSchema)

module.exports=UserSingup