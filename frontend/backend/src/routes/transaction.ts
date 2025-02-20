import express from "express";
import { db } from "../config/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const querySnapshot = await getDocs(collection(db, "transactions"));
    const transactions = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: "Terjadi kesalahan saat mengambil transaksi" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { type, amount } = req.body;
    if (!type || amount <= 0) {
      return res.status(400).json({ error: "Data tidak valid" });
    }
    const docRef = await addDoc(collection(db, "transactions"), { type, amount });
    res.json({ id: docRef.id, type, amount });
  } catch (error) {
    res.status(500).json({ error: "Terjadi kesalahan saat menambahkan transaksi" });
  }
});

export default router;
