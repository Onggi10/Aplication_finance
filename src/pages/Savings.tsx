import { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";

interface SavingsProps {
  setSavings: React.Dispatch<React.SetStateAction<number>>;
  setBalance: React.Dispatch<React.SetStateAction<number>>;
  balance: number;
}

const Savings: React.FC<SavingsProps> = ({
  setSavings,
  setBalance,
  balance,
}) => {
  const [savingsList, setSavingsList] = useState<
    { id: number; name: string; amount: number }[]
  >([]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const addSaving = () => {
    if (!name || amount === "" || amount <= 0 || amount > balance) {
      alert("Nominal tidak valid atau melebihi saldo yang tersedia.");
      return;
    }

    const newSaving = { id: savingsList.length + 1, name, amount };
    const updatedSavings = [newSaving, ...savingsList]; // ✅ Tambah data langsung ke daftar

    setSavingsList(updatedSavings);
    setSavings((prev) => prev + amount);
    setBalance((prev) => prev - amount);
    setName("");
    setAmount("");
    setOpenSnackbar(true); // ✅ Tampilkan notifikasi
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
              Tabungan Saya
            </Typography>
            <Typography textAlign="center" sx={{ color: "gray" }}>
              Saldo Tersedia: <strong>Rp {balance.toLocaleString()}</strong>
            </Typography>
            <TextField
              label="Nama Tabungan"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Jumlah"
              type="number"
              value={amount === "" ? "" : amount}
              onChange={(e) => {
                const newValue = e.target.value;
                if (/^\d*$/.test(newValue)) {
                  setAmount(newValue === "" ? "" : Number(newValue));
                }
              }}
              fullWidth
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={addSaving}
              sx={{ mt: 2 }}
            >
              Tambah Tabungan
            </Button>
            <List sx={{ marginTop: 3 }}>
              {savingsList.length === 0 ? (
                <Typography textAlign="center" sx={{ color: "gray" }}>
                  Belum ada tabungan
                </Typography>
              ) : (
                savingsList.map((saving) => (
                  <ListItem
                    key={saving.id}
                    sx={{ borderBottom: "1px solid #eee" }}
                  >
                    <ListItemText
                      primary={saving.name}
                      secondary={`Rp ${saving.amount.toLocaleString()}`}
                    />
                  </ListItem>
                ))
              )}
            </List>
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
          Tabungan berhasil ditambahkan!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Savings;
