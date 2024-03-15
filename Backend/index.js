const express = require("express");
const database = require("./Configs/db");
const router = require("./Routers/user.router");
const cors=require("cors")
require('dotenv').config()

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(router)
app.listen(process.env.PORT, () => {
  console.log(`Server Start ${process.env.PORT}`);
  database();
});
