import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Tabs, 
  Tab, 
  Paper,
  Divider,
  Alert
} from '@mui/material';
import {
  AccountCircle as ProfileIcon,
  Lock as SecurityIcon,
  Notifications as NotificationsIcon,
  Store as StoreSettingsIcon,
  Palette as ThemeIcon
} from '@mui/icons-material';
import ProfileSettings from './ProfileSettings';
import SecuritySettings from './SecuritySettings';
import NotificationSettings from './NotificationSettings';
import StoreSettings from './StoreSettings'; 


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `settings-tab-${index}`,
    'aria-controls': `settings-tabpanel-${index}`,
  };
}

export default function Settings() {
  const [value, setValue] = useState(0);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSuccess = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(null), 5000);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
      
      {successMessage && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {successMessage}
        </Alert>
      )}

      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="settings tabs"
        >
          <Tab label="Profile" icon={<ProfileIcon />} {...a11yProps(0)} />
          <Tab label="Security" icon={<SecurityIcon />} {...a11yProps(1)} />
          <Tab label="Notifications" icon={<NotificationsIcon />} {...a11yProps(2)} />
          <Tab label="Store" icon={<StoreSettingsIcon />} {...a11yProps(3)} />
          <Tab label="Theme" icon={<ThemeIcon />} {...a11yProps(4)} />
        </Tabs>
      </Paper>

      <Divider sx={{ mb: 3 }} />

      <TabPanel value={value} index={0}>
        <ProfileSettings onSuccess={handleSuccess} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SecuritySettings onSuccess={handleSuccess} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <NotificationSettings onSuccess={handleSuccess} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <StoreSettings onSuccess={handleSuccess} />
      </TabPanel>
      
    </Box>
  );
}