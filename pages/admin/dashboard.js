import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function AdminDashboard() {
  const [admin, setAdmin] = useState(null);
  const [products, setProducts] = useState([]);
  const [transaksi, setTransaksi] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if(!token) {
      router.push("/admin/login");
      return;
    }
    fetch("/api/produk", { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json()).then(setProducts);
    fetch("/api/transaksi", { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json()).then(setTransaksi);
    setAdmin({ username: "admin" });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    router.push("/admin/login");
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <h2>Produk</h2>
      <ul>
        {products.map(p => (
          <li key={p._id}>{p.name} - Rp {p.price}</li>
        ))}
      </ul>
      <h2>Transaksi</h2>
      <ul>
        {transaksi.map(t => (
          <li key={t._id}>{t.produkNama} - {t.status} - Rp {t.harga}</li>
        ))}
      </ul>
    </div>
  );
}