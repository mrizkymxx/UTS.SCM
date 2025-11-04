# 📦 StokManis - Sistem Manajemen Persediaan

<div align="center">

![StokManis Logo](https://img.shields.io/badge/StokManis-v1.0-blue?style=for-the-badge)
[![React](https://img.shields.io/badge/React-19.1-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-7.1-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com)

**Aplikasi SCM untuk UMKM Indonesia**

Dari SCM Reaktif ke Proaktif dengan Notifikasi ROP Otomatis

[Demo Live](#) • [Documentation](FEATURES.md) • [Deploy Guide](DEPLOY.md) • [Quick Start](QUICKSTART.md)

</div>

---

## 🎯 Tentang Aplikasi

**StokManis** (Stok Manajemen Bisnis) adalah aplikasi SCM (Supply Chain Management) yang dirancang khusus untuk membantu UMKM seperti **"Box Kuat"** dalam mengelola persediaan bahan baku secara **proaktif**.

### 🎬 Latar Belakang

**Box Kuat** adalah UMKM yang memproduksi kardus kemasan. Mereka menghadapi masalah klasik:
- ❌ Sering kehabisan stok bahan baku (stockout)
- ❌ Produksi terhambat menunggu bahan datang
- ❌ Kehilangan order karena tidak bisa deliver tepat waktu
- ❌ Sistem pencatatan manual tidak efektif

**Solusi**: StokManis mengubah pendekatan dari **reaktif** (pesan saat habis) menjadi **proaktif** (pesan sebelum habis) menggunakan konsep **Reorder Point (ROP)**.

---

## ✨ Fitur Utama

### 1. 📊 Dashboard Monitoring

<table>
<tr>
<td width="50%">

**Stok Kritis Alert**
- Notifikasi besar berwarna merah
- Muncul otomatis saat stok ≤ ROP
- Tombol quick action
- Real-time monitoring

</td>
<td width="50%">

**KPI Dashboard**
- Stok Bahan Baku
- Work in Progress (WIP)
- Barang Jadi
- Penjualan Bulan Ini

</td>
</tr>
<tr>
<td>

**Grafik Penjualan**
- Trend 6 bulan terakhir
- Perbandingan vs target
- Interactive tooltips
- Export ready

</td>
<td>

**Visual Stok**
- Bar chart bahan baku
- Indikator ROP & Safety Stock
- Color-coded status
- Responsive design

</td>
</tr>
</table>

### 2. 📦 Modul Persediaan

| Fitur | Deskripsi |
|-------|-----------|
| **Barang Masuk** | Pencatatan penerimaan dari supplier dengan nomor PO |
| **Ambil Produksi** | Tracking penggunaan bahan baku untuk produksi |
| **Real-time Stok** | Update otomatis setiap transaksi |
| **Pengaturan ROP** | Konfigurasi Safety Stock, ROP, EOQ, Lead Time |
| **Riwayat Transaksi** | Log lengkap pergerakan stok |

### 3. 🛒 Modul Penjualan

- **Input Pesanan (SO)**: Form lengkap dengan auto-calculate total
- **Input Pengiriman**: Tracking dengan nomor resi
- **Laporan Penjualan**: KPI summary + detail breakdown
- **Status Tracking**: Pending → Dalam Proses → Selesai
- **Multi-Tab Interface**: Pesanan, Pengiriman, Laporan

### 4. 🔔 Notifikasi ROP (Fitur Inti)

```
Cara Kerja:
1. Sistem monitoring stok real-time dari Modul Persediaan
2. Bandingkan: Stok Saat Ini vs ROP
3. Trigger: Jika Stok ≤ ROP
4. Aksi: Tampilkan notifikasi dengan detail lengkap
```

**Informasi dalam Notifikasi:**
- ⚠️ Nama bahan baku & status kritis
- 📊 Stok saat ini, ROP, EOQ, Lead Time
- 🏢 Info supplier (nama, estimasi biaya)
- ✅ Action button (mark read, delete)

---

## 🚀 Teknologi

### Frontend Stack
- **React 19.1**: UI framework
- **Vite 7.1**: Build tool & dev server
- **React Router v7**: Client-side routing
- **Tailwind CSS 3.4**: Utility-first CSS
- **Recharts 3.3**: Data visualization
- **Lucide React**: Icon library

### DevOps
- **Git**: Version control
- **GitHub**: Code repository
- **Vercel**: Hosting & deployment
- **ESLint**: Code linting

---

## 💻 Quick Start

### Prerequisites
```bash
node --version  # v16+
npm --version   # v7+
git --version   # v2+
```

### Installation

```bash
# Clone repository
git clone https://github.com/yourusername/stokmanis.git
cd stokmanis

# Install dependencies
npm install

# Run development server
npm run dev
```

Open browser: **http://localhost:5173**

### Build for Production
```bash
npm run build     # Output: dist/
npm run preview   # Preview production build
```

---

## 📱 Deploy ke Vercel

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/stokmanis)

### Manual Deploy

1. **Push to GitHub**
```bash
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/stokmanis.git
git push -u origin main
```

2. **Import di Vercel**
- Login ke [vercel.com](https://vercel.com)
- Click **Import Project**
- Select GitHub repository
- Click **Deploy**

3. **Done!** 🎉
- Live URL: `https://stokmanis.vercel.app`

📖 **Panduan lengkap**: [DEPLOY.md](DEPLOY.md)

---

## 📊 Data Dummy

Aplikasi dilengkapi data dummy realistis:

| Entity | Jumlah | Contoh |
|--------|--------|--------|
| Bahan Baku | 5 items | Kraft Liner, Lem Industri, Tinta Printing |
| Work in Progress | 3 batch | Kardus Besar, Sedang, Kecil |
| Barang Jadi | 4 produk | Berbagai ukuran kardus |
| Transaksi Stok | 8+ records | Barang masuk & keluar |
| Pesanan | 6 orders | PT Elektronik, CV Furniture, dll |
| Pengiriman | 3 deliveries | JNE, Sicepat, Grab |
| Data Penjualan | 7 bulan | Mei - November 2024 |

### Notifikasi ROP Aktif
- ✅ **Kraft Liner**: Stok 6 roll (ROP: 6) → Pesan 22 roll
- ✅ **Kawat Staples**: Stok 3 box (ROP: 4) → Pesan 15 box

---

## 🎓 Konsep SCM

### 1. Reorder Point (ROP)
**Formula**: `ROP = (Demand Rate × Lead Time) + Safety Stock`

**Contoh Kraft Liner**:
- Demand: 2 roll/hari
- Lead Time: 2 hari
- Safety Stock: 2 roll
- **ROP = (2 × 2) + 2 = 6 roll** ✅

### 2. Economic Order Quantity (EOQ)
Jumlah pemesanan optimal untuk minimalisasi total biaya persediaan.

**Contoh**: EOQ Kraft Liner = **22 roll**

### 3. Safety Stock
Cadangan untuk mengantisipasi variasi demand & delay supply.

**Contoh**: Safety Stock Kraft Liner = **2 roll**

### 4. Just-in-Time Notification
Notifikasi **sebelum** habis, bukan **setelah** habis.

**Impact**: 
- ❌ SCM Reaktif: Pesan saat stok = 0 → Produksi stop
- ✅ SCM Proaktif: Pesan saat stok = ROP → Produksi lancar

---

## 📁 Struktur Project

```
stokmanis/
├── src/
│   ├── components/
│   │   └── Layout.jsx          # Sidebar & navigation
│   ├── pages/
│   │   ├── Dashboard.jsx       # Dashboard utama
│   │   ├── Persediaan.jsx      # Modul persediaan
│   │   ├── Penjualan.jsx       # Modul penjualan
│   │   └── Notifikasi.jsx      # Sistem notifikasi ROP
│   ├── data/
│   │   └── dummyData.js        # Data dummy lengkap
│   ├── App.jsx                 # Router setup
│   └── main.jsx                # Entry point
├── public/                      # Static assets
├── dist/                        # Build output
├── DEPLOY.md                    # Deploy guide
├── FEATURES.md                  # Feature docs
├── QUICKSTART.md                # Quick start
├── SUMMARY.md                   # Project summary
└── README.md                    # This file
```

---

## 🎨 Screenshots

### Dashboard
![Dashboard Preview](https://via.placeholder.com/800x400/3b82f6/ffffff?text=Dashboard+dengan+Notifikasi+Stok+Kritis)

### Modul Persediaan
![Persediaan Preview](https://via.placeholder.com/800x400/22c55e/ffffff?text=Modul+Persediaan+-+Barang+Masuk+%26+Keluar)

### Notifikasi ROP
![Notifikasi Preview](https://via.placeholder.com/800x400/ef4444/ffffff?text=Notifikasi+ROP+Otomatis)

---

## 🧪 Testing

### Manual Testing Checklist

```bash
# 1. Test Dashboard
✅ Notifikasi stok kritis tampil
✅ KPI cards accurate
✅ Charts render correctly
✅ WIP table interactive

# 2. Test Persediaan
✅ Barang masuk: stok bertambah
✅ Ambil produksi: stok berkurang
✅ Settings: ROP update
✅ Transaksi tercatat

# 3. Test Penjualan
✅ Input pesanan: SO auto-generate
✅ Input pengiriman: SJ auto-generate
✅ Status tracking works
✅ Laporan akurat

# 4. Test Notifikasi
✅ ROP trigger correctly
✅ Mark as read works
✅ Delete works
✅ Empty state shows
```

### Build Test
```bash
npm run build
# ✅ Build successful in 7.55s
# ✅ No errors
# ✅ Output: 645 KB (190 KB gzipped)
```

---

## 📚 Dokumentasi

| File | Deskripsi | Size |
|------|-----------|------|
| [README.md](README.md) | Overview & setup | 12 KB |
| [FEATURES.md](FEATURES.md) | Dokumentasi fitur detail | 13 KB |
| [DEPLOY.md](DEPLOY.md) | Panduan deploy GitHub & Vercel | 7 KB |
| [QUICKSTART.md](QUICKSTART.md) | Quick start guide | 8 KB |
| [SUMMARY.md](SUMMARY.md) | Project summary & checklist | 15 KB |

**Total Documentation**: 55+ KB

---

## 🗺️ Roadmap

### v1.0 (Current) - MVP ✅
- [x] Dashboard dengan notifikasi
- [x] Modul Persediaan
- [x] Modul Penjualan
- [x] Notifikasi ROP
- [x] Data dummy lengkap
- [x] Responsive design

### v2.0 - Backend Integration
- [ ] REST API (Node.js + Express)
- [ ] Database (MongoDB/PostgreSQL)
- [ ] User authentication
- [ ] Real-time sync
- [ ] Export to Excel/PDF

### v3.0 - Advanced Features
- [ ] Multi-warehouse
- [ ] Forecasting algorithms
- [ ] Supplier portal
- [ ] Barcode scanning
- [ ] Email/SMS notifications
- [ ] Mobile app (React Native)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📝 Lisensi

MIT License - bebas digunakan untuk pembelajaran dan komersial.

---

## 👨‍💻 Developer

**Project**: Aplikasi SCM "Box Kuat"  
**Type**: UTS Supply Chain Management  
**Built with**: React + Vite + Tailwind CSS  
**Deployment**: Vercel  
**Date**: November 2025  

---

## 🙏 Acknowledgments

- [React Team](https://react.dev) - Amazing framework
- [Vite Team](https://vitejs.dev) - Lightning-fast tooling
- [Tailwind Labs](https://tailwindcss.com) - Beautiful styling
- [Recharts](https://recharts.org) - Powerful charts
- [Vercel](https://vercel.com) - Easy deployment

---

## 📞 Support

Butuh bantuan? Cek resources berikut:

- 📖 [React Documentation](https://react.dev)
- 📖 [Tailwind Documentation](https://tailwindcss.com/docs)
- 📖 [Vite Guide](https://vitejs.dev/guide)
- 💬 [Stack Overflow](https://stackoverflow.com/questions/tagged/reactjs)
- 💬 [React Community](https://react.dev/community)

---

## ⭐ Showcase

Jika Anda menggunakan StokManis untuk project/bisnis Anda, beritahu kami! We'd love to feature your implementation.

---

<div align="center">

**StokManis v1.0** - Dari SCM Reaktif ke Proaktif! 🚀

Made with ❤️ for UMKM Indonesia

[![GitHub stars](https://img.shields.io/github/stars/yourusername/stokmanis?style=social)](https://github.com/yourusername/stokmanis)
[![Twitter Follow](https://img.shields.io/twitter/follow/yourusername?style=social)](https://twitter.com/yourusername)

[⬆ Back to Top](#-stokmanis---sistem-manajemen-persediaan)

</div>
