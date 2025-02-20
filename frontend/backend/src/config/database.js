const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.finance_tracker, // Nama database
  process.env.finance_user, // Username
  process.env.password_anda, // Password
  {
    host: process.env.localhost, // Misalnya: 'localhost'
    dialect: "mysql", // Gunakan MySQL
  }
);

sequelize
  .authenticate()
  .then(() => console.log("Koneksi ke MySQL berhasil."))
  .catch((error) => console.error("Koneksi ke MySQL gagal:", error));

module.exports = { sequelize };
