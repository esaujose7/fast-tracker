const Sequelize = require("sequelize");

const connection = new Sequelize("fast_tracker", "dev", "123456", {
  host: "localhost",
  dialect: "mysql",
  port: "3306"
});

module.exports = connection;
