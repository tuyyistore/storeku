import dbConnect from "../../../lib/mongodb";
import Transaksi from "../../../models/Transaksi";
import { notifyAdmin, notifyUser } from "../../../utils/notify";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  await dbConnect();

  const { order_id, transaction_status } = req.body;
  let status = "pending";
  if (transaction_status === "settlement" || transaction_status === "capture") status = "paid";
  if (transaction_status === "expire") status = "expired";

  const trx = await Transaksi.findOneAndUpdate(
    { midtransOrderId: order_id },
    { status },
    { new: true }
  );

  if (trx) {
    await notifyAdmin(`Transaksi ${trx.produkNama} status: ${status}`);
    await notifyUser(trx.userId, `Pembayaran untuk ${trx.produkNama} status: ${status}`);
  }

  res.status(200).json({ received: true });
}