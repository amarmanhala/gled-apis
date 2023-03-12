const winston = require('winston');
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

module.exports = function() {
  mongoose
  .connect("mongodb://localhost/gled")
  .then(() => winston.info("Connected to mongoDB....."))
}