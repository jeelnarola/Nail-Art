const mongoose=require("mongoose")

const product=new mongoose.Schema({
    images:[],
    title:String,
    price:Number,
    desc:String,
    service:String,
    stock:Number,
    rating:[{userid:String, value:Number}],
    view:[{userId:String,ProductId:String,views:Number}]
})

const productModel=mongoose.model("product",product)

module.exports=productModel