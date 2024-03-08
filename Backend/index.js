const express = require("express");
const cors=require("cors")
const database = require("./Configs/db");
const router = require("./Routers/user.router");
require('dotenv').config()

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(router)
app.listen(process.env.port, () => {
  console.log(`Server Start ${process.env.port}`);
  database();
});
