import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Persediaan from './pages/Persediaan';
import Penjualan from './pages/Penjualan';
import Notifikasi from './pages/Notifikasi';
import './index.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/persediaan" element={<Persediaan />} />
          <Route path="/penjualan" element={<Penjualan />} />
          <Route path="/notifikasi" element={<Notifikasi />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App
