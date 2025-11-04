# ⚡ Quick Start Guide - StokManis

## 🎯 Untuk yang Baru Pertama Kali

### Langkah 1: Pastikan Prerequisites Terpenuhi

Cek apakah sudah terinstall:

```powershell
# Cek Node.js (harus v16+)
node --version

# Cek npm
npm --version

# Cek Git
git --version
```

Jika belum terinstall:
- **Node.js**: Download dari [nodejs.org](https://nodejs.org) (pilih LTS)
- **Git**: Download dari [git-scm.com](https://git-scm.com)

---

### Langkah 2: Jalankan Aplikasi

```powershell
# Masuk ke folder project
cd "d:\Kuliah\UTS SCM\Aplikasi SCM\stokmanis"

# Jalankan development server
npm run dev
```

Tunggu sampai muncul:
```
VITE v7.x.x  ready in XXX ms
➜  Local:   http://localhost:5173/
```

Buka browser dan akses: **http://localhost:5173**

---

### Langkah 3: Test Fitur Aplikasi

#### ✅ Checklist Testing:

**Dashboard:**
- [ ] Lihat notifikasi stok kritis (Kraft Liner & Kawat Staples)
- [ ] Check KPI cards (4 cards)
- [ ] Lihat grafik penjualan (line chart)
- [ ] Lihat grafik stok bahan baku (bar chart)
- [ ] Check tabel WIP

**Modul Persediaan:**
- [ ] Klik "Barang Masuk"
  - Pilih bahan: Kraft Liner
  - Jumlah: 22
  - Klik Simpan
  - ✅ Stok bertambah, notifikasi hilang
- [ ] Klik "Ambil untuk Produksi"
  - Pilih bahan: Lem Industri
  - Jumlah: 5
  - Klik Simpan
  - ✅ Stok berkurang
- [ ] Klik tombol "Atur" pada Tinta Printing
  - Ubah Safety Stock: 5
  - Ubah ROP: 15
  - Klik Simpan
  - ✅ Settings ter-update

**Modul Penjualan:**
- [ ] Tab "Pesanan Penjualan"
  - Klik "Input Pesanan"
  - Isi form lengkap
  - Klik Simpan
  - ✅ Pesanan baru muncul di tabel
- [ ] Tab "Pengiriman"
  - Klik "Input Pengiriman"
  - Pilih SO yang pending
  - Isi ekspedisi & resi
  - Klik Simpan
  - ✅ Pengiriman tercatat
- [ ] Tab "Laporan"
  - ✅ Lihat KPI summary
  - ✅ Lihat laporan detail

**Notifikasi ROP:**
- [ ] Lihat daftar notifikasi (2 item di data dummy)
- [ ] Klik "Tandai Sudah Dibaca" pada satu notifikasi
  - ✅ Badge BARU hilang
  - ✅ Warna border berubah
- [ ] Klik tombol hapus
  - ✅ Notifikasi terhapus
- [ ] Klik "Tandai Semua Dibaca"
  - ✅ Semua notifikasi ter-mark

---

### Langkah 4: Build untuk Production

```powershell
# Build aplikasi
npm run build

# Preview hasil build
npm run preview
```

Hasil build akan ada di folder `dist/`

---

## 🚀 Deploy ke Internet

### Opsi 1: Deploy ke Vercel (Recommended)

**Paling mudah, gratis, dan cepat!**

1. **Setup Git & Push ke GitHub**

```powershell
# Initialize git (jika belum)
git init

# Add semua file
git add .

# Commit
git commit -m "Initial commit - StokManis MVP"

# Buat repository di GitHub (via browser)
# Lalu connect:
git remote add origin https://github.com/USERNAME-ANDA/stokmanis.git
git branch -M main
git push -u origin main
```

2. **Deploy via Vercel Dashboard**

- Login ke [vercel.com](https://vercel.com) dengan GitHub
- Klik **Add New** > **Project**
- Import repository `stokmanis`
- Klik **Deploy**
- Tunggu 1-2 menit
- **DONE!** ✅ Aplikasi live di `https://stokmanis.vercel.app`

📖 **Panduan detail**: Lihat file `DEPLOY.md`

---

### Opsi 2: Deploy ke Netlify

```powershell
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

---

## 📝 Catatan Penting

### Data Dummy
Aplikasi sudah dilengkapi data dummy:
- 5 Bahan Baku
- 3 Work in Progress
- 4 Barang Jadi
- 6 Pesanan
- Dan lainnya...

### Persistence
⚠️ **Data tidak persisten!** 
- Data akan reset setiap reload page
- Ini adalah MVP (Minimum Viable Product)
- Untuk production, perlu backend + database

### Browser Support
- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Edge
- ✅ Safari
- ⚠️ IE11 (tidak support)

---

## 🐛 Troubleshooting

### Port 5173 sudah digunakan
```powershell
# Gunakan port lain
npx vite --port 3000
```

### Error saat npm install
```powershell
# Clear cache
npm cache clean --force

# Hapus node_modules dan install ulang
Remove-Item -Recurse -Force node_modules
npm install
```

### Styling tidak muncul
- Pastikan Tailwind CSS terinstall
- Check file `tailwind.config.js` dan `postcss.config.js`
- Restart dev server

### Grafik tidak muncul
- Check console browser (F12)
- Pastikan Recharts terinstall
- Reload page

---

## 📚 Dokumentasi Lengkap

- **README.md**: Overview & instalasi
- **FEATURES.md**: Dokumentasi fitur detail
- **DEPLOY.md**: Panduan deploy lengkap
- **QUICKSTART.md**: File ini

---

## 💡 Tips Pengembangan

### Hot Module Replacement (HMR)
Setiap kali save file, browser auto-reload. Tidak perlu refresh manual!

### DevTools
```
F12 atau Ctrl+Shift+I
```
- **Console**: Lihat error/log
- **Network**: Monitor API calls
- **Components**: Inspect React components (install React DevTools)

### Keyboard Shortcuts (Vite)
- `r` + Enter: Restart server
- `q` + Enter: Quit server
- `h` + Enter: Show help

---

## 🎓 Belajar Lebih Lanjut

### React
- [React Documentation](https://react.dev)
- [React Tutorial](https://react.dev/learn)

### Tailwind CSS
- [Tailwind Docs](https://tailwindcss.com/docs)
- [Tailwind UI](https://tailwindui.com)

### Vite
- [Vite Guide](https://vitejs.dev/guide)
- [Vite Config](https://vitejs.dev/config)

### Supply Chain Management
- Konsep ROP, EOQ, Safety Stock
- Just-in-Time Inventory
- Demand Forecasting

---

## ❓ FAQ

**Q: Apakah bisa pakai database?**
A: Ya! Bisa integrasi dengan:
- Firebase (realtime)
- Supabase (PostgreSQL)
- MongoDB Atlas
- Backend sendiri (Node.js + Express)

**Q: Apakah bisa export data?**
A: Untuk MVP belum ada. Bisa ditambahkan:
- Export to Excel (library: xlsx)
- Export to PDF (library: jspdf)
- Export to CSV

**Q: Apakah bisa multi-user?**
A: Untuk MVP single user. Untuk multi-user perlu:
- Authentication (Firebase Auth, Auth0)
- User roles & permissions
- Backend API

**Q: Apakah ada mobile app?**
A: Web responsive sudah ada. Untuk native app:
- React Native
- Flutter
- Progressive Web App (PWA)

---

## 🎉 Selamat Belajar!

Jika ada pertanyaan, jangan ragu untuk:
- Baca dokumentasi
- Cek stack overflow
- Tanya di komunitas React Indonesia

**Happy Coding! 💻**

---

**StokManis v1.0** - Solusi SCM untuk UMKM 📦
