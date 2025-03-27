// ClerkRoute.jsx (new component)
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { selectCurrentRole } from '../features/auth/authSlice';

export default function ClerkRoute() {
  const role = useSelector(selectCurrentRole);
  return ['clerk', 'admin', 'merchant'].includes(role) ? <Outlet /> : <Navigate to="/" />;
}