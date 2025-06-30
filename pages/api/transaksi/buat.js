import dbConnect from "../../../lib/mongodb";
import Transaksi from "../../../models/Transaksi";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  await dbConnect();
  const { userId, produkId, produkNama, harga, metode } = req.body;

  const order_id = "ORDER-" + Date.now();
  const midtransRes = await fetch("https://app.sandbox.midtrans.com/snap/v1/transactions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": "Basic " + Buffer.from(process.env.MIDTRANS_SERVER_KEY + ":").toString("base64"),
    },
    body: JSON.stringify({
      transaction_details: {
        order_id,
        gross_amount: harga,
      },
      payment_type: metode,
      customer_details: {
        first_name: userId,
      }
    })
  });
  const snap = await midtransRes.json();
  const snapToken = snap.token;

  const transaksi = await Transaksi.create({
    userId, produkId, produkNama, harga, metode, midtransOrderId: order_id, snapToken, status: "pending"
  });

  res.status(200).json({ transaksi, snapToken, redirect_url: snap.redirect_url });
}