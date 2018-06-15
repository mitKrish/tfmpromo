var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
  total_products: { type: String, required: true, max: 100 },
  category: { type: String, required: true, max: 100 },
  segment: { type: String, required: true, max: 100 },
  brand: { type: String, required: true, max: 100 },
  sub_brand: { type: String, required: true, max: 100 },
  device_type: { type: String, required: true, max: 100 }
});

module.exports = mongoose.model('Product', ProductSchema);
