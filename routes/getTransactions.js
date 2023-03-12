const auth = require('../middleware/auth');
const config = require('config');
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const userSchema = require('../models/users');

//User Model
const User = mongoose.model("User", userSchema);

//get transactions
router.get('/',auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
})

module.exports = router;