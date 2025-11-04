import React, { useState } from 'react';
import { Bell, AlertCircle, CheckCircle, Trash2, ShoppingBag } from 'lucide-react';
import { notifikasiROP, bahanBaku } from '../data/dummyData';

const Notifikasi = () => {
  const [notifications, setNotifications] = useState(notifikasiROP);

  const handleMarkAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, dibaca: true } : notif
    ));
  };

  const handleDelete = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, dibaca: true })));
  };

  const unreadCount = notifications.filter(n => !n.dibaca).length;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Notifikasi ROP</h1>
            <p className="text-gray-600 mt-2">
              {unreadCount > 0 ? (
                <span className="text-red-600 font-semibold">{unreadCount} notifikasi belum dibaca</span>
              ) : (
                <span className="text-green-600">Semua notifikasi sudah dibaca</span>
              )}
            </p>
          </div>
          {unreadCount > 0 && (
            <button 
              onClick={handleMarkAllAsRead}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
            >
              <CheckCircle size={18} />
              Tandai Semua Dibaca
            </button>
          )}
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg shadow-sm mb-6">
          <div className="flex items-start gap-3">
            <Bell className="text-blue-500 mt-1" size={24} />
            <div>
              <h3 className="font-bold text-blue-800 text-lg">Sistem Notifikasi Otomatis</h3>
              <p className="text-blue-700 mt-1">
                Sistem akan otomatis mengirimkan notifikasi ketika stok bahan baku mencapai atau berada di bawah Reorder Point (ROP).
              </p>
              <p className="text-blue-600 mt-2 text-sm">
                💡 Segera lakukan pemesanan sesuai EOQ yang direkomendasikan untuk menghindari stockout.
              </p>
            </div>
          </div>
        </div>

        {/* Notifikasi List */}
        {notifications.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <Bell className="mx-auto text-gray-400 mb-4" size={64} />
            <h3 className="text-xl font-bold text-gray-600 mb-2">Tidak Ada Notifikasi</h3>
            <p className="text-gray-500">Semua stok bahan baku dalam kondisi aman</p>
          </div>
        ) : (
          <div className="space-y-4">
            {notifications.map((notif) => {
              const bahan = bahanBaku.find(b => b.id === notif.bahanBakuId);
              if (!bahan) return null;

              return (
                <div 
                  key={notif.id} 
                  className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${
                    notif.dibaca ? 'border-gray-300' : 'border-red-500'
                  } transition hover:shadow-lg`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className={`p-3 rounded-full ${notif.dibaca ? 'bg-gray-100' : 'bg-red-100'}`}>
                        <AlertCircle className={notif.dibaca ? 'text-gray-500' : 'text-red-500'} size={28} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className={`text-lg font-bold ${notif.dibaca ? 'text-gray-600' : 'text-red-800'}`}>
                            {notif.judul}
                          </h3>
                          {!notif.dibaca && (
                            <span className="px-2 py-1 bg-red-500 text-white text-xs font-semibold rounded-full">
                              BARU
                            </span>
                          )}
                        </div>
                        <p className={`${notif.dibaca ? 'text-gray-600' : 'text-red-700'} mb-3`}>
                          {notif.pesan}
                        </p>
                        
                        {/* Detail Stok */}
                        <div className="bg-gray-50 rounded-lg p-4 mb-3">
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <p className="text-gray-500 text-xs">Stok Saat Ini</p>
                              <p className="font-bold text-red-600">{bahan.stokSaatIni} {bahan.satuan}</p>
                            </div>
                            <div>
                              <p className="text-gray-500 text-xs">ROP</p>
                              <p className="font-bold text-orange-600">{bahan.rop} {bahan.satuan}</p>
                            </div>
                            <div>
                              <p className="text-gray-500 text-xs">EOQ (Pesan)</p>
                              <p className="font-bold text-green-600">{bahan.eoq} {bahan.satuan}</p>
                            </div>
                            <div>
                              <p className="text-gray-500 text-xs">Lead Time</p>
                              <p className="font-bold text-blue-600">{bahan.leadTime} hari</p>
                            </div>
                          </div>
                        </div>

                        {/* Informasi Pemesanan */}
                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded">
                          <div className="flex items-start gap-2">
                            <ShoppingBag className="text-yellow-600 mt-0.5" size={18} />
                            <div>
                              <p className="text-sm font-semibold text-yellow-800">Informasi Pemesanan:</p>
                              <p className="text-sm text-yellow-700 mt-1">
                                Supplier: <span className="font-bold">{bahan.supplier}</span>
                              </p>
                              <p className="text-sm text-yellow-700">
                                Estimasi Total: <span className="font-bold">
                                  {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(bahan.eoq * bahan.hargaSatuan)}
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
                          <span>Prioritas: <span className="font-semibold text-red-600">{notif.prioritas}</span></span>
                          <span>•</span>
                          <span>{notif.tanggal}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 ml-4">
                      {!notif.dibaca && (
                        <button 
                          onClick={() => handleMarkAsRead(notif.id)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          title="Tandai sudah dibaca"
                        >
                          <CheckCircle size={20} />
                        </button>
                      )}
                      <button 
                        onClick={() => handleDelete(notif.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                        title="Hapus notifikasi"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Info Footer */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h3 className="font-bold text-gray-800 mb-3">📊 Cara Kerja Sistem ROP</h3>
          <div className="space-y-2 text-sm text-gray-700">
            <p>• Sistem secara otomatis memantau stok real-time dari Modul Persediaan</p>
            <p>• Notifikasi akan muncul ketika: <span className="font-bold">Stok Saat Ini ≤ ROP</span></p>
            <p>• ROP (Reorder Point) = Stok minimum sebelum harus melakukan pemesanan ulang</p>
            <p>• EOQ (Economic Order Quantity) = Jumlah optimal yang harus dipesan untuk efisiensi biaya</p>
            <p>• Safety Stock = Cadangan stok untuk mengantisipasi ketidakpastian demand dan supply</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifikasi;
