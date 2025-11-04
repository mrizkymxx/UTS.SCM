// Data Dummy untuk Aplikasi StokManis

// Bahan Baku dengan ROP dan Safety Stock
export const bahanBaku = [
  {
    id: 1,
    nama: "Kraft Liner",
    satuan: "Roll",
    stokSaatIni: 6,
    safetyStock: 2,
    rop: 6,
    eoq: 22,
    leadTime: 2, // hari
    hargaSatuan: 250000,
    supplier: "PT Kertas Jaya"
  },
  {
    id: 2,
    nama: "Lem Industri",
    satuan: "Kg",
    stokSaatIni: 45,
    safetyStock: 5,
    rop: 15,
    eoq: 50,
    leadTime: 3,
    hargaSatuan: 35000,
    supplier: "CV Lem Kuat"
  },
  {
    id: 3,
    nama: "Tinta Printing",
    satuan: "Liter",
    stokSaatIni: 8,
    safetyStock: 3,
    rop: 10,
    eoq: 30,
    leadTime: 2,
    hargaSatuan: 125000,
    supplier: "Toko Tinta Prima"
  },
  {
    id: 4,
    nama: "Kawat Staples",
    satuan: "Box",
    stokSaatIni: 3,
    safetyStock: 1,
    rop: 4,
    eoq: 15,
    leadTime: 1,
    hargaSatuan: 45000,
    supplier: "UD Logam Jaya"
  },
  {
    id: 5,
    nama: "Plastik Wrapping",
    satuan: "Roll",
    stokSaatIni: 12,
    safetyStock: 4,
    rop: 12,
    eoq: 40,
    leadTime: 2,
    hargaSatuan: 85000,
    supplier: "PT Plastik Indo"
  }
];

// Work in Progress (WIP)
export const workInProgress = [
  {
    id: 1,
    nomorProduksi: "WIP-2024-001",
    produk: "Kardus Ukuran Besar (60x40x40)",
    jumlah: 150,
    statusProduksi: "Sedang Dicetak",
    tanggalMulai: "2024-11-01",
    estimasiSelesai: "2024-11-05",
    progress: 60
  },
  {
    id: 2,
    nomorProduksi: "WIP-2024-002",
    produk: "Kardus Ukuran Sedang (40x30x30)",
    jumlah: 300,
    statusProduksi: "Pemotongan",
    tanggalMulai: "2024-11-02",
    estimasiSelesai: "2024-11-06",
    progress: 35
  },
  {
    id: 3,
    nomorProduksi: "WIP-2024-003",
    produk: "Kardus Ukuran Kecil (30x20x20)",
    jumlah: 500,
    statusProduksi: "Quality Check",
    tanggalMulai: "2024-10-30",
    estimasiSelesai: "2024-11-04",
    progress: 85
  }
];

// Barang Jadi
export const barangJadi = [
  {
    id: 1,
    kodeProduk: "BJ-BESAR-001",
    namaProduk: "Kardus Ukuran Besar (60x40x40)",
    stok: 450,
    minStok: 100,
    satuan: "Pcs",
    hargaJual: 15000,
    lokasi: "Gudang A"
  },
  {
    id: 2,
    kodeProduk: "BJ-SEDANG-001",
    namaProduk: "Kardus Ukuran Sedang (40x30x30)",
    stok: 820,
    minStok: 200,
    satuan: "Pcs",
    hargaJual: 10000,
    lokasi: "Gudang A"
  },
  {
    id: 3,
    kodeProduk: "BJ-KECIL-001",
    namaProduk: "Kardus Ukuran Kecil (30x20x20)",
    stok: 1250,
    minStok: 300,
    satuan: "Pcs",
    hargaJual: 6000,
    lokasi: "Gudang B"
  },
  {
    id: 4,
    kodeProduk: "BJ-CUSTOM-001",
    namaProduk: "Kardus Custom Print (50x35x35)",
    stok: 280,
    minStok: 50,
    satuan: "Pcs",
    hargaJual: 18000,
    lokasi: "Gudang B"
  }
];

// Transaksi Bahan Baku (Barang Masuk & Keluar)
export const transaksiStok = [
  {
    id: 1,
    tanggal: "2024-11-01",
    jenis: "Masuk",
    bahanBakuId: 1,
    namaBahan: "Kraft Liner",
    jumlah: 22,
    satuan: "Roll",
    supplier: "PT Kertas Jaya",
    nomorPO: "PO-2024-101",
    keterangan: "Pembelian rutin"
  },
  {
    id: 2,
    tanggal: "2024-11-02",
    jenis: "Keluar",
    bahanBakuId: 1,
    namaBahan: "Kraft Liner",
    jumlah: 5,
    satuan: "Roll",
    nomorProduksi: "WIP-2024-001",
    keterangan: "Untuk produksi kardus besar"
  },
  {
    id: 3,
    tanggal: "2024-11-02",
    jenis: "Keluar",
    bahanBakuId: 2,
    namaBahan: "Lem Industri",
    jumlah: 8,
    satuan: "Kg",
    nomorProduksi: "WIP-2024-001",
    keterangan: "Untuk produksi kardus besar"
  },
  {
    id: 4,
    tanggal: "2024-10-30",
    jenis: "Masuk",
    bahanBakuId: 2,
    namaBahan: "Lem Industri",
    jumlah: 50,
    satuan: "Kg",
    supplier: "CV Lem Kuat",
    nomorPO: "PO-2024-098",
    keterangan: "Pembelian rutin"
  },
  {
    id: 5,
    tanggal: "2024-11-01",
    jenis: "Keluar",
    bahanBakuId: 3,
    namaBahan: "Tinta Printing",
    jumlah: 4,
    satuan: "Liter",
    nomorProduksi: "WIP-2024-002",
    keterangan: "Untuk printing kardus custom"
  },
  {
    id: 6,
    tanggal: "2024-10-29",
    jenis: "Masuk",
    bahanBakuId: 3,
    namaBahan: "Tinta Printing",
    jumlah: 30,
    satuan: "Liter",
    supplier: "Toko Tinta Prima",
    nomorPO: "PO-2024-097",
    keterangan: "Stok bulanan"
  },
  {
    id: 7,
    tanggal: "2024-11-03",
    jenis: "Keluar",
    bahanBakuId: 4,
    namaBahan: "Kawat Staples",
    jumlah: 2,
    satuan: "Box",
    nomorProduksi: "WIP-2024-003",
    keterangan: "Untuk finishing kardus"
  },
  {
    id: 8,
    tanggal: "2024-11-02",
    jenis: "Keluar",
    bahanBakuId: 5,
    namaBahan: "Plastik Wrapping",
    jumlah: 3,
    satuan: "Roll",
    nomorProduksi: "WIP-2024-001",
    keterangan: "Untuk packaging"
  }
];

// Pesanan Penjualan (Sales Order)
export const pesananPenjualan = [
  {
    id: 1,
    nomorSO: "SO-2024-201",
    tanggalPesan: "2024-10-28",
    namaPelanggan: "PT Elektronik Maju",
    produk: "Kardus Ukuran Besar (60x40x40)",
    jumlah: 200,
    hargaSatuan: 15000,
    totalHarga: 3000000,
    status: "Selesai",
    tanggalKirim: "2024-10-30"
  },
  {
    id: 2,
    nomorSO: "SO-2024-202",
    tanggalPesan: "2024-10-29",
    namaPelanggan: "CV Furniture Indah",
    produk: "Kardus Ukuran Sedang (40x30x30)",
    jumlah: 350,
    hargaSatuan: 10000,
    totalHarga: 3500000,
    status: "Selesai",
    tanggalKirim: "2024-10-31"
  },
  {
    id: 3,
    nomorSO: "SO-2024-203",
    tanggalPesan: "2024-11-01",
    namaPelanggan: "Toko Buku Cerdas",
    produk: "Kardus Ukuran Kecil (30x20x20)",
    jumlah: 500,
    hargaSatuan: 6000,
    totalHarga: 3000000,
    status: "Dalam Proses",
    tanggalKirim: "2024-11-05"
  },
  {
    id: 4,
    nomorSO: "SO-2024-204",
    tanggalPesan: "2024-11-02",
    namaPelanggan: "PT Fashion Trendy",
    produk: "Kardus Custom Print (50x35x35)",
    jumlah: 150,
    hargaSatuan: 18000,
    totalHarga: 2700000,
    status: "Pending",
    tanggalKirim: "2024-11-07"
  },
  {
    id: 5,
    nomorSO: "SO-2024-205",
    tanggalPesan: "2024-11-03",
    namaPelanggan: "UD Makanan Sehat",
    produk: "Kardus Ukuran Sedang (40x30x30)",
    jumlah: 250,
    hargaSatuan: 10000,
    totalHarga: 2500000,
    status: "Pending",
    tanggalKirim: "2024-11-08"
  },
  {
    id: 6,
    nomorSO: "SO-2024-206",
    tanggalPesan: "2024-10-25",
    namaPelanggan: "CV Kosmetik Natural",
    produk: "Kardus Ukuran Kecil (30x20x20)",
    jumlah: 400,
    hargaSatuan: 6000,
    totalHarga: 2400000,
    status: "Selesai",
    tanggalKirim: "2024-10-27"
  }
];

// Pengiriman Barang Jadi
export const pengirimanBarang = [
  {
    id: 1,
    nomorSO: "SO-2024-201",
    nomorSJ: "SJ-2024-301",
    tanggalKirim: "2024-10-30",
    namaPelanggan: "PT Elektronik Maju",
    produk: "Kardus Ukuran Besar (60x40x40)",
    jumlah: 200,
    ekspedisi: "JNE Cargo",
    nomorResi: "JNE123456789",
    statusKirim: "Terkirim"
  },
  {
    id: 2,
    nomorSO: "SO-2024-202",
    nomorSJ: "SJ-2024-302",
    tanggalKirim: "2024-10-31",
    namaPelanggan: "CV Furniture Indah",
    produk: "Kardus Ukuran Sedang (40x30x30)",
    jumlah: 350,
    ekspedisi: "Sicepat Cargo",
    nomorResi: "SCP987654321",
    statusKirim: "Terkirim"
  },
  {
    id: 3,
    nomorSO: "SO-2024-206",
    nomorSJ: "SJ-2024-303",
    tanggalKirim: "2024-10-27",
    namaPelanggan: "CV Kosmetik Natural",
    produk: "Kardus Ukuran Kecil (30x20x20)",
    jumlah: 400,
    ekspedisi: "Grab Express",
    nomorResi: "GRB456789123",
    statusKirim: "Terkirim"
  }
];

// Data Penjualan Bulanan untuk Chart
export const dataPenjualanBulanan = [
  { bulan: "Mei", penjualan: 18500000, target: 20000000 },
  { bulan: "Jun", penjualan: 22300000, target: 20000000 },
  { bulan: "Jul", penjualan: 19800000, target: 21000000 },
  { bulan: "Agu", penjualan: 25600000, target: 22000000 },
  { bulan: "Sep", penjualan: 23400000, target: 23000000 },
  { bulan: "Okt", penjualan: 27800000, target: 24000000 },
  { bulan: "Nov", penjualan: 11600000, target: 25000000 } // Data bulan berjalan
];

// Notifikasi ROP
export const notifikasiROP = bahanBaku
  .filter(bahan => bahan.stokSaatIni <= bahan.rop)
  .map(bahan => ({
    id: bahan.id,
    tipe: "ROP_ALERT",
    tanggal: new Date().toISOString().split('T')[0],
    judul: `Stok ${bahan.nama} Mencapai ROP`,
    pesan: `PERHATIAN: Stok ${bahan.nama} telah mencapai Titik Pemesanan Ulang (${bahan.rop} ${bahan.satuan}). Sisa stok saat ini: ${bahan.stokSaatIni} ${bahan.satuan}. Segera pesan ${bahan.eoq} ${bahan.satuan} ke ${bahan.supplier}.`,
    prioritas: "Tinggi",
    dibaca: false,
    aksi: `Pesan ${bahan.eoq} ${bahan.satuan}`,
    bahanBakuId: bahan.id
  }));

// Supplier Data
export const supplierData = [
  {
    id: 1,
    nama: "PT Kertas Jaya",
    kontak: "021-5551234",
    email: "order@kertasjaya.com",
    alamat: "Jakarta Timur",
    rating: 4.5,
    leadTimeRataRata: 2
  },
  {
    id: 2,
    nama: "CV Lem Kuat",
    kontak: "021-5555678",
    email: "sales@lemkuat.com",
    alamat: "Tangerang",
    rating: 4.2,
    leadTimeRataRata: 3
  },
  {
    id: 3,
    nama: "Toko Tinta Prima",
    kontak: "021-5558888",
    email: "info@tintaprima.com",
    alamat: "Bekasi",
    rating: 4.0,
    leadTimeRataRata: 2
  },
  {
    id: 4,
    nama: "UD Logam Jaya",
    kontak: "021-5552345",
    email: "order@logamjaya.com",
    alamat: "Jakarta Barat",
    rating: 4.3,
    leadTimeRataRata: 1
  },
  {
    id: 5,
    nama: "PT Plastik Indo",
    kontak: "021-5559999",
    email: "sales@plastikindo.com",
    alamat: "Bogor",
    rating: 4.4,
    leadTimeRataRata: 2
  }
];

export default {
  bahanBaku,
  workInProgress,
  barangJadi,
  transaksiStok,
  pesananPenjualan,
  pengirimanBarang,
  dataPenjualanBulanan,
  notifikasiROP,
  supplierData
};
