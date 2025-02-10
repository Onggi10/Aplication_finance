import { Card, CardContent, Typography, Box, Container } from "@mui/material";

interface DashboardProps {
  income: number;
  expenses: number;
  savings: number;
  balance: number;
}

const Dashboard: React.FC<DashboardProps> = ({
  income,
  expenses,
  savings,
  balance,
}) => {
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
      }}
    >
      <Box sx={{ textAlign: "center", width: "100%", maxWidth: 800 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Dashboard Keuangan
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 2,
            justifyContent: "center",
            alignItems: "stretch",
            width: "100%",
          }}
        >
          <Card sx={{ backgroundColor: "#4caf50", color: "white" }}>
            <CardContent>
              <Typography variant="h6">Total Pemasukan</Typography>
              <Typography variant="h4">Rp {income.toLocaleString()}</Typography>
            </CardContent>
          </Card>

          <Card sx={{ backgroundColor: "#f44336", color: "white" }}>
            <CardContent>
              <Typography variant="h6">Total Pengeluaran</Typography>
              <Typography variant="h4">
                Rp {expenses.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ backgroundColor: "#2196f3", color: "white" }}>
            <CardContent>
              <Typography variant="h6">Total Tabungan</Typography>
              <Typography variant="h4">
                Rp {savings.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ backgroundColor: "#ff9800", color: "white" }}>
            <CardContent>
              <Typography variant="h6">Saldo Tersedia</Typography>
              <Typography variant="h4">
                Rp {balance.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Container>
  );
};

export default Dashboard;
