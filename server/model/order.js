const mongoose = require('mongoose');
const schema = mongoose.Schema;

const orderSchema = new schema({
  ownerId:{
    type: String
  },
  buyerId:{
    type: String
  },
  isBuying: false
});


const Order = mongoose.model('Order', orderSchema);

module.exports = Order;