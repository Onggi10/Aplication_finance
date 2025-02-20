import express from "express";
import cors from "cors";
import transactionsRoutes from "./routes/transaction";
import savingsRoutes from "./routes/saving";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/transactions", transactionsRoutes);
app.use("/api/savings", savingsRoutes);

// Jangan gunakan app.listen(PORT) di Vercel
export default app;
