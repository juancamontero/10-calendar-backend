const { response } = require("express");
const { validationResult } = require("express-validator");

const fieldsValidators = (req, res = response, next) => {
  // error handling
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.mapped(),
    });
  }
  // next is only called if no errors found
  next();
};

module.exports = {
  fieldsValidators,
};
