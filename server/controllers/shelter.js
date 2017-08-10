const Shelter = require('../models/Shelter');

const list = (req, res, next) => {
  // TODO: Define kind of filter
  // TODO: Read filter from req body
  console.log('data of list');
  Shelter.find({}, function(err, shelters) {
    if (err) {
      next(err);
    } else {
      res.locals.data = {
        shelters: shelters
      };
      console.log(shelters);
      next();
    }
  });
};

/**
 * Returns the one shelter that matches the selected shelter

 * @param {Function} req
 * @param {Function} res
 * @param {Function} next
 */
const one = (req, res, next) => {
  Shelter.findOne({name: req.body.name}, function(err, shelter) {
    if (err) {
      next(err);
    } else {
      if(!shelter) {
        console.log('No Shelter found');
        //TODO: Update appropriately to list of shelters
        next();
      } else{
        console.log('Found:', shelter);
        res.locals.data = {
          shelter: shelter
        };
        next();
      }
    }
  });
};

const submit = (req, res, next) => {
  // TODO: submit from req post data
  // TODO: Validate Post data
  var data = {
    name: 'shelter2',
    mission: 'mission2',
    totalSpaces: 3,
    availableSpaces: 4,
    ein: 'dlfj',
    maxStayDays: 3,
    services: {
      emergency: [
        'call'
      ]
    }
  }
  Shelter.findOneAndUpdate({name: data.name}, data, function(err, shelter) {
    console.log(shelter);
    if (err) {
      next(err);
    } else {
      if (!shelter) {
        new Shelter(data).save(function(err) {
          console.log('creating a new shelter');
          if (err) {
            console.log(err);
            next(err);
          }
        });
      }
      next();
    }
  });
};

module.exports = {
  list,
  one,
  submit,
};
