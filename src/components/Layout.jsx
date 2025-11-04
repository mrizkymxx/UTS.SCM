import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, Bell, Menu, X } from 'lucide-react';
import { notifikasiROP } from '../data/dummyData';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const unreadNotifications = notifikasiROP.filter(n => !n.dibaca).length;

  const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Persediaan', href: '/persediaan', icon: Package },
    { name: 'Penjualan', href: '/penjualan', icon: ShoppingCart },
    { name: 'Notifikasi', href: '/notifikasi', icon: Bell, badge: unreadNotifications },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar for Desktop */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64 bg-gradient-to-b from-blue-600 to-blue-800">
          <div className="flex items-center justify-center h-20 bg-blue-900 shadow-lg">
            <h1 className="text-2xl font-bold text-white">📦 StokManis</h1>
          </div>
          <div className="flex-1 flex flex-col overflow-y-auto">
            <nav className="flex-1 px-4 py-4 space-y-2">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition ${
                      isActive
                        ? 'bg-blue-900 text-white shadow-md'
                        : 'text-blue-100 hover:bg-blue-700 hover:text-white'
                    }`
                  }
                >
                  <item.icon className="mr-3 h-6 w-6" />
                  {item.name}
                  {item.badge > 0 && (
                    <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              ))}
            </nav>
            <div className="p-4 bg-blue-900">
              <div className="text-xs text-blue-200 text-center">
                <p>Box Kuat</p>
                <p className="mt-1">SCM System v1.0</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)}></div>
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-gradient-to-b from-blue-600 to-blue-800">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="h-6 w-6 text-white" />
              </button>
            </div>
            <div className="flex items-center justify-center h-20 bg-blue-900 shadow-lg">
              <h1 className="text-2xl font-bold text-white">📦 StokManis</h1>
            </div>
            <div className="flex-1 overflow-y-auto">
              <nav className="px-4 py-4 space-y-2">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition ${
                        isActive
                          ? 'bg-blue-900 text-white shadow-md'
                          : 'text-blue-100 hover:bg-blue-700 hover:text-white'
                      }`
                    }
                  >
                    <item.icon className="mr-3 h-6 w-6" />
                    {item.name}
                    {item.badge > 0 && (
                      <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 overflow-auto focus:outline-none">
        <div className="md:hidden flex items-center justify-between bg-white shadow-md px-4 py-3">
          <button
            className="text-gray-600 hover:text-gray-900 focus:outline-none"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-bold text-blue-600">StokManis</h1>
          <div className="w-6"></div>
        </div>
        <main className="relative">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
