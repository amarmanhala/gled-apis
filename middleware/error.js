const winston = require('winston');

module.exports = function(err, req, res, next) {
  winston.error(err.message, err);


  //TODO: logged error
  res.status(500).send("Something failed");
}