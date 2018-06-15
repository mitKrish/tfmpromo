var mongoose = require('mongoose');
var Schema = mongooose.Schema;

var paymentSchema = new Schema({
  invoce_id: { required: true, type: String, max: 100 },
  sap_doc_id: { required: true, type: String, max: 100 },
  customer_name: { required: true, type: String, max: 100 },
  amount_paid: { required: true, type: String, max: 100 },
  promo_id: { required: true, type: String, max: 100 },
  date: { required: true, type: Date },
  match: { type: String, enum: ['Yes', 'No'], default: 'Yes' }
});

module.exports = mongoose.Schema('Payment', paymentSchema);
