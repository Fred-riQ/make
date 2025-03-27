// src/features/store/StoreForm.jsx
import React from 'react';
import {
  TextField,
  MenuItem,
  Grid,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select
} from '@mui/material';

const StoreForm = ({ initialValues, onSubmit, onCancel }) => {
  const [formData, setFormData] = React.useState(initialValues || {
    name: '',
    location: '',
    status: 'active'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Store Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            margin="normal"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={formData.status}
              onChange={handleChange}
              label="Status"
              required
            >
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
              <MenuItem value="maintenance">Under Maintenance</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button 
              variant="outlined" 
              onClick={onCancel}
              size="large"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="contained" 
              size="large"
              color="primary"
            >
              {initialValues?.id ? 'Update Store' : 'Create Store'}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StoreForm;