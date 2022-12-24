const mongoose = require('mongoose');

//User model Schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, maxlength: 50, unique: true },
  name: { type: String, required: true, maxlength: 50, trim: true },
  password: { type: String, required: true, maxlength: 1024 },
  date: { type: Date, default: Date.now },
});

module.exports = userSchema;

