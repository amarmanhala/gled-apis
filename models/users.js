const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');

//User model Schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, maxlength: 50, unique: true },
  name: { type: String, required: true, maxlength: 50, trim: true },
  password: { type: String, required: true, maxlength: 1024 },
  date: { type: Date, default: Date.now },
});

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({ _id: this._id, name: this.name, email: this.email }, config.get('jwtPrivateKey'));
  return token;
}

module.exports = userSchema;

