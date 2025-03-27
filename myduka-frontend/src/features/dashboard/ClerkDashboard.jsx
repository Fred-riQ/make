// src/features/dashboard/ClerkDashboard.jsx
import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import Inventory2Icon from '@mui/icons-material/Inventory2';

export default function ClerkDashboard() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Clerk Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        {/* Stock Management */}
        <Grid item xs={12} md={6} lg={4}>
          <Paper sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
            <Inventory2Icon color="primary" sx={{ fontSize: 40, mr: 2 }} />
            <Box>
              <Typography variant="h6">Low Stock Items</Typography>
              <Typography variant="h4">5</Typography>
            </Box>
          </Paper>
        </Grid>
        
        {/* Sales */}
        <Grid item xs={12} md={6} lg={4}>
          <Paper sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
            <PointOfSaleIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
            <Box>
              <Typography variant="h6">Today's Sales</Typography>
              <Typography variant="h4">KES 15,000</Typography>
            </Box>
          </Paper>
        </Grid>
        
        {/* Supply Requests */}
        <Grid item xs={12} md={6} lg={4}>
          <Paper sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
            <LocalShippingIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
            <Box>
              <Typography variant="h6">Pending Requests</Typography>
              <Typography variant="h4">3</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      
      {/* Additional clerk-specific components */}
    </Box>
  );
}