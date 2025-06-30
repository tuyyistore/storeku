import dbConnect from "../../../lib/mongodb";
import Transaksi from "../../../models/Transaksi";

export default async function handler(req, res) {
  await dbConnect();
  if (req.method === "GET") {
    const q = req.query;
    const filter = {};
    if (q.userId) filter.userId = q.userId;
    if (q.status) filter.status = q.status;
    const data = await Transaksi.find(filter).sort({ createdAt: -1 });
    return res.status(200).json(data);
  }
  res.status(405).end();
}