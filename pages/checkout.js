import { useState } from "react";

export default function Checkout({ produk }) {
  const [loading, setLoading] = useState(false);
  const [snapUrl, setSnapUrl] = useState("");

  const handlePay = async () => {
    setLoading(true);
    const res = await fetch("/api/transaksi/buat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: "user1",
        produkId: produk._id,
        produkNama: produk.name,
        harga: produk.price,
        metode: "qris",
      }),
    });
    const data = await res.json();
    setSnapUrl(data.redirect_url);
    setLoading(false);
  };

  return (
    <div>
      <h1>{produk.name}</h1>
      <p>Rp {produk.price.toLocaleString()}</p>
      <button onClick={handlePay} disabled={loading}>
        {loading ? "Memproses..." : "Bayar Sekarang"}
      </button>
      {snapUrl && (
        <div>
          <a href={snapUrl} target="_blank" rel="noopener noreferrer">
            Lanjutkan ke Pembayaran
          </a>
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps(ctx) {
  // Fetch produk dari API
  return {
    props: {
      produk: {
        _id: "dummyid",
        name: "Script Bot WhatsApp",
        price: 200000,
      },
    },
  };
}