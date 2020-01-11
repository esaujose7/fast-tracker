const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db/connection");

class User extends Model {}
User.init(
  {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  },
  {
    sequelize,
    modelName: "Users",
    defaultScope: {
      attributes: { exclude: ["password"] }
    },
    scopes: {
      withPassword: {
        attributes: {}
      }
    }
  }
);

module.exports = User;
