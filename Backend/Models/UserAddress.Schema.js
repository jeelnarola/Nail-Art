const mongoose=require('mongoose')

const adress=new mongoose.Schema({
    UserId:{type:mongoose.Schema.Types.ObjectId, ref:"user"},
    Email:String,
    phone:String,
    first:String,
    last:String,
    address:String,
    city:String,
    Zipcode:Number,
    state:String,
    country:String
})

const addressmodel=mongoose.model("address",adress)

module.exports=addressmodel