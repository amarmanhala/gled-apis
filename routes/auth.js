const config = require("config");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const userSchema = require("../models/users");
const isAuthValid = require("../validations/auth");
const _ = require("lodash");
const bcrypt = require("bcrypt");

//User Model
const User = mongoose.model("User", userSchema);

//Add new user
router.post("/", async (req, res) => {
  //Check isUser valid or not with Joi
  const response = await isAuthValid(req.body);
  if (response.error)
    return res.status(400).send(response.error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password");

  const token = user.generateAuthToken();

  res.send(token);
  console.log("First commit of the year");
});

module.exports = router;
