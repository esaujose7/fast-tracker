const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db/connection");

class Fasting extends Model {}
Fasting.init(
  {
    userId: {
      allowNull: false,
      references: {
        key: "id",
        model: "users"
      },
      type: DataTypes.INTEGER
    },
    ongoing: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    }
  },
  { sequelize, modelName: "Fastings" }
);

module.exports = Fasting;
