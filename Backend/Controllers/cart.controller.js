const addressmodel = require("../Models/UserAddress.Schema")
const CartModel = require("../Models/cart.schema")

const cartAdd=async(req,res)=>{
   try{
    let {userId,productId}=req.body
    console.log(productId);
    console.log(userId);

    let cartData=await CartModel.findOne({userId:userId,productId:productId})
    console.log(cartData);
    if(cartData==null){
        let cartAdd=await CartModel.create({userId,productId})
        res.status(200).json({data:cartAdd})
    }
    if((cartData!==null)){
        res.status(200).json({msg:"already add product"})
    }
   }catch(error){
    console.log("cartAdd",error)
   }
}


const cartData=async(req,res)=>{
    try{
    let {userId}=req.body
    let data=await CartModel.find({userId:userId}).populate("productId")
    res.status(200).json(data)
    }catch(error){
        console.log("CartData",error)
    }
}

const address=async(req,res)=>{
    console.log(req.body.UserId);
    let {UserId,phone}=req.body
    let id;
    let data;
    if(UserId){
        data=await addressmodel.findOne({UserId:UserId})
    }
    if(data==null){
        let creat=await addressmodel.create(req.body)
        res.json({msg:"Done",data:creat}) 
    }
    else{
        data=await addressmodel.findOne({UserId:UserId})
        id=data._id
        let dataUpdate=await addressmodel.findByIdAndUpdate(id,req.body)
        dataUpdate.save()
        res.json({msg:"Done",data:dataUpdate})
    }
}



module.exports={cartAdd,cartData,address}