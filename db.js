if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const pgp = require('pg-promise')(/* options */)

const DB_CONFIGURATIONS = {
  host: process.env.DB_HOSTNAME,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  max: 30 // use up to 30 connections

  // "types" - in case you want to set custom type parsers on the pool level
};
const db = pgp(DB_CONFIGURATIONS)
module.exports = db;