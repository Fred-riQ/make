import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute({ roles = [] }) {
  const { user, token } = useSelector((state) => state.auth);

  if (!token) {
    return <Navigate to="/auth/login" />;
  }

  if (roles.length > 0 && !roles.includes(user?.role)) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}