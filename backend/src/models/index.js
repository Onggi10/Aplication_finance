const { sequelize } = require("../../config/database");
const Transaction = require("./Transaction");
const Saving = require("./Saving");

// Jika ada asosiasi antar model, definisikan di sini

module.exports = { sequelize, Transaction, Saving };
