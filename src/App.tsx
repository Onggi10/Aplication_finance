import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container, CssBaseline, Box } from "@mui/material";
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Savings from "./pages/Savings";

export interface Transaction {
  id: number;
  type: "income" | "expense";
  amount: number;
}

export default function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<number>(0); // ✅ Saldo utama
  const [savingsBalance, setSavingsBalance] = useState<number>(0); // ✅ Saldo tabungan

  // Hitung total pemasukan dan pengeluaran
  const totalIncome = transactions
    .filter((trx) => trx.type === "income")
    .reduce((acc, trx) => acc + trx.amount, 0);

  const totalExpenses = transactions
    .filter((trx) => trx.type === "expense")
    .reduce((acc, trx) => acc + trx.amount, 0);

  return (
    <Router>
      <CssBaseline />
      <Box display="flex">
        <Sidebar />
        <Container sx={{ padding: "10px" }}>
          <Routes>
            <Route
              path="/"
              element={
                <Dashboard
                  income={totalIncome}
                  expenses={totalExpenses}
                  savings={savingsBalance}
                  balance={balance} // ✅ Langsung gunakan balance tanpa dikurangi savingsBalance
                />
              }
            />
            <Route
              path="/transactions"
              element={
                <Transactions
                  transactions={transactions}
                  setTransactions={setTransactions}
                  setBalance={setBalance}
                />
              }
            />
            <Route
              path="/savings"
              element={
                <Savings
                  setSavings={setSavingsBalance}
                  setBalance={setBalance} // ✅ Pastikan saldo utama dikurangi saat menabung
                  balance={balance}
                />
              }
            />
          </Routes>
        </Container>
      </Box>
    </Router>
  );
}
