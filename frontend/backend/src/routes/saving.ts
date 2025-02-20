import express from "express";
import { db } from "../config/firebase";
import { collection, addDoc, getDocs, doc, deleteDoc } from "firebase/firestore";

const router = express.Router();

/**
 * @route GET /api/savings
 * @desc Ambil semua data tabungan dari Firestore
 */
router.get("/", async (req, res) => {
  try {
    const querySnapshot = await getDocs(collection(db, "savings"));
    const savings = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(savings);
  } catch (error) {
    res.status(500).json({ error: "Terjadi kesalahan saat mengambil data tabungan" });
  }
});

/**
 * @route POST /api/savings
 * @desc Tambah data tabungan baru
 */
router.post("/", async (req, res) => {
  try {
    const { name, amount } = req.body;

    if (!name || amount <= 0) {
      return res.status(400).json({ error: "Nama tabungan atau nominal tidak valid" });
    }

    const docRef = await addDoc(collection(db, "savings"), { name, amount });
    res.json({ id: docRef.id, name, amount });
  } catch (error) {
    res.status(500).json({ error: "Terjadi kesalahan saat menambahkan tabungan" });
  }
});

/**
 * @route DELETE /api/savings/:id
 * @desc Hapus tabungan berdasarkan ID
 */
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await deleteDoc(doc(db, "savings", id));
    res.json({ message: "Tabungan berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ error: "Terjadi kesalahan saat menghapus tabungan" });
  }
});

export default router;
