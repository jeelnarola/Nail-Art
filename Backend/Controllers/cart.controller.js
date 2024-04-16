const CartModel = require("../Models/cart.schema")

const cartAdd=async(req,res)=>{
    let {userId,productId}=req.body

    let cartData=await CartModel.findOne({userId:userId,productId:productId})
    if(cartData==null){
        let cartAdd=await CartModel.create({userId,productId})
        res.json({msg:"ADD"})
    }
    if((cartData!==null)){
        res.json({msg:"already add product"})
    }
}


const cartData=async(req,res)=>{
    console.log(req.cookies);
    let data=await CartModel.find({userId:req.body.userId}).populate("productId")
    console.log(data);
    res.json(data)
}


module.exports={cartAdd,cartData}