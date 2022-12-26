const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Joi = require("joi");
const isTransactionValid = require("../validations/transaction");

function asyncMiddleware(handler) {
  return async (req, res, next) => {
    try {
      await handler(req, res);
    }
    catch (exception) {
     next(exception);
    }
  }
}
//Transaction Schema
const transactionSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 100, trim: true },
  location: { type: String, maxlength: 100, trim: true },
  amount: { type: Number, required: true, maxlength: 100, trim: true },
  date: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

//Transaction Model
const Transaction = mongoose.model("Transaction", transactionSchema);

//Get all transactions
router.get("/", asyncMiddleware(async (req, res) => {
  
    const transactions = await Transaction.find();
    console.log("u are here");
    res.send(transactions);
  
}));

//Add new transaction
router.post("/", async (req, res, next) => {
  //handles the error
  try {
    //Check isTransaction valid or not with Joi
    const response = await isTransactionValid(req.body);
    if (response.error)
      return res.status(400).send(response.error.details[0].message);

    let transaction = new Transaction({
      name: req.body.name,
      amount: req.body.amount,
      location: req.body.location,
    });
    transaction = await transaction.save();
    res.send(transaction);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
