const validator = require('../helpers/validate');

const saveUser = (req, res, next) => {
  const validationRule = {
    firstName: 'required|string',
    lastName: 'required|string',
    email: 'required|email',
    password: 'required|string',
    birthday: 'string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const saveMonster = (req, res, next) => {
  const validationRule = {
    SpeciesName: 'required|string',
    Classification: 'required|string',
    Element: 'required|string',
    FirstAppearance: 'required|string',
    HasOwnTheme: 'string',
    LastAppearance: 'required|string',
    Weakness: 'string',

  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveUser,
  saveMonster
};