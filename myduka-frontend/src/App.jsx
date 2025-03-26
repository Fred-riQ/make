import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Login from './features/auth/Login';
import Dashboard from './features/dashboard/Dashboard';
import Products from './features/products/Products';
import AdminPanel from './features/admin/AdminPanel';
import SupplyRequest from './features/supply/SupplyRequest';
import Reports from './features/report/Reports'; 
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        
        {/* Auth Routes */}
        <Route path="auth">
          <Route path="login" element={<Login />} />
        </Route>

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="reports" element={<Reports />} />
        </Route>

        {/* Admin-only Routes */}
        <Route element={<ProtectedRoute roles={['admin', 'superuser']} />}>
          <Route path="admin" element={<AdminPanel />} />
          <Route path="supply-requests" element={<SupplyRequest />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;