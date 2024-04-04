const {Router}=require("express")
const {productAdd,Allproduct, AllProduct} = require("../Controllers/Product.controller")

const product=Router()

product.get("/AllProduct",AllProduct)
product.post("/productAdd",productAdd)


module.exports=product