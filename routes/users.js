const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const userSchema = require('../models/users');
const isUserValid = require('../validations/user');
const _ = require('lodash');
const bcrypt = require('bcrypt');

//User Model
const User = mongoose.model("User", userSchema);

//Add new user
router.post('/', async (req, res) => {

  //Check isUser valid or not with Joi 
  const response = await isUserValid(req.body);
  if (response.error) return res.status(400).send(response.error.details[0].message);

let user = await User.findOne( { email: req.body.email })
if (user) return res.status(400).send("User already registered");

  user = new User(_.pick(req.body, ['name', 'email', 'password']));

  //Encrypt the password
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  user = await user.save();

  res.send(_.pick(user, ['name', 'email', 'id']));
})


module.exports = router;
