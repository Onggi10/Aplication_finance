import express, { Request, Response } from "express";
import { db } from "../config/firebase";
import { collection, addDoc, getDocs, doc, deleteDoc } from "firebase/firestore";

const router = express.Router();

/**
 * @route GET /api/savings
 * @desc Ambil semua data tabungan dari Firestore
 */
router.get("/", async (req: Request, res: Response) => {
  try {
    const querySnapshot = await getDocs(collection(db, "savings"));
    const savings = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return res.json(savings);
  } catch (error) {
    return res.status(500).json({ error: "Terjadi kesalahan saat mengambil data tabungan", details: error });
  }
});

/**
 * @route POST /api/savings
 * @desc Tambah data tabungan baru
 */
router.post("/", async (req: Request, res: Response) => {
  try {
    const { name, amount } = req.body;

    if (!name || isNaN(Number(amount)) || Number(amount) <= 0) {
      return res.status(400).json({ error: "Nama tabungan atau nominal tidak valid" });
    }

    const docRef = await addDoc(collection(db, "savings"), { name, amount: Number(amount) });
    return res.status(201).json({ id: docRef.id, name, amount: Number(amount) });
  } catch (error) {
    return res.status(500).json({ error: "Terjadi kesalahan saat menambahkan tabungan", details: error });
  }
});

/**
 * @route DELETE /api/savings/:id
 * @desc Hapus tabungan berdasarkan ID
 */
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "ID tidak valid" });
    }

    await deleteDoc(doc(collection(db, "savings"), id));
    return res.json({ message: "Tabungan berhasil dihapus" });
  } catch (error) {
    return res.status(500).json({ error: "Terjadi kesalahan saat menghapus tabungan", details: error });
  }
});

export default router;
