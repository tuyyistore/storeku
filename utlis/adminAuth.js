import jwt from "jsonwebtoken";

export function verifyAdmin(req, res) {
  const { authorization } = req.headers;
  if (!authorization) return null;
  try {
    const token = authorization.replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (e) {
    return null;
  }
}