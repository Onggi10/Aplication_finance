import { useState } from "react";
import {
  Button,
  TextField,
  MenuItem,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Container,
} from "@mui/material";
import { Transaction } from "../App";

interface TransactionsProps {
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
  setBalance: React.Dispatch<React.SetStateAction<number>>;
}

const Transactions: React.FC<TransactionsProps> = ({ transactions, setTransactions, setBalance }) => {
  const [amount, setAmount] = useState<number>(0);
  const [type, setType] = useState<"income" | "expense">("income");

  const handleAddTransaction = () => {
    if (amount <= 0) return;

    const newTransaction: Transaction = {
      id: transactions.length + 1,
      type,
      amount,
    };

    setTransactions([...transactions, newTransaction]);
    setBalance((prev) => (type === "income" ? prev + amount : prev - amount)); // ✅ Update saldo utama
    setAmount(0);
  };

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 800, textAlign: "center" }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Tambah Transaksi
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            backgroundColor: "#f9f9f9",
            padding: 3,
            borderRadius: 2,
            boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
            marginBottom: 4,
          }}
        >
          <TextField
            label="Jumlah"
            type="number"
            value={amount === 0 ? "" : amount} // ✅ Kosongkan jika 0
            onChange={(e) => {
              const newValue = e.target.value;
              if (/^\d*$/.test(newValue)) {
                // ✅ Hanya angka
                setAmount(newValue === "" ? 0 : Number(newValue));
              }
            }}
            fullWidth
          />
          <TextField
            select
            label="Tipe Transaksi"
            value={type}
            onChange={(e) => setType(e.target.value as "income" | "expense")}
            fullWidth
          >
            <MenuItem value="income">Pemasukan</MenuItem>
            <MenuItem value="expense">Pengeluaran</MenuItem>
          </TextField>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddTransaction}
          >
            Tambah Transaksi
          </Button>
        </Box>

        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Riwayat Transaksi
        </Typography>
        {transactions.length === 0 ? (
          <Typography textAlign="center" sx={{ color: "gray", marginTop: 2 }}>
            Tidak ada transaksi
          </Typography>
        ) : (
          <Grid container spacing={2} justifyContent="center">
            {transactions.map((trx) => (
              <Grid item xs={12} md={6} key={trx.id}>
                <Card
                  sx={{
                    backgroundColor:
                      trx.type === "income" ? "#e8f5e9" : "#ffebee",
                    color: trx.type === "income" ? "#2e7d32" : "#c62828",
                    borderLeft: `5px solid ${
                      trx.type === "income" ? "#2e7d32" : "#c62828"
                    }`,
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold">
                      {trx.type === "income" ? "Pemasukan" : "Pengeluaran"}
                    </Typography>
                    <Typography variant="h5" fontWeight="bold">
                      Rp {trx.amount.toLocaleString()}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default Transactions;
