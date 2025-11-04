import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { AlertCircle, Package, TrendingUp, ShoppingCart, Bell, CheckCircle } from 'lucide-react';
import { bahanBaku, workInProgress, barangJadi, dataPenjualanBulanan, notifikasiROP } from '../data/dummyData';

const Dashboard = () => {
  const [notifications, setNotifications] = useState(notifikasiROP);
  const [stokKritis, setStokKritis] = useState([]);

  useEffect(() => {
    // Filter bahan baku yang stoknya <= ROP
    const kritisItems = bahanBaku.filter(bahan => bahan.stokSaatIni <= bahan.rop);
    setStokKritis(kritisItems);
  }, []);

  const totalStokBahanBaku = bahanBaku.reduce((sum, item) => sum + item.stokSaatIni, 0);
  const totalWIP = workInProgress.reduce((sum, item) => sum + item.jumlah, 0);
  const totalBarangJadi = barangJadi.reduce((sum, item) => sum + item.stok, 0);
  const penjualanBulanIni = dataPenjualanBulanan[dataPenjualanBulanan.length - 1].penjualan;

  const dismissNotification = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard StokManis</h1>
          <p className="text-gray-600 mt-2">Sistem Manajemen Persediaan - Box Kuat</p>
        </div>

        {/* Notifikasi Stok Kritis */}
        {stokKritis.length > 0 && (
          <div className="mb-6 space-y-3">
            {stokKritis.map((item) => {
              const notif = notifications.find(n => n.bahanBakuId === item.id);
              if (!notif) return null;
              
              return (
                <div key={item.id} className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg shadow-md flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <AlertCircle className="text-red-500 mt-1" size={24} />
                    <div>
                      <h3 className="font-bold text-red-800 text-lg">
                        🚨 Stok {item.nama} Mencapai ROP!
                      </h3>
                      <p className="text-red-700 mt-1">
                        Sisa stok: <span className="font-bold">{item.stokSaatIni} {item.satuan}</span> 
                        (ROP: {item.rop} {item.satuan})
                      </p>
                      <p className="text-red-600 mt-2 text-sm">
                        ⚡ Segera pesan <span className="font-bold">{item.eoq} {item.satuan}</span> ke {item.supplier}
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={() => dismissNotification(item.id)}
                    className="text-red-500 hover:text-red-700 ml-4"
                  >
                    <CheckCircle size={20} />
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Stok Bahan Baku</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">{totalStokBahanBaku}</h3>
                <p className="text-xs text-gray-500 mt-1">{bahanBaku.length} Item</p>
              </div>
              <Package className="text-blue-500" size={40} />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Work in Progress</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">{totalWIP}</h3>
                <p className="text-xs text-gray-500 mt-1">{workInProgress.length} Batch</p>
              </div>
              <TrendingUp className="text-yellow-500" size={40} />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Barang Jadi</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">{totalBarangJadi}</h3>
                <p className="text-xs text-gray-500 mt-1">{barangJadi.length} Produk</p>
              </div>
              <ShoppingCart className="text-green-500" size={40} />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Penjualan Nov</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">
                  {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(penjualanBulanIni)}
                </h3>
                <p className="text-xs text-green-600 mt-1">↑ Target: Rp 25.000.000</p>
              </div>
              <Bell className="text-purple-500" size={40} />
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Grafik Penjualan */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Trend Penjualan 6 Bulan</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dataPenjualanBulanan}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="bulan" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value)}
                />
                <Legend />
                <Line type="monotone" dataKey="penjualan" stroke="#8b5cf6" strokeWidth={2} name="Penjualan" />
                <Line type="monotone" dataKey="target" stroke="#22c55e" strokeWidth={2} strokeDasharray="5 5" name="Target" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Grafik Stok Bahan Baku */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Status Stok Bahan Baku</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={bahanBaku}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="nama" angle={-15} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="stokSaatIni" fill="#3b82f6" name="Stok Saat Ini" />
                <Bar dataKey="rop" fill="#ef4444" name="ROP" />
                <Bar dataKey="safetyStock" fill="#f59e0b" name="Safety Stock" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Work in Progress Table */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Work in Progress</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No. Produksi</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produk</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jumlah</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Est. Selesai</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {workInProgress.map((wip) => (
                  <tr key={wip.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{wip.nomorProduksi}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{wip.produk}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{wip.jumlah} Pcs</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        {wip.statusProduksi}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${wip.progress}%` }}></div>
                        </div>
                        <span className="text-xs">{wip.progress}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{wip.estimasiSelesai}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
