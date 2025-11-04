import React, { useState } from 'react';
import { Package, TrendingDown, TrendingUp, Settings, Plus, Minus, AlertTriangle } from 'lucide-react';
import { bahanBaku, transaksiStok } from '../data/dummyData';

const Persediaan = () => {
  const [stokData, setStokData] = useState(bahanBaku);
  const [transaksi, setTransaksi] = useState(transaksiStok);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(''); // 'masuk' atau 'keluar'
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  
  const [formData, setFormData] = useState({
    bahanBakuId: '',
    jumlah: '',
    keterangan: '',
    supplier: '',
    nomorPO: '',
    nomorProduksi: ''
  });

  const [settingsForm, setSettingsForm] = useState({
    safetyStock: '',
    rop: '',
    eoq: '',
    leadTime: ''
  });

  const handleOpenModal = (type) => {
    setModalType(type);
    setShowModal(true);
    setFormData({
      bahanBakuId: '',
      jumlah: '',
      keterangan: '',
      supplier: '',
      nomorPO: '',
      nomorProduksi: ''
    });
  };

  const handleOpenSettings = (item) => {
    setSelectedItem(item);
    setSettingsForm({
      safetyStock: item.safetyStock,
      rop: item.rop,
      eoq: item.eoq,
      leadTime: item.leadTime
    });
    setShowSettingsModal(true);
  };

  const handleSubmitTransaksi = (e) => {
    e.preventDefault();
    
    const bahan = stokData.find(b => b.id === parseInt(formData.bahanBakuId));
    if (!bahan) return;

    const jumlah = parseInt(formData.jumlah);
    
    // Buat transaksi baru
    const transaksiBaru = {
      id: transaksi.length + 1,
      tanggal: new Date().toISOString().split('T')[0],
      jenis: modalType === 'masuk' ? 'Masuk' : 'Keluar',
      bahanBakuId: bahan.id,
      namaBahan: bahan.nama,
      jumlah: jumlah,
      satuan: bahan.satuan,
      keterangan: formData.keterangan,
      ...(modalType === 'masuk' ? {
        supplier: formData.supplier || bahan.supplier,
        nomorPO: formData.nomorPO
      } : {
        nomorProduksi: formData.nomorProduksi
      })
    };

    // Update stok
    const updatedStok = stokData.map(item => {
      if (item.id === bahan.id) {
        return {
          ...item,
          stokSaatIni: modalType === 'masuk' 
            ? item.stokSaatIni + jumlah 
            : item.stokSaatIni - jumlah
        };
      }
      return item;
    });

    setStokData(updatedStok);
    setTransaksi([transaksiBaru, ...transaksi]);
    setShowModal(false);
  };

  const handleUpdateSettings = (e) => {
    e.preventDefault();
    
    const updatedStok = stokData.map(item => {
      if (item.id === selectedItem.id) {
        return {
          ...item,
          safetyStock: parseInt(settingsForm.safetyStock),
          rop: parseInt(settingsForm.rop),
          eoq: parseInt(settingsForm.eoq),
          leadTime: parseInt(settingsForm.leadTime)
        };
      }
      return item;
    });

    setStokData(updatedStok);
    setShowSettingsModal(false);
  };

  const getStokStatus = (item) => {
    if (item.stokSaatIni <= item.safetyStock) {
      return { color: 'text-red-600 bg-red-100', label: 'Kritis', icon: AlertTriangle };
    } else if (item.stokSaatIni <= item.rop) {
      return { color: 'text-orange-600 bg-orange-100', label: 'Pesan Ulang', icon: AlertTriangle };
    } else {
      return { color: 'text-green-600 bg-green-100', label: 'Aman', icon: Package };
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Modul Persediaan</h1>
            <p className="text-gray-600 mt-2">Kelola stok bahan baku dan transaksi</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => handleOpenModal('masuk')}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 shadow-md transition"
            >
              <Plus size={20} />
              Barang Masuk
            </button>
            <button 
              onClick={() => handleOpenModal('keluar')}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 shadow-md transition"
            >
              <Minus size={20} />
              Ambil untuk Produksi
            </button>
          </div>
        </div>

        {/* Daftar Stok Bahan Baku */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Daftar Stok Bahan Baku</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bahan Baku</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stok Saat Ini</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Safety Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ROP</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">EOQ</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {stokData.map((item) => {
                  const status = getStokStatus(item);
                  const StatusIcon = status.icon;
                  return (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Package className="text-gray-400 mr-2" size={20} />
                          <div>
                            <div className="text-sm font-medium text-gray-900">{item.nama}</div>
                            <div className="text-xs text-gray-500">Lead Time: {item.leadTime} hari</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-bold text-gray-900">{item.stokSaatIni} {item.satuan}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.safetyStock} {item.satuan}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.rop} {item.satuan}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.eoq} {item.satuan}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${status.color}`}>
                          <StatusIcon size={14} className="mr-1" />
                          {status.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">{item.supplier}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button 
                          onClick={() => handleOpenSettings(item)}
                          className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                        >
                          <Settings size={16} />
                          Atur
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Riwayat Transaksi */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Riwayat Transaksi</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jenis</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bahan Baku</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jumlah</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier/Produksi</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Keterangan</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {transaksi.slice(0, 10).map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.tanggal}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.jenis === 'Masuk' ? (
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          <TrendingUp size={14} className="mr-1" />
                          Masuk
                        </span>
                      ) : (
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          <TrendingDown size={14} className="mr-1" />
                          Keluar
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.namaBahan}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.jumlah} {item.satuan}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {item.jenis === 'Masuk' ? item.supplier : item.nomorProduksi}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{item.keterangan}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Transaksi */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {modalType === 'masuk' ? 'Barang Masuk' : 'Ambil untuk Produksi'}
              </h2>
              <form onSubmit={handleSubmitTransaksi}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bahan Baku</label>
                  <select 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.bahanBakuId}
                    onChange={(e) => setFormData({...formData, bahanBakuId: e.target.value})}
                    required
                  >
                    <option value="">Pilih Bahan Baku</option>
                    {stokData.map(item => (
                      <option key={item.id} value={item.id}>{item.nama}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Jumlah</label>
                  <input 
                    type="number" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.jumlah}
                    onChange={(e) => setFormData({...formData, jumlah: e.target.value})}
                    required
                    min="1"
                  />
                </div>
                {modalType === 'masuk' && (
                  <>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Nomor PO</label>
                      <input 
                        type="text" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.nomorPO}
                        onChange={(e) => setFormData({...formData, nomorPO: e.target.value})}
                        placeholder="PO-2024-XXX"
                      />
                    </div>
                  </>
                )}
                {modalType === 'keluar' && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nomor Produksi</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.nomorProduksi}
                      onChange={(e) => setFormData({...formData, nomorProduksi: e.target.value})}
                      placeholder="WIP-2024-XXX"
                    />
                  </div>
                )}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Keterangan</label>
                  <textarea 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.keterangan}
                    onChange={(e) => setFormData({...formData, keterangan: e.target.value})}
                    rows="3"
                  ></textarea>
                </div>
                <div className="flex gap-3">
                  <button 
                    type="submit"
                    className={`flex-1 ${modalType === 'masuk' ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'} text-white px-4 py-2 rounded-md transition`}
                  >
                    Simpan
                  </button>
                  <button 
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md transition"
                  >
                    Batal
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal Settings */}
        {showSettingsModal && selectedItem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Pengaturan Stok: {selectedItem.nama}
              </h2>
              <form onSubmit={handleUpdateSettings}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Safety Stock ({selectedItem.satuan})</label>
                  <input 
                    type="number" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={settingsForm.safetyStock}
                    onChange={(e) => setSettingsForm({...settingsForm, safetyStock: e.target.value})}
                    required
                    min="0"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">ROP - Reorder Point ({selectedItem.satuan})</label>
                  <input 
                    type="number" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={settingsForm.rop}
                    onChange={(e) => setSettingsForm({...settingsForm, rop: e.target.value})}
                    required
                    min="0"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">EOQ - Economic Order Quantity ({selectedItem.satuan})</label>
                  <input 
                    type="number" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={settingsForm.eoq}
                    onChange={(e) => setSettingsForm({...settingsForm, eoq: e.target.value})}
                    required
                    min="0"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Lead Time (Hari)</label>
                  <input 
                    type="number" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={settingsForm.leadTime}
                    onChange={(e) => setSettingsForm({...settingsForm, leadTime: e.target.value})}
                    required
                    min="1"
                  />
                </div>
                <div className="flex gap-3">
                  <button 
                    type="submit"
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition"
                  >
                    Simpan Pengaturan
                  </button>
                  <button 
                    type="button"
                    onClick={() => setShowSettingsModal(false)}
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

export default Persediaan;
