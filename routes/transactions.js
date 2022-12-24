const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

//Transaction Schema
const transactionSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 100, trim: true },
  location: { type: String, maxlength: 100, trim: true },
  amount: { type: Number, required: true, maxlength: 100, trim: true },
  date: { type: Date, default: Date.now },
});

//Transaction Model
const Transaction = mongoose.model("Transaction", transactionSchema);

//Get all transactions
router.get("/", async (req, res) => {
  const transactions = await Transaction.find();
  console.log("u are here")
  res.send(transactions);
});

//Add new transaction
router.post('/', async (req, res) => {
  let transaction = new Transaction({
    name: req.body.name,
    amount: req.body.amount,
    location: req.body.location,
  })
  transaction = await transaction.save();
  res.send(transaction);
})

module.exports = router;
