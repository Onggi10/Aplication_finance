const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/database");

const Transaction = sequelize.define("Transaction", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  type: {
    type: DataTypes.ENUM("income", "expense"),
    allowNull: false,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  // Kamu bisa menambahkan field lainnya, misalnya createdAt, updatedAt (otomatis di-handle oleh Sequelize)
});

module.exports = Transaction;
