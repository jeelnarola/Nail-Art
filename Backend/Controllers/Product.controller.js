const multer = require("multer");
const productModel = require("../Models/Product.Schema");
const pathh=require('path')

let store = multer.diskStorage({
  destination: "Images",
  filename: (req, file, cd) => {
    cd(null, file.originalname);
  },
});

const Upload = multer({
  storage: store,
}).array("img", 4);

const productAdd = async (req, res) => {
 let {title,price,desc,service,stock}=req.body;
  let images = [];
  let path=pathh.dirname(__dirname)
  console.log(path);
  for (let i = 0; i < req.files.length; i++) {
    images.push({ images: path+'/Images' + '/'+ req.files[i].originalname});
  }
  console.log(images);

  let data = await productModel.create({ images: images ,title,price,desc,service,stock});
  console.log(data);
  res.json({msg:"yes"});
};

const AllProduct=async(req,res)=>{
  let data=await productModel.find()
  res.send(data)
}


module.exports = { productAdd, Upload ,AllProduct};
