const mongoose=require("mongoose")

const product=new mongoose.Schema({
    images:[],
    title:String,
    price:Number,
    desc:String,
    service:String,
    stock:Number,
    category:String,
    rating:[{UserID:String, userName:String,value:Number,reviewTitle:String,reviewDes:String,createbydate:String}],
    comment:{userId:String,ProductId:String,views:Number}
})

const productModel=mongoose.model("product",product)

module.exports=productModel