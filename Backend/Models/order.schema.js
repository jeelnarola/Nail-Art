const mongoose=require('mongoose')

const orderschema=new mongoose.Schema({
    ProductID:{type:mongoose.Schema.Types.ObjectId,ref:"product"},
    UserID:{type:mongoose.Schema.Types.ObjectId,ref:"user"},
    AddressID:{type:mongoose.Schema.Types.ObjectId,ref:"address"},
    orderStatus:{
        type:String,
        enum:["accept","reject","pending"],
        default:"pending"
    },
    payment:Boolean,
    Token:String,
    qyt:{type:Number,default:1}
})

const Ordermodel=mongoose.model("order",orderschema)
module.exports=Ordermodel