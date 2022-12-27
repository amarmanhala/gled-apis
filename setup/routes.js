const express = require('express');
const transactions = require("../routes/transactions");
const users = require("../routes/users");
const auth = require("../routes/auth");
const getCurrentLoggedUser = require("../routes/getCurrentLoggedUser");
const error = require("../middleware/error");

module.exports = function(app) {
app.use("/api/transactions", transactions);
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/me", getCurrentLoggedUser);
app.use(error);
}