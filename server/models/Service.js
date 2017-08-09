const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ServiceSchema = new Schema({
  name: String,
  tag: String,
});


module.exports = mongoose.model('Service', ServiceSchema);
