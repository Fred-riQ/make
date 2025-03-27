import React from 'react';
import { Routes, Route, Outlet, Navigate, useLocation } from 'react-router-dom';
import { Box, Tabs, Tab, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function Reports() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Reports Dashboard
      </Typography>
      
      <Paper sx={{ mb: 3 }}>
        <Tabs 
          value={currentPath} 
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab 
            label="Sales Reports" 
            value="/reports/sales" 
            component={Link} 
            to="sales" 
          />
          <Tab 
            label="Inventory Reports" 
            value="/reports/inventory" 
            component={Link} 
            to="inventory" 
          />
          <Tab 
            label="Financial Reports" 
            value="/reports/financial" 
            component={Link} 
            to="financial" 
          />
          <Tab 
            label="Supplier Reports" 
            value="/reports/suppliers" 
            component={Link} 
            to="suppliers" 
          />
        </Tabs>
      </Paper>

      <Box sx={{ p: 2 }}>
        <Routes>
          <Route index element={<Navigate to="sales" replace />} />
          <Route path="sales" element={<Outlet />} />
          <Route path="inventory" element={<Outlet />} />
          <Route path="financial" element={<Outlet />} />
          <Route path="suppliers" element={<Outlet />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default Reports;