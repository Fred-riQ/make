// src/features/dashboard/AdminDashboard.jsx
import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import InventoryIcon from '@mui/icons-material/Inventory';
import ReceiptIcon from '@mui/icons-material/Receipt';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';

export default function AdminDashboard() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        {/* Inventory Management */}
        <Grid item xs={12} md={6} lg={4}>
          <Paper sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
            <InventoryIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
            <Box>
              <Typography variant="h6">Inventory Items</Typography>
              <Typography variant="h4">156</Typography>
            </Box>
          </Paper>
        </Grid>
        
        {/* Order Management */}
        <Grid item xs={12} md={6} lg={4}>
          <Paper sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
            <ReceiptIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
            <Box>
              <Typography variant="h6">Pending Orders</Typography>
              <Typography variant="h4">8</Typography>
            </Box>
          </Paper>
        </Grid>
        
        {/* Staff Management */}
        <Grid item xs={12} md={6} lg={4}>
          <Paper sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
            <SupervisorAccountIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
            <Box>
              <Typography variant="h6">Manage Clerks</Typography>
              <Typography variant="subtitle1">View/Edit</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      
      {/* Additional admin-specific components */}
    </Box>
  );
}