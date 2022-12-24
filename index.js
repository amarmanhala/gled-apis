if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
app.use(express.json());
const mongoose = require("mongoose");
const transactions = require('./routes/transactions');
const users = require('./routes/users');
const auth = require('./routes/auth');

mongoose
  .connect("mongodb://localhost/gled")
  .then(() => console.log("Connected to mongoDB...."))
  .catch((err) => console.error("Could not connect", err));


app.use('/api/transactions', transactions);
app.use('/api/users', users);
app.use('/api/auth', auth);

const port = 3001;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
