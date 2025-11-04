import React, { useState } from 'react';
import { ShoppingCart, Truck, FileText, Plus, DollarSign, Calendar, User } from 'lucide-react';
import { pesananPenjualan, pengirimanBarang, barangJadi } from '../data/dummyData';

const Penjualan = () => {
  const [pesanan, setPesanan] = useState(pesananPenjualan);
  const [pengiriman, setPengiriman] = useState(pengirimanBarang);
  const [showPesananModal, setShowPesananModal] = useState(false);
  const [showPengirimanModal, setShowPengirimanModal] = useState(false);
  const [activeTab, setActiveTab] = useState('pesanan'); // pesanan, pengiriman, laporan

  const [pesananForm, setPesananForm] = useState({
    namaPelanggan: '',
    produk: '',
    jumlah: '',
    hargaSatuan: '',
    tanggalKirim: ''
  });

  const [pengirimanForm, setPengirimanForm] = useState({
    nomorSO: '',
    ekspedisi: '',
    nomorResi: ''
  });

  const handleSubmitPesanan = (e) => {
    e.preventDefault();
    
    const pesananBaru = {
      id: pesanan.length + 1,
      nomorSO: `SO-2024-${(pesanan.length + 200).toString().padStart(3, '0')}`,
      tanggalPesan: new Date().toISOString().split('T')[0],
      namaPelanggan: pesananForm.namaPelanggan,
      produk: pesananForm.produk,
      jumlah: parseInt(pesananForm.jumlah),
      hargaSatuan: parseInt(pesananForm.hargaSatuan),
      totalHarga: parseInt(pesananForm.jumlah) * parseInt(pesananForm.hargaSatuan),
      status: 'Pending',
      tanggalKirim: pesananForm.tanggalKirim
    };

    setPesanan([pesananBaru, ...pesanan]);
    setShowPesananModal(false);
    setPesananForm({
      namaPelanggan: '',
      produk: '',
      jumlah: '',
      hargaSatuan: '',
      tanggalKirim: ''
    });
  };

  const handleSubmitPengiriman = (e) => {
    e.preventDefault();
    
    const pesananTerkait = pesanan.find(p => p.nomorSO === pengirimanForm.nomorSO);
    if (!pesananTerkait) return;

    const pengirimanBaru = {
      id: pengiriman.length + 1,
      nomorSO: pengirimanForm.nomorSO,
      nomorSJ: `SJ-2024-${(pengiriman.length + 300).toString().padStart(3, '0')}`,
      tanggalKirim: new Date().toISOString().split('T')[0],
      namaPelanggan: pesananTerkait.namaPelanggan,
      produk: pesananTerkait.produk,
      jumlah: pesananTerkait.jumlah,
      ekspedisi: pengirimanForm.ekspedisi,
      nomorResi: pengirimanForm.nomorResi,
      statusKirim: 'Dalam Perjalanan'
    };

    // Update status pesanan
    const updatedPesanan = pesanan.map(p => {
      if (p.nomorSO === pengirimanForm.nomorSO) {
        return { ...p, status: 'Dalam Proses' };
      }
      return p;
    });

    setPengiriman([pengirimanBaru, ...pengiriman]);
    setPesanan(updatedPesanan);
    setShowPengirimanModal(false);
    setPengirimanForm({
      nomorSO: '',
      ekspedisi: '',
      nomorResi: ''
    });
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Selesai':
      case 'Terkirim':
        return 'bg-green-100 text-green-800';
      case 'Dalam Proses':
      case 'Dalam Perjalanan':
        return 'bg-blue-100 text-blue-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Hitung statistik untuk laporan
  const totalPenjualan = pesanan.reduce((sum, p) => sum + p.totalHarga, 0);
  const pesananSelesai = pesanan.filter(p => p.status === 'Selesai').length;
  const pesananPending = pesanan.filter(p => p.status === 'Pending').length;
  const totalPengiriman = pengiriman.length;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Modul Penjualan</h1>
            <p className="text-gray-600 mt-2">Kelola pesanan dan pengiriman</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => setShowPesananModal(true)}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 shadow-md transition"
            >
              <Plus size={20} />
              Input Pesanan
            </button>
            <button 
              onClick={() => setShowPengirimanModal(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 shadow-md transition"
            >
              <Truck size={20} />
              Input Pengiriman
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('pesanan')}
              className={`px-4 py-2 font-medium transition ${
                activeTab === 'pesanan'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <ShoppingCart className="inline mr-2" size={18} />
              Pesanan Penjualan
            </button>
            <button
              onClick={() => setActiveTab('pengiriman')}
              className={`px-4 py-2 font-medium transition ${
                activeTab === 'pengiriman'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Truck className="inline mr-2" size={18} />
              Pengiriman
            </button>
            <button
              onClick={() => setActiveTab('laporan')}
              className={`px-4 py-2 font-medium transition ${
                activeTab === 'laporan'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <FileText className="inline mr-2" size={18} />
              Laporan
            </button>
          </div>
        </div>

        {/* Tab Content - Pesanan */}
        {activeTab === 'pesanan' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Daftar Pesanan Penjualan</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No. SO</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pelanggan</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produk</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jumlah</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Harga</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Kirim</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {pesanan.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.nomorSO}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.tanggalPesan}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{item.namaPelanggan}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{item.produk}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.jumlah} Pcs</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(item.totalHarga)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.tanggalKirim}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab Content - Pengiriman */}
        {activeTab === 'pengiriman' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Daftar Pengiriman</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No. SJ</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No. SO</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Kirim</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pelanggan</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produk</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jumlah</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ekspedisi</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No. Resi</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {pengiriman.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.nomorSJ}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.nomorSO}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.tanggalKirim}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{item.namaPelanggan}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{item.produk}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.jumlah} Pcs</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.ekspedisi}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.nomorResi}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(item.statusKirim)}`}>
                          {item.statusKirim}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab Content - Laporan */}
        {activeTab === 'laporan' && (
          <div>
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Total Penjualan</p>
                    <h3 className="text-2xl font-bold text-gray-800 mt-1">
                      {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(totalPenjualan)}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">{pesanan.length} Pesanan</p>
                  </div>
                  <DollarSign className="text-green-500" size={40} />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Pesanan Selesai</p>
                    <h3 className="text-2xl font-bold text-gray-800 mt-1">{pesananSelesai}</h3>
                    <p className="text-xs text-gray-500 mt-1">Pesanan</p>
                  </div>
                  <ShoppingCart className="text-blue-500" size={40} />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Pesanan Pending</p>
                    <h3 className="text-2xl font-bold text-gray-800 mt-1">{pesananPending}</h3>
                    <p className="text-xs text-gray-500 mt-1">Menunggu Proses</p>
                  </div>
                  <Calendar className="text-yellow-500" size={40} />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Total Pengiriman</p>
                    <h3 className="text-2xl font-bold text-gray-800 mt-1">{totalPengiriman}</h3>
                    <p className="text-xs text-gray-500 mt-1">Paket</p>
                  </div>
                  <Truck className="text-purple-500" size={40} />
                </div>
              </div>
            </div>

            {/* Laporan Detail */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Laporan Penjualan Detail</h2>
              <div className="space-y-4">
                {pesanan.slice(0, 5).map((item) => (
                  <div key={item.id} className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-gray-800">{item.nomorSO} - {item.namaPelanggan}</h3>
                        <p className="text-sm text-gray-600 mt-1">{item.produk}</p>
                        <p className="text-xs text-gray-500 mt-1">Tanggal: {item.tanggalPesan}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg text-gray-800">
                          {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(item.totalHarga)}
                        </p>
                        <p className="text-sm text-gray-600">{item.jumlah} Pcs x {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(item.hargaSatuan)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Modal Input Pesanan */}
        {showPesananModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Input Pesanan Baru</h2>
              <form onSubmit={handleSubmitPesanan}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nama Pelanggan</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={pesananForm.namaPelanggan}
                    onChange={(e) => setPesananForm({...pesananForm, namaPelanggan: e.target.value})}
                    required
                    placeholder="PT Elektronik Maju"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Produk</label>
                  <select 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={pesananForm.produk}
                    onChange={(e) => {
                      const selectedProduk = barangJadi.find(b => b.namaProduk === e.target.value);
                      setPesananForm({
                        ...pesananForm, 
                        produk: e.target.value,
                        hargaSatuan: selectedProduk ? selectedProduk.hargaJual : ''
                      });
                    }}
                    required
                  >
                    <option value="">Pilih Produk</option>
                    {barangJadi.map(item => (
                      <option key={item.id} value={item.namaProduk}>{item.namaProduk}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Jumlah</label>
                  <input 
                    type="number" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={pesananForm.jumlah}
                    onChange={(e) => setPesananForm({...pesananForm, jumlah: e.target.value})}
                    required
                    min="1"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Harga Satuan</label>
                  <input 
                    type="number" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={pesananForm.hargaSatuan}
                    onChange={(e) => setPesananForm({...pesananForm, hargaSatuan: e.target.value})}
                    required
                    min="0"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal Kirim</label>
                  <input 
                    type="date" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={pesananForm.tanggalKirim}
                    onChange={(e) => setPesananForm({...pesananForm, tanggalKirim: e.target.value})}
                    required
                  />
                </div>
                <div className="flex gap-3">
                  <button 
                    type="submit"
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition"
                  >
                    Simpan Pesanan
                  </button>
                  <button 
                    type="button"
                    onClick={() => setShowPesananModal(false)}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md transition"
                  >
                    Batal
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal Input Pengiriman */}
        {showPengirimanModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Input Pengiriman</h2>
              <form onSubmit={handleSubmitPengiriman}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nomor SO</label>
                  <select 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={pengirimanForm.nomorSO}
                    onChange={(e) => setPengirimanForm({...pengirimanForm, nomorSO: e.target.value})}
                    required
                  >
                    <option value="">Pilih Pesanan</option>
                    {pesanan.filter(p => p.status !== 'Selesai').map(item => (
                      <option key={item.id} value={item.nomorSO}>
                        {item.nomorSO} - {item.namaPelanggan}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ekspedisi</label>
                  <select 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={pengirimanForm.ekspedisi}
                    onChange={(e) => setPengirimanForm({...pengirimanForm, ekspedisi: e.target.value})}
                    required
                  >
                    <option value="">Pilih Ekspedisi</option>
                    <option value="JNE Cargo">JNE Cargo</option>
                    <option value="Sicepat Cargo">Sicepat Cargo</option>
                    <option value="J&T Cargo">J&T Cargo</option>
                    <option value="Grab Express">Grab Express</option>
                    <option value="Lalamove">Lalamove</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nomor Resi</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={pengirimanForm.nomorResi}
                    onChange={(e) => setPengirimanForm({...pengirimanForm, nomorResi: e.target.value})}
                    required
                    placeholder="JNE123456789"
                  />
                </div>
                <div className="flex gap-3">
                  <button 
                    type="submit"
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition"
                  >
                    Simpan Pengiriman
                  </button>
                  <button 
                    type="button"
                    onClick={() => setShowPengirimanModal(false)}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md transition"
                  >
                    Batal
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Penjualan;
