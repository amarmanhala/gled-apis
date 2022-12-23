if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
app.use(express.json());
const Joi = require("joi");
const db = require("./db");
const getTransactions = require("./routes/getTransactions");

console.log(getTransactions);

app.use("/api/transactions/", getTransactions);

const port = 3001;

db.any("SELECT * FROM transactions")
  .then((data) => {
    console.log("DATA:", data);
  })
  .catch((error) => {
    console.log("ERROR:", error);
  });

const transactions = [
  {
    id: 1,
    name: "Coffee",
    location: "Starbuck",
  },
  {
    id: 2,
    name: "Tea",
    location: "Tim Horton",
  },
  {
    id: 3,
    name: "Gas",
    location: "Petro Canada",
  },
];

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/transactions/:id", (req, res) => {
  let transaction = transactions.find((c) => c.id === parseInt(req.params.id));
  if (!transaction) {
    //404
    res.status(404).send("The transaction is not there");
  }
  res.send(transaction);
});

app.post("/api/fefef/", (req, res) => {
  const schema = Joi.object({
    name: Joi.string().max(5).required(),
    location: Joi.string().max(100).required(),
  });
  const result = schema.validate({
    name: req.body.name,
    location: req.body.location,
  });

  if (result.error) {
    res.status(400).send(result.error);
    return;
  }

  const transaction = {
    id: transactions.length + 1,
    name: req.body.name,
    location: req.body.location,
  };
  transactions.push(transaction);
  res.send(transactions);
});

app.put("/api/transaction/:id", (req, res) => {
  let transaction = transactions.find((c) => c.id === parseInt(req.params.id));
  if (!transaction) {
    //404
    res.status(404).send("The transaction is not there");
  }
  transaction.name = req.body.name;
  res.send(transaction);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
