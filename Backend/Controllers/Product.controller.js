const multer=require("multer")

let store=multer.diskStorage({
    destination:"Images",
    filename:(req,file,cd)=>{
        cd(null,file.originalname);
    }
})

const mainImg=multer({
    storage:store,
})

const productAdd=async(req,res)=>{
    console.log(req.body);
}

module.exports=productAdd