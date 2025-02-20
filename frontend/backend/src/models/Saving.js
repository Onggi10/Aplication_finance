const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/database");

const Saving = sequelize.define("Saving", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Saving;
