# 📚 Dokumentasi Fitur StokManis

## Daftar Isi
1. [Dashboard](#dashboard)
2. [Modul Persediaan](#modul-persediaan)
3. [Modul Penjualan](#modul-penjualan)
4. [Notifikasi ROP](#notifikasi-rop)

---

## 📊 Dashboard

### Fitur Utama:

#### 1. Notifikasi Stok Kritis
- **Lokasi**: Bagian atas dashboard
- **Warna**: Merah (background red-50, border red-500)
- **Trigger**: Muncul otomatis saat stok bahan baku ≤ ROP
- **Informasi yang ditampilkan**:
  - Nama bahan baku
  - Sisa stok saat ini
  - ROP (Reorder Point)
  - Jumlah yang harus dipesan (EOQ)
  - Nama supplier
- **Aksi**: Tombol dismiss untuk menandai sudah dibaca

#### 2. KPI Cards (4 Cards)

**Card 1: Stok Bahan Baku**
- Icon: Package (biru)
- Menampilkan: Total unit semua bahan baku
- Jumlah item bahan baku

**Card 2: Work in Progress**
- Icon: TrendingUp (kuning)
- Menampilkan: Total unit WIP
- Jumlah batch produksi

**Card 3: Barang Jadi**
- Icon: ShoppingCart (hijau)
- Menampilkan: Total unit barang jadi
- Jumlah produk

**Card 4: Penjualan Bulan Ini**
- Icon: Bell (ungu)
- Menampilkan: Total penjualan rupiah
- Target penjualan

#### 3. Grafik Trend Penjualan
- **Tipe**: Line Chart
- **Data**: 6 bulan terakhir
- **Sumbu X**: Bulan (Mei - Nov)
- **Sumbu Y**: Rupiah
- **Line 1**: Penjualan Aktual (ungu)
- **Line 2**: Target (hijau, dashed)
- **Tooltip**: Format rupiah Indonesia

#### 4. Grafik Stok Bahan Baku
- **Tipe**: Bar Chart
- **Sumbu X**: Nama bahan baku
- **Sumbu Y**: Jumlah unit
- **Bar 1**: Stok Saat Ini (biru)
- **Bar 2**: ROP (merah)
- **Bar 3**: Safety Stock (kuning)

#### 5. Tabel Work in Progress
- Nomor Produksi
- Nama Produk
- Jumlah
- Status (badge kuning)
- Progress Bar (0-100%)
- Estimasi Selesai

---

## 📦 Modul Persediaan

### Fitur:

#### 1. Tombol Aksi (Header)
- **Barang Masuk** (hijau): Pencatatan penerimaan dari supplier
- **Ambil untuk Produksi** (biru): Pencatatan penggunaan bahan baku

#### 2. Tabel Stok Bahan Baku

**Kolom:**
- Bahan Baku (dengan icon & lead time)
- Stok Saat Ini (bold)
- Safety Stock
- ROP
- EOQ
- Status (badge):
  - 🔴 Kritis: Stok ≤ Safety Stock
  - 🟠 Pesan Ulang: Stok ≤ ROP
  - 🟢 Aman: Stok > ROP
- Supplier
- Tombol Atur (biru)

#### 3. Modal Barang Masuk

**Input:**
- Dropdown Bahan Baku (required)
- Jumlah (number, min=1, required)
- Nomor PO (text, optional)
- Keterangan (textarea, optional)

**Aksi:**
- Simpan: Tambah stok, buat transaksi baru
- Batal: Tutup modal

#### 4. Modal Ambil untuk Produksi

**Input:**
- Dropdown Bahan Baku (required)
- Jumlah (number, min=1, required)
- Nomor Produksi (text, optional)
- Keterangan (textarea, optional)

**Aksi:**
- Simpan: Kurangi stok, buat transaksi baru
- Batal: Tutup modal

#### 5. Modal Pengaturan Stok

**Input:**
- Safety Stock (number, required)
- ROP - Reorder Point (number, required)
- EOQ - Economic Order Quantity (number, required)
- Lead Time dalam hari (number, required)

**Aksi:**
- Simpan: Update parameter stok
- Batal: Tutup modal

#### 6. Tabel Riwayat Transaksi

**Kolom:**
- Tanggal
- Jenis (badge):
  - 🟢 Masuk (dengan icon TrendingUp)
  - 🔵 Keluar (dengan icon TrendingDown)
- Bahan Baku
- Jumlah
- Supplier/Nomor Produksi
- Keterangan

**Tampilan**: 10 transaksi terbaru

---

## 🛒 Modul Penjualan

### Tabs:

#### Tab 1: Pesanan Penjualan

**Tombol:**
- Input Pesanan (hijau)
- Input Pengiriman (biru)

**Tabel Pesanan:**
- No. SO
- Tanggal Pesan
- Nama Pelanggan
- Produk
- Jumlah (Pcs)
- Total Harga (format rupiah)
- Status (badge):
  - 🟢 Selesai
  - 🔵 Dalam Proses
  - 🟡 Pending
- Tanggal Kirim

#### Tab 2: Pengiriman

**Tabel Pengiriman:**
- No. SJ (Surat Jalan)
- No. SO
- Tanggal Kirim
- Pelanggan
- Produk
- Jumlah
- Ekspedisi
- No. Resi
- Status (badge)

#### Tab 3: Laporan

**KPI Cards (4):**
1. Total Penjualan (hijau) - Format rupiah
2. Pesanan Selesai (biru) - Jumlah
3. Pesanan Pending (kuning) - Jumlah
4. Total Pengiriman (ungu) - Jumlah

**Laporan Detail:**
- Card untuk setiap pesanan (5 terbaru)
- Menampilkan: No. SO, Pelanggan, Produk, Total, Breakdown harga

#### Modal Input Pesanan

**Input:**
- Nama Pelanggan (text, required)
- Produk (dropdown dari barang jadi, required)
- Jumlah (number, min=1, required)
- Harga Satuan (auto-fill dari barang jadi, editable)
- Tanggal Kirim (date, required)

**Auto-calculate:**
- Total Harga = Jumlah × Harga Satuan
- Auto-generate: Nomor SO (SO-2024-XXX)

#### Modal Input Pengiriman

**Input:**
- Nomor SO (dropdown, filter: status ≠ Selesai, required)
- Ekspedisi (dropdown):
  - JNE Cargo
  - Sicepat Cargo
  - J&T Cargo
  - Grab Express
  - Lalamove
- Nomor Resi (text, required)

**Auto-fill:**
- Data pelanggan & produk dari SO terpilih
- Auto-generate: Nomor SJ (SJ-2024-XXX)

---

## 🔔 Notifikasi ROP

### Fitur:

#### 1. Header
- Judul: "Notifikasi ROP"
- Counter notifikasi belum dibaca (merah)
- Tombol "Tandai Semua Dibaca" (biru)

#### 2. Info Box
- Penjelasan sistem notifikasi otomatis
- Icon Bell (biru)
- Tips penggunaan

#### 3. Card Notifikasi

**Status Badge:**
- 🔴 BARU: Untuk notifikasi belum dibaca
- Border merah untuk belum dibaca
- Border abu-abu untuk sudah dibaca

**Informasi dalam Card:**
1. **Judul**: Nama bahan baku yang mencapai ROP
2. **Pesan**: Deskripsi lengkap kondisi stok
3. **Detail Stok** (grid 4 kolom):
   - Stok Saat Ini (merah)
   - ROP (orange)
   - EOQ/Pesan (hijau)
   - Lead Time (biru)
4. **Info Pemesanan** (box kuning):
   - Nama Supplier
   - Estimasi Total Biaya

**Tombol Aksi:**
- ✅ Tandai Dibaca (biru)
- 🗑️ Hapus (merah)

#### 4. Empty State
- Icon Bell besar (abu-abu)
- Text: "Tidak Ada Notifikasi"
- Subtext: "Semua stok bahan baku dalam kondisi aman"

#### 5. Info Footer
- Cara kerja sistem ROP
- Penjelasan istilah:
  - ROP (Reorder Point)
  - EOQ (Economic Order Quantity)
  - Safety Stock

---

## 🎨 Design System

### Color Palette:
- **Primary Blue**: #3b82f6 (buttons, links)
- **Success Green**: #22c55e (completed, safe)
- **Warning Yellow**: #f59e0b (pending, caution)
- **Danger Red**: #ef4444 (critical, alerts)
- **Purple**: #8b5cf6 (charts, accents)
- **Gray**: #6b7280 (text, borders)

### Typography:
- **Headings**: font-bold text-gray-800
- **Body**: text-gray-700
- **Small**: text-sm text-gray-600
- **Extra Small**: text-xs text-gray-500

### Spacing:
- Section padding: p-6
- Card padding: p-4 atau p-6
- Gap between elements: gap-3, gap-4, gap-6
- Margins: mb-4, mb-6, mb-8

### Shadows:
- Cards: shadow-md
- Hover: hover:shadow-lg
- Large elements: shadow-lg

### Border Radius:
- Buttons: rounded-lg (8px)
- Cards: rounded-lg (8px)
- Badges: rounded-full
- Inputs: rounded-md (6px)

---

## 🔧 State Management

### Local State (useState):
- Form inputs
- Modal visibility
- Active tabs
- Notifications array

### Data Flow:
1. Import dari `dummyData.js`
2. Initialize dengan `useState`
3. Update via form handlers
4. Re-render otomatis

### Data Persistence:
Saat ini: Session only (hilang saat reload)
Future: LocalStorage atau Backend API

---

## 📱 Responsive Design

### Breakpoints (Tailwind):
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Mobile Adaptations:
- Hamburger menu untuk sidebar
- Stack layout untuk cards (grid-cols-1)
- Horizontal scroll untuk tabel
- Full-width modals (max-w-md, mx-4)

### Desktop Features:
- Fixed sidebar (w-64)
- Multi-column layouts
- Larger charts
- Side-by-side modals

---

## 🚀 Performance Tips

1. **React.memo** untuk komponen berat
2. **useMemo** untuk kalkulasi kompleks
3. **Lazy loading** untuk routes
4. **Code splitting** untuk chunks kecil
5. **Optimize images** (gunakan WebP)

---

## 🐛 Known Limitations (MVP)

1. Data tidak persisten (hilang saat reload)
2. Tidak ada autentikasi/user management
3. Tidak ada backup/export data
4. Notifikasi hanya di aplikasi (tidak push notification real)
5. Single user (tidak multi-tenant)

### Planned Features (v2.0):
- [ ] Backend API (Node.js/Express)
- [ ] Database (MongoDB/PostgreSQL)
- [ ] User authentication
- [ ] Real push notifications
- [ ] Export to Excel/PDF
- [ ] Multi-warehouse support
- [ ] Supplier portal
- [ ] Mobile app (React Native)

---

**Dokumentasi dibuat untuk StokManis v1.0** 📦
