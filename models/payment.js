var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var paymentSchema = new Schema({
  invoice_id: { required: true, type: String, max: 100 },
  sap_doc_id: { required: true, type: String, max: 100 },
  customer_name: { required: true, type: String, max: 100 },
  amount_paid: { required: true, type: String, max: 100 },
  promo_id: { required: true, type: String, max: 100 },
  date: { required: true, type: String, max: 100 },
  match: { type: String, enum: ['Yes', 'No'], default: 'No' }
});

module.exports = mongoose.model('Payment', paymentSchema);
