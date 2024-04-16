const multer = require("multer");
const pathh=require('path');
const servicesModel = require("../Models/Services.schema");
const service = require("../Routers/service.router");

let store = multer.diskStorage({
  destination: "Service-Images",
  filename: (req, file, cd) => {
    cd(null, file.originalname);
  },
});

const ServiceUpload = multer({
  storage: store,
}).single('Image')

const Allservic=async(req,res)=>{
    let data=await servicesModel.find()
    res.send(data)
}

const Service=async(req,res)=>{
    let {title,desc}=req.body
    // console.log(req.file);
    // console.log("file",req.file);
    let path=pathh.dirname(__dirname) +req.file.path
    console.log(title);

    let data=await servicesModel.create({Image:path,title,desc})
    // console.log(data);
res.send({msg:"create...!"})
}
 
module.exports={Service,ServiceUpload,Allservic}