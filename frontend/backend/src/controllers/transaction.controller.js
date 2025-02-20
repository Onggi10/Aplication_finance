const { Transaction } = require("../models");

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.findAll();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: "Gagal mengambil data transaksi." });
  }
};

exports.createTransaction = async (req, res) => {
  try {
    const { type, amount } = req.body;
    const transaction = await Transaction.create({ type, amount });
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: "Gagal menambahkan transaksi." });
  }
};
