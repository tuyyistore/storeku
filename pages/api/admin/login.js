import dbConnect from "../../../lib/mongodb";
import Admin from "../../../models/Admin";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  await dbConnect();
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });
  if (!admin) return res.status(401).json({ error: "User not found" });
  const valid = await bcrypt.compare(password, admin.passwordHash);
  if (!valid) return res.status(401).json({ error: "Password salah" });

  const token = jwt.sign({ adminId: admin._id, username: admin.username }, process.env.JWT_SECRET, { expiresIn: "12h" });
  res.status(200).json({ token, admin: { username: admin.username } });
}