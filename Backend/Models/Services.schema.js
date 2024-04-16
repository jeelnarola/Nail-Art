const mongoose=require('mongoose')

const ServiceSchema=new mongoose.Schema({
    Image:String,
    title:String,
    desc:String
})

const servicesModel=mongoose.model("Services",ServiceSchema)
module.exports=servicesModel