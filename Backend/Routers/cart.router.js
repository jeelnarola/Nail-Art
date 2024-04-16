const {Router}=require('express')
const {cartAdd, cartData} = require('../Controllers/cart.controller')

const cart=Router()

cart.post("/cart",cartAdd)
cart.post("/allCart",cartData)

module.exports=cart