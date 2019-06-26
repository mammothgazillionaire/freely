const mongoose = require('mongoose');
const schema = mongoose.Schema;

const productSchema = new  schema({
  name: {
    type: String,
    required: true
  },
  category:{
    type: String,
    required: true
  },
  brand:{
    type: String,
    required: true
  },
  size:{
    type: String,
    required: true
  },
  color:{
    type: String,
    required: true
  },
  description : {
    life: {
      type: String
    },
    price: {
      type: Number,
      required: true
    }
  },
  image: {
    type: String
  }
});

const product = mongoose.model('Product', productSchema);

module.exports = product;