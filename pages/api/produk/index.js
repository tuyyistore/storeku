import dbConnect from "../../../lib/mongodb";
import Product from "../../../models/Product";
import { verifyAdmin } from "../../../utils/adminAuth";

export default async function handler(req, res) {
  await dbConnect();
  if (req.method === "POST") {
    const admin = verifyAdmin(req, res);
    if(!admin) return res.status(401).json({ error: "Unauthorized" });
    const { name, description, price, image, category } = req.body;
    const prod = await Product.create({ name, description, price, image, category });
    return res.status(201).json(prod);
  }
  if (req.method === "GET") {
    const products = await Product.find();
    return res.status(200).json(products);
  }
  res.status(405).end();
}