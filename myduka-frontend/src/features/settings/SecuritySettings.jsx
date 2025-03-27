import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography,
  Alert
} from '@mui/material';

export default function SecuritySettings({ onSuccess }) {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.newPassword !== formData.confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    // TODO: Connect to API
    setError(null);
    onSuccess('Password changed successfully');
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h6" gutterBottom>
        Change Password
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <TextField
        margin="normal"
        fullWidth
        label="Current Password"
        name="currentPassword"
        type="password"
        value={formData.currentPassword}
        onChange={handleChange}
        required
      />
      <TextField
        margin="normal"
        fullWidth
        label="New Password"
        name="newPassword"
        type="password"
        value={formData.newPassword}
        onChange={handleChange}
        required
      />
      <TextField
        margin="normal"
        fullWidth
        label="Confirm New Password"
        name="confirmPassword"
        type="password"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
      />

      <Button 
        type="submit" 
        variant="contained" 
        color="primary"
        sx={{ mt: 2 }}
      >
        Update Password
      </Button>
    </Box>
  );
}