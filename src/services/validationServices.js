const Joi = require('joi');

function validateRegisterUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(6).max(255).required(),
    email: Joi.string().min(6).max(255).required().email({ tlds: false }),
    password: Joi.string().min(6).max(1024).required()
  })

  return schema.validate(user);
}

function validateLoginUser(user) {
  const schema = Joi.object({
    email: Joi.string().min(6).max(255).required().email({ tlds: false }),
    password: Joi.string().min(6).max(1024).required()
  })

  return schema.validate(user);
}

module.exports = {
  validateLoginUser,
  validateRegisterUser
}