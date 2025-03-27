// src/features/dashboard/DashboardSelector.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import MerchantDashboard from './MerchantDashboard';
import AdminDashboard from './AdminDashboard';
import ClerkDashboard from './ClerkDashboard';
import { selectCurrentRole } from '../auth/authSlice';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorBoundary from '../../components/ErrorBoundary';
import { ROLES } from '../../constants/index';
/**
 * DashboardSelector component that renders the appropriate dashboard
 * based on the user's role from Redux store
 */
export default function DashboardSelector() {
  const userRole = useSelector(selectCurrentRole);

  const renderDashboard = () => {
    switch(userRole) {
      case ROLES.MERCHANT:
        return <MerchantDashboard />;
      case ROLES.ADMIN:
        return <AdminDashboard />;
      case ROLES.CLERK:
        return <ClerkDashboard />;
      default:
        return <LoadingSpinner message="Loading dashboard..." />;
    }
  };

  return (
    <ErrorBoundary fallback={<div>Error loading dashboard. Please try again.</div>}>
      <div className="dashboard-selector" data-testid="dashboard-selector">
        {renderDashboard()}
      </div>
    </ErrorBoundary>
  );
}

DashboardSelector.propTypes = {
  userRole: PropTypes.oneOf([
    ROLES.MERCHANT,
    ROLES.ADMIN,
    ROLES.CLERK,
    null
  ])
};