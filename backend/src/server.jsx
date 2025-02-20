import express from "express";
import cors from "cors";
import transactionsRoutes from "./routes/transaction";
import savingsRoutes from "./routes/saving";
var app = express();
app.use(cors());
app.use(express.json());
app.use("/api/transactions", transactionsRoutes);
app.use("/api/savings", savingsRoutes);
var PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
    console.log("Server berjalan di port ".concat(PORT));
});
