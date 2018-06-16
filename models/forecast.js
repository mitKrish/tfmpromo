var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var forecastSchema = new Schema({
  planning_account: { type: String, required: true, max: 50 },
  jan: { type: String, required: true, max: 50 },
  feb: { type: String, required: true, max: 50 },
  mar: { type: String, required: true, max: 50 },
  apr: { type: String, required: true, max: 50 },
  may: { type: String, required: true, max: 50 },
  jun: { type: String, required: true, max: 50 },
  jul: { type: String, required: true, max: 50 },
  aug: { type: String, required: true, max: 50 },
  sep: { type: String, required: true, max: 50 },
  oct: { type: String, required: true, max: 50 },
  nov: { type: String, required: true, max: 50 },
  dec: { type: String, required: true, max: 50 }
});

module.exports = mongoose.model('Forecast', forecastSchema);
