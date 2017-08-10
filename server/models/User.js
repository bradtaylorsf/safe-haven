const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
  email: String,
  password: String,
  age: Number,
  gender: String,
  income: String,
  marital: String,
  education: String,
  employment: String,
  ethnicity: String,
  children: Number,
  governmentBenifits: String,
  location: String,
  services: Array,
  livingStatus: String,
  address: String,
  shelter: String,
  disabilities: String,
  doYouFeelSafe: Boolean,
  abuseLast30days: String,
  medical: String,
  numPeopleRequireShelter: Number,
  preferences: {
    womanOnly: Boolean,
    immigration: Boolean,
    legalAid: Boolean,
    pets: Boolean,
    locationDistance: String,
  },
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
