const mongoose=require('mongoose')

const cart=new mongoose.Schema({
    productId:{type:mongoose.Schema.Types.ObjectId, ref:"product"},
    userId:{type:mongoose.Schema.Types.ObjectId, ref:"user"},
    qyt:{type:Number,default:1}
})

const CartModel=mongoose.model('cart',cart)

module.exports=CartModel