var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { useState } from "react";
import { Container, Typography, TextField, Button, List, ListItem, ListItemText, Card, CardContent, Box, Snackbar, Alert, } from "@mui/material";
var Savings = function (_a) {
    var setSavings = _a.setSavings, setBalance = _a.setBalance, balance = _a.balance;
    var _b = useState([]), savingsList = _b[0], setSavingsList = _b[1];
    var _c = useState(""), name = _c[0], setName = _c[1];
    var _d = useState(""), amount = _d[0], setAmount = _d[1];
    var _e = useState(false), openSnackbar = _e[0], setOpenSnackbar = _e[1];
    var addSaving = function () {
        if (!name || amount === "" || amount <= 0 || amount > balance) {
            alert("Nominal tidak valid atau melebihi saldo yang tersedia.");
            return;
        }
        var newSaving = { id: savingsList.length + 1, name: name, amount: amount };
        var updatedSavings = __spreadArray([newSaving], savingsList, true); // ✅ Tambah data langsung ke daftar
        setSavingsList(updatedSavings);
        setSavings(function (prev) { return prev + amount; });
        setBalance(function (prev) { return prev - amount; });
        setName("");
        setAmount("");
        setOpenSnackbar(true); // ✅ Tampilkan notifikasi
    };
    return (<Container sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "80vh",
        }}>
      <Box sx={{ maxWidth: 600, width: "100%" }}>
        <Card sx={{ padding: 3, boxShadow: "0px 4px 10px rgba(0,0,0,0.1)" }}>
          <CardContent>
            <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
              Tabungan Saya
            </Typography>
            <Typography textAlign="center" sx={{ color: "gray" }}>
              Saldo Tersedia: <strong>Rp {balance.toLocaleString()}</strong>
            </Typography>
            <TextField label="Nama Tabungan" value={name} onChange={function (e) { return setName(e.target.value); }} fullWidth margin="normal"/>
            <TextField label="Jumlah" type="number" value={amount === "" ? "" : amount} onChange={function (e) {
            var newValue = e.target.value;
            if (/^\d*$/.test(newValue)) {
                setAmount(newValue === "" ? "" : Number(newValue));
            }
        }} fullWidth margin="normal"/>
            <Button variant="contained" color="primary" fullWidth onClick={addSaving} sx={{ mt: 2 }}>
              Tambah Tabungan
            </Button>
            <List sx={{ marginTop: 3 }}>
              {savingsList.length === 0 ? (<Typography textAlign="center" sx={{ color: "gray" }}>
                  Belum ada tabungan
                </Typography>) : (savingsList.map(function (saving) { return (<ListItem key={saving.id} sx={{ borderBottom: "1px solid #eee" }}>
                    <ListItemText primary={saving.name} secondary={"Rp ".concat(saving.amount.toLocaleString())}/>
                  </ListItem>); }))}
            </List>
          </CardContent>
        </Card>
      </Box>

      {/* ✅ Modal Notifikasi */}
      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={function () { return setOpenSnackbar(false); }}>
        <Alert onClose={function () { return setOpenSnackbar(false); }} severity="success" sx={{ width: "100%" }}>
          Tabungan berhasil ditambahkan!
        </Alert>
      </Snackbar>
    </Container>);
};
export default Savings;
