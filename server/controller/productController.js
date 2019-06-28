const Product = require('../model/product');
// const User = require('../model/user');

exports.createProduct = (req,res) => {
  const {name , category, brand, life , color , size} = req.body;
  // console.log(req.user);
  const product = {
    name: name,
    category: category,
    brand: brand,
    description: {
      color: color,
      size: size,
      life: life || 0
    },
    image: req.body.image || "",
    owner: req.user.id 
  }
  // console.log(product, 'checking product');
  if(!name || !category || !brand || !life || !color || !size){
    res.json({message : "no filed should be empty"});
  }
  Product.create(product,(err,data) => {
    if(err) throw err;
    console.log(data,err,"25")
      Product.findById(data._id)
      .populate('owner')
      .exec((err,product) => {
        if(err) throw err;
        console.log(product);
        return res.json(product);
      })
  })
}


exports.allProducts = (req,res) => {
    Product.find({},(err,products) => {
      if(err) return res.json({message : "no products"});
      res.json(products);
    })
}