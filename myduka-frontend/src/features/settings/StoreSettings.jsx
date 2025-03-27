// src/features/settings/StoreSettings.jsx
import React from 'react';
import { Box, Typography, Switch, FormControlLabel, TextField } from '@mui/material';

const StoreSettings = () => {
  const [settings, setSettings] = React.useState({
    inventoryTracking: true,
    lowStockThreshold: 10,
    enableMultiStore: false
  });

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Store Configuration
      </Typography>
      
      <FormControlLabel
        control={
          <Switch
            name="inventoryTracking"
            checked={settings.inventoryTracking}
            onChange={handleChange}
          />
        }
        label="Enable Inventory Tracking"
        sx={{ mb: 2 }}
      />
      
      <TextField
        fullWidth
        label="Low Stock Threshold"
        name="lowStockThreshold"
        type="number"
        value={settings.lowStockThreshold}
        onChange={handleChange}
        margin="normal"
      />
      
      <FormControlLabel
        control={
          <Switch
            name="enableMultiStore"
            checked={settings.enableMultiStore}
            onChange={handleChange}
          />
        }
        label="Enable Multi-Store Management"
        sx={{ mt: 2 }}
      />
    </Box>
  );
};

export default StoreSettings;