require("dotenv").config();

// Check for mandatory environment variables
const required = [
  "NODE_ENV",
  "PORT_NUMBER",
  "JWT_SECRET",
  "MYSQL_USER",
  "MYSQL_DB",
  "MYSQL_PASS",
  "MYSQL_HOST",
  "MYSQL_PORT"
];

let config = {};

required.forEach(param => {
  if (!process.env[param]) {
    throw new Error(`Environment parameter ${param} is missing`);
  }

  Object.assign(config, { [param]: process.env[param] });
});

module.exports = config;
