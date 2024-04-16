const express = require("express");
const database = require("./Configs/db");
const router = require("./Routers/user.router");
const cors=require("cors")
const cookie=require("cookie-parser");
const product = require("./Routers/product.router");
const service = require("./Routers/service.router");
const cart = require("./Routers/cart.router");
require('dotenv').config()

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use("/Images",express.static(__dirname+"/Images"))
app.get("/images/:name",(req,res)=>{

  let {name}=req.params

  res.sendFile(__dirname+`/Images/${name}`)
})
app.use(cookie())
app.use(cors())
app.use(router)
app.use(product)
app.use(service)
app.use(cart)
const path=()=>{
  return __dirname;
}
module.exports=path
app.listen(process.env.PORT, () => {
  console.log(`Server Start ${process.env.PORT}`);
  database();
});
