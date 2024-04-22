const multer = require("multer");
const productModel = require("../Models/Product.Schema");
const pathh=require('path')
const jwt=require("jsonwebtoken")
const Rezorpay=require("razorpay")


const now =new Date()
const year=now.getFullYear();
const month=String(now.getMonth()+1).padStart(2,'0');
const day=String(now.getDate()).padStart(2,'0')
let keyid='rzp_test_pitzHVt1lZC3UZ'

let store = multer.diskStorage({
  destination: "Images",
  filename: (req, file, cd) => {
    cd(null, file.originalname);
  },
});

const Upload = multer({
  storage: store,
}).array("img", 4);

const razorpay=new Rezorpay({
  key_id:"rzp_test_pitzHVt1lZC3UZ",
  key_secret:"19OBMV6vFMUODluhi8XPoLmv"
})

const productAdd = async (req, res) => {
 let {title,price,desc,service,stock,category}=req.body;
 console.log(category);
  let images = [];
  let path=pathh.dirname(__dirname)
  for (let i = 0; i < req.files.length; i++) {
    images.push({ images: req.files[i].originalname});
  }

  let data = await productModel.create({ images: images ,title,price,desc,service,stock,category});
  res.json({msg:"yes"});
};

const AllProduct=async(req,res)=>{
  let data=await productModel.find()
  let {token}=req.body
  res.send(data)
}



const singlePage=async(req,res)=>{
  let {id}=req.params
  let data=await productModel.findById(id)
  res.json(data)
}


const review =async(req,res)=>{
  let {rating,reviewTitle,reviewDes,userName,UserID,id}=req.body
  let data=await productModel.findById(id)
  data.rating.push({value:rating,reviewTitle:reviewTitle,reviewDes:reviewDes,userName:userName,UserID:UserID,createbydate:`${day}/${month}/${year}`})
  data.save()
}

const pay=(req,res)=>{
  let option={
    amount:req.body.amount*100,
  }
  razorpay.orders.create(option,(err,order)=>{
    if(err){
      res.send(err)
    }else{
      let data={
        success:true,
        msg:"order create",
        order_id:order.id,
        key_id:keyid,
        name:"jeel",
        amount:option.amount
      }
      res.json(data)
    }
  })
}




module.exports = { productAdd, Upload ,AllProduct,singlePage,review,pay};
