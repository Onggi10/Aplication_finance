const express = require("express");
const cors = require("cors");
const transactionRoutes = require("./src/routes/transaction.routes");
// Jika ada route lain, import juga

const app = express();

app.use(cors());
app.use(express.json()); // Untuk parsing JSON

// Route API
app.use("/api/transactions", transactionRoutes);
// app.use("/api/savings", savingsRoutes);

module.exports = app;
