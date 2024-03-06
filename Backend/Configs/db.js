// const mogoose=require("mongoose");
const mongoose=require('mongoose');
const database=async()=>{
    await mongoose.connect("mongodb+srv://jeel:narola@cluster0.dgwjmgh.mongodb.net/nail?retryWrites=true&w=majority&appName=Cluster0");
    console.log("Database Connect...");
}
module.exports=database

// const database=async()=>{
//     await mongoose.connect("mongodb+srv://jeel:narola@cluster0.dgwjmgh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
//     console.log("database connect");
// }
// module.exports=database