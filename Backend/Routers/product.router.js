const {Router}=require("express")
const {productAdd,Allproduct, AllProduct, singlePage, review, pay} = require("../Controllers/Product.controller")
const productModel = require("../Models/Product.Schema")

const product=Router()

product.get("/AllProduct",AllProduct)
product.post("/productAdd",productAdd)
product.post("/Review",review)


product.get("/singlePage/:id",singlePage);
product.post("/pay",pay)


module.exports=product