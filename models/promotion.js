var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PromotionSchema = new Schema({
  promo_id: { type: String, required: true, max: 100 },
  planning_account: { type: String, required: true, max: 50 },
  funding_account: { type: String, required: true, max: 50 },
  brand: { type: String, required: true, max: 25 },
  sub_brand: { type: String, required: true, max: 25 },
  discount: { type: String, required: true, max: 10 },
  acc_mgr_status: {
    type: String,
    required: true,
    enum: ['Planned', 'Accepted', 'Rejected'],
    default: 'Planned'
  },
  mo_status: {
    type: String,
    required: true,
    enum: ['Planned', 'Accepted', 'Rejected'],
    default: 'Planned'
  }
});

PromotionSchema.virtual('url').get(function() {
  return '/tfm/promo/' + this._id;
});

module.exports = mongoose.model('Promotion', PromotionSchema);

//db.Promotion.insertMany([
//  { promo_id: 'TFM001', planning_account: 'TELION AG', funding_account: 'SWISS B2B', brand:'duracell', sub_brand:'AA Battery', discount:'10%', acc_mgr_status:'Planned', mo_status:'Planned' },
//{ promo_id: 'TFM002', planning_account: 'TELION RE', funding_account: 'TELION RA', brand:'duracell', sub_brand:'AA Battery', discount:'20%', acc_mgr_status:'Planned', mo_status:'Planned' },
//{ promo_id: 'TFM003', planning_account: 'TELION AG', funding_account: 'SWISS B2B', brand:'duracell', sub_brand:'AA Battery', discount:'15%', acc_mgr_status:'Planned', mo_status:'Planned' },
//{ promo_id: 'TFM004', planning_account: 'TELION RE', funding_account: 'TELION RA', brand:'duracell', sub_brand:'AA Battery', discount:'12%', acc_mgr_status:'Planned', mo_status:'Planned' },
//{ promo_id: 'TFM005', planning_account: 'TELION AG', funding_account: 'SWISS B2B', brand:'duracell', sub_brand:'AA Battery', discount:'7%', acc_mgr_status:'Planned', mo_status:'Planned' },
//])
