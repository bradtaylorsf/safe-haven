
const list = (req, res, next) => {
  // TODO: Get shelters from dB
  res.locals.data = {
    shelters: [
      {
        name: 'shelter 1',
      },
      {
        name: 'shelter 2',
      },
      {
        name: 'shelter 3',
      },
      {
        name: 'shelter 4',
      },
    ],
  };
  next();
};

const one = (req, res, next) => {
  // TODO: get one from DB
  res.locals.data = {
    name: 'Shelter 1',
  };
  next();
};

const submit = (req, res, next) => {
  // TODO: submit to the db
  next();
};

module.exports = {
  list,
  one,
  submit,
};
