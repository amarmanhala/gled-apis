const Joi = require('joi');

async function isTransactionValid(transactionObject) {
  
  //Transaction validation schema 
const transactionSchema = Joi.object({
  name: Joi.string().max(100).required(),
  location: Joi.string().max(100),
  amount: Joi.number().max(100).required()
});

const result = await transactionSchema.validate(transactionObject);

return result;

}

module.exports = isTransactionValid;


