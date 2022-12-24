const Joi = require('joi');

async function isUserValid(userObject) {
  
  //Transaction validation schema 
const userSchema = Joi.object({
  name: Joi.string().max(100).required(),
  email: Joi.string().max(50).required().email(),
  password: Joi.string().max(1024).required()
});

const result = await userSchema.validate(userObject);

return result;

}

module.exports = isUserValid;


