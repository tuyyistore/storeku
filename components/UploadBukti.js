import { useState } from "react";

export default function UploadBukti({ transaksiId }) {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("bukti", file);
    const res = await fetch(`/api/transaksi/${transaksiId}/bukti`, {
      method: "POST",
      body: formData,
    });
    if (res.ok) setStatus("Bukti berhasil diupload!");
    else setStatus("Gagal upload");
  };
  return (
    <div>
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload Bukti</button>
      <p>{status}</p>
    </div>
  );
}