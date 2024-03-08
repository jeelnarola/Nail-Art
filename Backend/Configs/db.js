// const mogoose=require("mongoose");
const mongoose=require('mongoose');
require('dotenv').config()
const database=async()=>{
    await mongoose.connect(process.env.DatabaseLink);
    console.log("Database Connect...");
}
module.exports=database
