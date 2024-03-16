const {Router}=require("express")
const productAdd = require("../Controllers/Product.controller")

const product=Router()

product.post("/productAdd",productAdd)


module.exports=product