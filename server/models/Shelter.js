const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ShelterSchema = new Schema({
  name: String,
  mission: String,
  totalSpaces: Number,
  availableSpaces: Number,
  ein: String,
  howUpdateAvailability: String,
  maxStayDays: Number,
  services: {
    emergency: Array,
    legalFinancial: Array,
    counseling: Array,
    housing: Array,
    support: Array,
    children: Array,
    education: Array,
  }
});


module.exports = mongoose.model('Shelter', ShelterSchema);
