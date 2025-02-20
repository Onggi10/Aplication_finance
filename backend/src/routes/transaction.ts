import express, { Request, Response } from "express";
import { db } from "../config/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

const router = express.Router();

/**
 * @route GET /api/transactions
 * @desc Ambil semua transaksi dari Firestore
 */
router.get("/", async (req: Request, res: Response) => {
  try {
    const querySnapshot = await getDocs(collection(db, "transactions"));
    const transactions = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: "Terjadi kesalahan saat mengambil transaksi", details: error });
  }
});

/**
 * @route POST /api/transactions
 * @desc Tambah transaksi baru
 */
router.post("/", async (req: Request, res: Response) => {
  try {
    const { type, amount } = req.body;

    // Validasi input agar tidak kosong atau negatif
    if (!type || isNaN(Number(amount)) || Number(amount) <= 0) {
      return res.status(400).json({ error: "Data transaksi tidak valid" });
    }

    const docRef = await addDoc(collection(db, "transactions"), { type, amount: Number(amount) });

    res.status(201).json({ id: docRef.id, type, amount: Number(amount) });
  } catch (error) {
    res.status(500).json({ error: "Terjadi kesalahan saat menambahkan transaksi", details: error });
  }
});

export default router;
