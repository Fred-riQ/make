// src/features/dashboard/MerchantDashboard.jsx
import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import StoreIcon from '@mui/icons-material/Store';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PeopleIcon from '@mui/icons-material/People';

export default function MerchantDashboard() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Merchant Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        {/* Store Overview */}
        <Grid item xs={12} md={6} lg={4}>
          <Paper sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
            <StoreIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
            <Box>
              <Typography variant="h6">Stores</Typography>
              <Typography variant="h4">5</Typography>
            </Box>
          </Paper>
        </Grid>
        
        {/* Financial Summary */}
        <Grid item xs={12} md={6} lg={4}>
          <Paper sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
            <AssessmentIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
            <Box>
              <Typography variant="h6">Monthly Revenue</Typography>
              <Typography variant="h4">KES 250,000</Typography>
            </Box>
          </Paper>
        </Grid>
        
        {/* Staff Management */}
        <Grid item xs={12} md={6} lg={4}>
          <Paper sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
            <PeopleIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
            <Box>
              <Typography variant="h6">Staff Members</Typography>
              <Typography variant="h4">12</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      
      {/* Additional merchant-specific components */}
    </Box>
  );
}