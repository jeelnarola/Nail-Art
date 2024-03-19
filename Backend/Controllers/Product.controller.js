const multer = require("multer");
const productModel = require("../Models/Product.Schema");

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
 let {title}=req.body;
  let images = [];
  for (let i = 0; i < req.files.length; i++) {
    images.push({ img: req.files[i].originalname});
  }

  let data = await productModel.create({ images: images,title });
  console.log(data);
  res.json({ msg: "Yes!" });
};

module.exports = { productAdd, Upload };
