import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container, CssBaseline, Box } from "@mui/material";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Savings from "./pages/Savings";
import { db } from "./firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export interface Transaction {
  id: string;
  type: "income" | "expense";
  amount: number;
}

export default function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<number>(0);
  const [savingsBalance, setSavingsBalance] = useState<number>(0);

  useEffect(() => {
    const fetchTransactions = async () => {
      const querySnapshot = await getDocs(collection(db, "transactions"));
      const transactionsData: Transaction[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as { type: "income" | "expense"; amount: number }),
      }));

      setTransactions(transactionsData);

      const totalBalance = transactionsData.reduce(
        (acc, t) => (t.type === "income" ? acc + t.amount : acc - t.amount),
        0
      );
      setBalance(totalBalance);
    };

    fetchTransactions();
  }, []);

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
                  expenses={transactions
                    .filter((t) => t.type === "expense")
                    .reduce((acc, t) => acc + t.amount, 0)}
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
