import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { 
  Box, 
  TextField, 
  Button, 
  Typography,
  Avatar
} from '@mui/material';
import { selectCurrentUser } from '../auth/authSlice';

export default function ProfileSettings({ onSuccess }) {
  const user = useSelector(selectCurrentUser);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Connect to API
    onSuccess('Profile updated successfully');
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Avatar sx={{ width: 64, height: 64, mr: 2 }} />
        <div>
          <Typography variant="h6">Profile Picture</Typography>
          <Button variant="outlined" size="small" sx={{ mt: 1 }}>
            Change Photo
          </Button>
        </div>
      </Box>

      <TextField
        margin="normal"
        fullWidth
        label="Full Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        fullWidth
        label="Email Address"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        fullWidth
        label="Phone Number"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
      />

      <Button 
        type="submit" 
        variant="contained" 
        sx={{ mt: 3 }}
      >
        Save Changes
      </Button>
    </Box>
  );
}