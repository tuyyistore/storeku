import dbConnect from "../../../lib/mongodb";
import Admin from "../../../models/Admin";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  await dbConnect();
  const { username, password } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);
  const admin = await Admin.create({ username, passwordHash });
  res.status(201).json({ success: true, admin: { username: admin.username } });
}