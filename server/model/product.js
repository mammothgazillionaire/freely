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
  description : {
    life: {
      type: String
    },
    color:{
      type: String,
      required: true
    },
    size:{
      type: String,
      required: true
    }
  },
  image: {
    type: String
  },
  owner: {
    type: schema.Types.ObjectId,
    ref: 'User'
  }
});

const product = mongoose.model('Product', productSchema);

module.exports = product;