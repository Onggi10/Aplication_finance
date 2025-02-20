import { Card, CardContent, Typography, Box, Container } from "@mui/material";
var Dashboard = function (_a) {
    var income = _a.income, expenses = _a.expenses, savings = _a.savings, balance = _a.balance;
    return (<Container sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "80vh",
        }}>
      <Box sx={{ textAlign: "center", width: "100%", maxWidth: 800 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Dashboard Keuangan
        </Typography>
        <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={2}>
          <Card sx={{ backgroundColor: "#4caf50", color: "white" }}>
            <CardContent>
              <Typography variant="h6">Total Pemasukan</Typography>
              <Typography variant="h4">Rp {income.toLocaleString()}</Typography>
            </CardContent>
          </Card>

          <Card sx={{ backgroundColor: "#f44336", color: "white" }}>
            <CardContent>
              <Typography variant="h6">Total Pengeluaran</Typography>
              <Typography variant="h4">Rp {expenses.toLocaleString()}</Typography>
            </CardContent>
          </Card>

          <Card sx={{ backgroundColor: "#2196f3", color: "white" }}>
            <CardContent>
              <Typography variant="h6">Total Tabungan</Typography>
              <Typography variant="h4">Rp {savings.toLocaleString()}</Typography>
            </CardContent>
          </Card>

          <Card sx={{ backgroundColor: "#ff9800", color: "white" }}>
            <CardContent>
              <Typography variant="h6">Saldo Tersedia</Typography>
              <Typography variant="h4">Rp {balance.toLocaleString()}</Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Container>);
};
export default Dashboard;
