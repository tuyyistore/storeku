# Next.js Bot Store

## Fitur
- Jual produk digital: script bot, jasa, nomor virtual, dll
- Checkout, pembayaran otomatis (Midtrans Snap: QRIS, OVO, DANA, dsb)
- Upload bukti pembayaran (jika manual)
- Login & dashboard admin (kelola produk, transaksi)
- Notifikasi admin/user (extendable WA/email)

## Deploy Cepat ke Vercel
1. Clone repo ini.
2. Buat database MongoDB Atlas, catat URI.
3. Daftar Midtrans, dapatkan Server Key.
4. Deploy ke [Vercel](https://vercel.com/) (import repo, atau upload ZIP).
5. Set environment variables di dashboard Vercel:
   - MONGODB_URI
   - MIDTRANS_SERVER_KEY
   - JWT_SECRET
6. Tunggu build selesai. Akses link preview Vercel Anda!

## Halaman
- `/` : Home / List produk
- `/produk/[id]` : Detail produk
- `/checkout` : Checkout & pembayaran
- `/admin/login` : Login admin
- `/admin/dashboard` : Dashboard admin

## Catatan
- Untuk upload file di production, gunakan S3/Cloudinary.
- Untuk API Midtrans, pastikan webhook mengarah ke endpoint `/api/transaksi/notif`.