import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container, CssBaseline, Box } from "@mui/material";
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
  const [balance, setBalance] = useState<number>(0);
  const [savingsBalance, setSavingsBalance] = useState<number>(0);

  // ✅ Ambil data dari localStorage saat aplikasi dimulai
  useEffect(() => {
    const savedTransactions = localStorage.getItem("transactions");
    const savedBalance = localStorage.getItem("balance");
    const savedSavings = localStorage.getItem("savingsBalance");

    if (savedTransactions) setTransactions(JSON.parse(savedTransactions));
    if (savedBalance) setBalance(JSON.parse(savedBalance));
    if (savedSavings) setSavingsBalance(JSON.parse(savedSavings));
  }, []);

  // ✅ Simpan data ke localStorage setiap kali ada perubahan
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
    localStorage.setItem("balance", JSON.stringify(balance));
    localStorage.setItem("savingsBalance", JSON.stringify(savingsBalance));
  }, [transactions, balance, savingsBalance]);

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
                  income={balance}
                  expenses={transactions.filter((t) => t.type === "expense").reduce((acc, t) => acc + t.amount, 0)}
                  savings={savingsBalance}
                  balance={balance}
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
                  setBalance={setBalance}
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
