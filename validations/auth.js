const Joi = require("joi");

async function isAuthValid(authObject) {
  //Authentication validation schema
  const authSchema = Joi.object({
    email: Joi.string().max(50).required().email(),
    password: Joi.string().max(1024).required(),
  });

  const result = await authSchema.validate(authObject);

  return result;
}

module.exports = isAuthValid;
