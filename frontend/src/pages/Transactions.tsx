import { useState } from "react";
import {
  Button,
  TextField,
  MenuItem,
  Typography,
  Box,
  Container,
  Card,
  CardContent,
  Snackbar,
  Alert,
} from "@mui/material";
import { db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { Transaction } from "../App";

interface TransactionsProps {
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
  setBalance: React.Dispatch<React.SetStateAction<number>>;
}

const Transactions: React.FC<TransactionsProps> = ({
  transactions,
  setTransactions,
  setBalance,
}) => {
  const [amount, setAmount] = useState<number>(0);
  const [type, setType] = useState<"income" | "expense">("income");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleAddTransaction = async () => {
    if (amount <= 0) {
      alert("Jumlah harus lebih dari 0");
      return;
    }

    try {
      const newTransaction: Transaction = {
        id: Date.now().toString(),
        type,
        amount,
      };

      await addDoc(collection(db, "transactions"), {
        type: newTransaction.type,
        amount: newTransaction.amount,
        timestamp: new Date(), // Tambahkan timestamp agar Firestore lebih stabil
      });

      setTransactions([newTransaction, ...transactions]);
      setBalance((prev) => (type === "income" ? prev + amount : prev - amount));
      setAmount(0);
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error menambahkan transaksi:", error);
      alert("Terjadi kesalahan saat menyimpan transaksi.");
    }
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
      <Box sx={{ maxWidth: 600, width: "100%" }}>
        <Card sx={{ padding: 3, boxShadow: "0px 4px 10px rgba(0,0,0,0.1)" }}>
          <CardContent>
            <Typography
              variant="h4"
              fontWeight="bold"
              textAlign="center"
              gutterBottom
            >
              Tambah Transaksi
            </Typography>
            <TextField
              label="Jumlah"
              type="number"
              value={amount === 0 ? "" : amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              fullWidth
              margin="normal"
            />
            <TextField
              select
              label="Tipe Transaksi"
              value={type}
              onChange={(e) => setType(e.target.value as "income" | "expense")}
              fullWidth
              margin="normal"
            >
              <MenuItem value="income">Pemasukan</MenuItem>
              <MenuItem value="expense">Pengeluaran</MenuItem>
            </TextField>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleAddTransaction}
              sx={{ mt: 2 }}
            >
              Tambah Transaksi
            </Button>
          </CardContent>
        </Card>
      </Box>

      {/* ✅ Modal Notifikasi */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Transaksi berhasil ditambahkan!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Transactions;
