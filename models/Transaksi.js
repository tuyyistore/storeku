import mongoose from "mongoose";

const TransaksiSchema = new mongoose.Schema({
  userId: String,
  produkId: String,
  produkNama: String,
  harga: Number,
  metode: String,
  status: { type: String, default: "pending" },
  midtransOrderId: String,
  snapToken: String,
  buktiUrl: String,
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.models.Transaksi || mongoose.model("Transaksi", TransaksiSchema);