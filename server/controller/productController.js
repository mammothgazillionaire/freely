const Product = require('../model/product');


exports.createProduct = (req,res) => {
  console.log(req.body);
  const product = {
    name: req.body.name,
    category: req.body.category,
    brand: req.body.brand,
    description: {
      color: req.body.color,
      size: req.body.size,
      life: req.body.life || 0
    },
    image: req.body.image || ""
  }
  Product.create(product,(err,data) => {
    if(err) throw err;

  })
}