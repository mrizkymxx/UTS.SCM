# 🚀 Panduan Deploy StokManis

## Panduan Deploy ke GitHub & Vercel

### 📋 Prasyarat
- Akun GitHub ([daftar di sini](https://github.com/signup))
- Akun Vercel ([daftar di sini](https://vercel.com/signup))
- Git terinstall di komputer

---

## 🔧 Langkah 1: Setup Git Repository Lokal

1. Buka terminal di folder project `stokmanis`

2. Inisialisasi Git (jika belum):
```bash
git init
```

3. Add semua file:
```bash
git add .
```

4. Commit pertama:
```bash
git commit -m "Initial commit - StokManis MVP"
```

---

## 📤 Langkah 2: Push ke GitHub

### A. Buat Repository di GitHub

1. Login ke GitHub
2. Klik tombol **New** atau **+** > **New repository**
3. Isi form:
   - **Repository name**: `stokmanis` 
   - **Description**: `Aplikasi SCM untuk UMKM - Sistem Manajemen Persediaan`
   - **Visibility**: Public (untuk deploy gratis di Vercel)
   - **Jangan** centang "Initialize with README"
4. Klik **Create repository**

### B. Push Code

Setelah repository dibuat, GitHub akan menampilkan instruksi. Jalankan:

```bash
git remote add origin https://github.com/USERNAME-ANDA/stokmanis.git
git branch -M main
git push -u origin main
```

Ganti `USERNAME-ANDA` dengan username GitHub Anda.

**Contoh:**
```bash
git remote add origin https://github.com/johndoe/stokmanis.git
git branch -M main
git push -u origin main
```

---

## 🌐 Langkah 3: Deploy ke Vercel

### Metode 1: Deploy via Dashboard Vercel (Termudah)

1. **Login ke Vercel**
   - Kunjungi [vercel.com](https://vercel.com)
   - Login dengan GitHub account

2. **Import Project**
   - Klik **Add New** > **Project**
   - Pilih **Import Git Repository**
   - Authorize Vercel untuk akses GitHub
   - Pilih repository `stokmanis`

3. **Configure Project**
   
   Vercel akan otomatis mendeteksi Vite. Pastikan setting berikut:
   
   - **Framework Preset**: `Vite`
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `dist` (default)
   - **Install Command**: `npm install` (default)

4. **Deploy!**
   - Klik tombol **Deploy**
   - Tunggu 1-2 menit
   - Aplikasi Anda akan live di URL seperti: `https://stokmanis.vercel.app`

### Metode 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Login**
```bash
vercel login
```

3. **Deploy**
```bash
cd d:\Kuliah\UTS SCM\Aplikasi SCM\stokmanis
vercel
```

Ikuti prompt:
- Set up and deploy? **Y**
- Which scope? (pilih account Anda)
- Link to existing project? **N**
- Project name? **stokmanis**
- Directory? **./** (tekan Enter)
- Want to override settings? **N**

4. **Deploy ke Production**
```bash
vercel --prod
```

---

## ✅ Verifikasi Deployment

Setelah deploy berhasil, Anda akan mendapat URL seperti:
- **Preview**: `https://stokmanis-xxx.vercel.app`
- **Production**: `https://stokmanis.vercel.app`

### Test Fitur Aplikasi:

1. ✅ Dashboard menampilkan notifikasi stok kritis
2. ✅ Modul Persediaan: tambah barang masuk/keluar
3. ✅ Modul Penjualan: input pesanan & pengiriman
4. ✅ Notifikasi ROP muncul untuk stok rendah
5. ✅ Grafik penjualan ter-render dengan benar

---

## 🔄 Update Aplikasi (Setelah Deploy)

Setiap kali ada perubahan code:

```bash
# 1. Add & commit changes
git add .
git commit -m "Deskripsi perubahan"

# 2. Push ke GitHub
git push origin main

# 3. Vercel akan otomatis re-deploy!
```

Vercel akan otomatis build & deploy setiap push ke branch `main`.

---

## 🎨 Custom Domain (Opsional)

Jika ingin menggunakan domain sendiri:

1. Beli domain (dari Namecheap, GoDaddy, dll)
2. Di Vercel Dashboard > Project > Settings > Domains
3. Tambah domain Anda
4. Update DNS records sesuai instruksi Vercel

---

## 🐛 Troubleshooting

### Error: "Build failed"
- Cek di Vercel Dashboard > Deployments > View Logs
- Pastikan semua dependencies ada di `package.json`

### Error: "Page not found (404)" saat routing
- Pastikan file `vercel.json` sudah ada dengan konfigurasi rewrites

### Aplikasi lambat loading
- Buka DevTools > Network
- Check ukuran bundle di Production Build

### Styling tidak muncul
- Pastikan Tailwind config benar
- Check `index.css` sudah import Tailwind directives

---

## 📱 Bonus: Environment Variables (Jika Diperlukan)

Jika nanti menggunakan API atau database:

1. Di Vercel Dashboard > Project > Settings > Environment Variables
2. Tambahkan variable (contoh: `VITE_API_URL`)
3. Re-deploy

Di code:
```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```

---

## 🎉 Selamat!

Aplikasi StokManis Anda sudah live dan bisa diakses dari mana saja!

**Share link Anda:**
- GitHub Repo: `https://github.com/USERNAME/stokmanis`
- Live Demo: `https://stokmanis.vercel.app`

---

## 📞 Support

Jika ada pertanyaan atau issue:
- Buat Issue di GitHub repository
- Check Vercel Documentation: [vercel.com/docs](https://vercel.com/docs)
- Vite Documentation: [vitejs.dev](https://vitejs.dev)

**Happy Deploying! 🚀**
