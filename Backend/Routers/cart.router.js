const {Router}=require('express')
const {cartAdd, cartData, address, allAddress} = require('../Controllers/cart.controller')
const CartModel = require('../Models/cart.schema')
const Ordermodel = require('../Models/order.schema')
const jwt=require('jsonwebtoken')

const cart=Router()
cart.get("/AllcartProduct",async(req,res)=>{
    let data=await CartModel.find()
    res.json(data)
})
cart.post("/cart",cartAdd)
cart.post("/allCart",cartData)
cart.patch("/cartQyt/:id",async(req,res)=>{
    let {id}=req.params
    let {qyt}=req.body
    let data=await CartModel.findById(id)
    data.qyt+=1
    data.save()
    res.json({msg:"Done"})
})
cart.patch("/cartQytMins/:id",async(req,res)=>{
    let {id}=req.params
    let {qyt}=req.body
    let data=await CartModel.findById(id)
    data.qyt-=1
    data.save()
    res.json({msg:"Done"})
})

cart.delete("/Qytdele/:id",async(req,res)=>{
    let {id}=req.params
    let data=await CartModel.findByIdAndDelete(id)
   res.json({msg:"Done"})
})

cart.post("/address",address)

cart.post("/order",async(req,res)=>{
    let {ProductID,UserID,AddressID,payment,qyt}=req.body
    let token=jwt.sign({ProductID:ProductID,UserID:UserID},"JWT",{
    expiresIn:'2h',
})
    let obj={
        ProductID:ProductID,
        UserID:UserID,
        AddressID:AddressID,
        payment:payment,
        Token:token,
        qyt:qyt
    }
    let createOrder=await Ordermodel.create(obj)
    res.send({msg:"Payment successfully"})
})


cart.post("/Myorder",async(req,res)=>{
   try{
    let {UserID}=req.body
    let data=await Ordermodel.find({UserID:UserID}).populate(["AddressID","ProductID"])
     
    for(let i=0;i<data.length;i++){
        let user=jwt.verify(data[i].Token,"JWT",(err,res)=>{
            if(err){
              return "reject"
            }
            if(res){
                return "pending";  
            }
        })
        if(user=="token expired"){
            let TokenUpdate=await Ordermodel.findByIdAndUpdate(data[i]._id,{orderStatus:"reject"})
            // TokenUpdate.save()
        }
    }
    res.status(200).json(data)
   }catch(err){
    console.log("err",err);
   }    
})

cart.get("/allOrder",async(req,res)=>{
    let data=await Ordermodel.find().populate(["AddressID","ProductID","UserID"])
    res.json(data)
})

cart.patch("/acceptOrder",async(req,res)=>{
    let {orderStatus,id}=req.body
    let data=await Ordermodel.findByIdAndUpdate(id,{orderStatus:"accept"})
    data.save()
    res.send(data)
})

cart.delete("/rejectOrder/:id",async(req,res)=>{
    let {id}=req.params
   
    let data=await Ordermodel.findByIdAndDelete(id)
    res.send({msg:"Reject Product..."})
})

module.exports=cart