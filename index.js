 
const winston = require('winston');
require('winston-mongodb');
const error = require('./middleware/error');
const config = require('config');
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
const getCurrentLoggedUser = require('./routes/getCurrentLoggedUser');

winston.add(new winston.transports.File({ filename: 'logfile.log' }));
winston.add(new winston.transports.MongoDB({db: 'mongodb://localhost/gled'}));

if(!config.get('jwtPrivateKey')) {
  console.log("Fatal Error: JwtPrivateKey is not defined.");
  process.exit(1);
}


mongoose
  .connect("mongodb://localhost/gled")
  .then(() => console.log("Connected to mongoDB...."))
  .catch((err) => console.error("Could not connect", err));


app.use('/api/transactions', transactions);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/me', getCurrentLoggedUser);

app.use(error);

const port = 3001;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
