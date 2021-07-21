const Joi = require("@hapi/joi");

const validateRegisterUser = (data) => {
  const schema = {
    name: Joi.string().required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  };
  return Joi.validate(data, schema);
};

const validateLoginUser = (data) => {
  const schema = {
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  };
  return Joi.validate(data, schema);
};

module.exports.validateRegisterUser = validateRegisterUser;
module.exports.validateLoginUser = validateLoginUser;
