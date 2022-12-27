const express = require("express");
const winston = require("winston");
const app = express();
app.use(express.json());
require("./setup/logging");
require("./setup/routes")(app);
require("./setup/db")();
require("./setup/config")();

const port = 3001;
app.listen(port, () => {
  winston.info(`Example app listening on port ${port}`);
});
