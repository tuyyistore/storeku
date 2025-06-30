import dbConnect from "../../../../lib/mongodb";
import Transaksi from "../../../../models/Transaksi";
import nextConnect from "next-connect";
import multer from "multer";

const upload = multer({ dest: "./public/uploads/" });

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Upload error: ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.single("bukti"));

apiRoute.post(async (req, res) => {
  await dbConnect();
  const trxId = req.query.id;
  const filePath = `/uploads/${req.file.filename}`;
  await Transaksi.findByIdAndUpdate(trxId, { buktiUrl: filePath });
  res.status(200).json({ buktiUrl: filePath });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};