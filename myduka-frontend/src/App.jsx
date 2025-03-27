import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import DashboardSelector from './features/dashboard/DashboardSelector';
import Products from './features/products/Products';
import ProductForm from './features/products/ProductForm';
import AdminPanel from './features/admin/AdminPanel';
import UserManagement from './features/admin/UserManagement';
import SupplyRequest from './features/supply/SupplyRequestsList';
import Reports from './features/reports/Reports';
import SalesReport from './features/reports/SalesReport';
import InventoryReport from './features/reports/InventoryReport';
import ProtectedRoute from './components/ProtectedRoute';
import ClerkRoute from './components/ClerkRoute';
import Settings from './features/settings/Settings';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public Routes */}
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        
        {/* Auth Routes */}
        <Route path="auth">
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        {/* Protected Routes (All authenticated users) */}
        <Route element={<ProtectedRoute />}>
          <Route path="dashboard" element={<DashboardSelector />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Clerk-specific Routes */}
        <Route element={<ClerkRoute />}>
          <Route path="products" element={<Products />} />
          <Route path="products/new" element={<ProductForm />} />
          <Route path="products/edit/:id" element={<ProductForm />} />
          <Route path="supply-requests/new" element={<SupplyRequest />} />
        </Route>

        {/* Admin-only Routes */}
        <Route element={<ProtectedRoute roles={['admin']} />}>
          <Route path="admin" element={<AdminPanel />} />
          <Route path="admin/users" element={<UserManagement />} />
          <Route path="supply-requests" element={<SupplyRequestsList />} />
          <Route path="reports" element={<Reports />}>
            <Route index element={<SalesReport />} />
            <Route path="sales" element={<SalesReport />} />
            <Route path="inventory" element={<InventoryReport />} />
          </Route>
        </Route>

        {/* Merchant-only Routes */}
        <Route element={<ProtectedRoute roles={['merchant']} />}>
          <Route path="financials" element={<FinancialDashboard />} />
          <Route path="store-management" element={<StoreManagement />} />
        </Route>

        {/* Catch-all 404 */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;