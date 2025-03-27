import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  FormControlLabel, 
  Switch,
  Divider,
  Button
} from '@mui/material';
import {
  Email as EmailIcon,
  Notifications as AppNotificationIcon,
  Sms as SmsIcon
} from '@mui/icons-material';

export default function NotificationSettings({ onSuccess }) {
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    appNotifications: true,
    smsNotifications: false,
    lowStockAlerts: true,
    newOrderAlerts: true,
    paymentReminders: true
  });

  const handleToggle = (setting) => (event) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: event.target.checked
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Connect to API
    onSuccess('Notification settings updated successfully');
  };

  const NotificationSwitch = ({ icon, label, setting }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
      {icon}
      <Typography sx={{ flexGrow: 1, ml: 2 }}>{label}</Typography>
      <FormControlLabel
        control={
          <Switch
            checked={notificationSettings[setting]}
            onChange={handleToggle(setting)}
            color="primary"
          />
        }
        label={notificationSettings[setting] ? 'On' : 'Off'}
        labelPlacement="start"
      />
    </Box>
  );

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h6" gutterBottom>
        Notification Preferences
      </Typography>

      <NotificationSwitch
        icon={<EmailIcon color="action" />}
        label="Email Notifications"
        setting="emailNotifications"
      />
      <NotificationSwitch
        icon={<AppNotificationIcon color="action" />}
        label="In-App Notifications"
        setting="appNotifications"
      />
      <NotificationSwitch
        icon={<SmsIcon color="action" />}
        label="SMS Notifications"
        setting="smsNotifications"
      />

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" gutterBottom>
        Alert Preferences
      </Typography>

      <NotificationSwitch
        label="Low Stock Alerts"
        setting="lowStockAlerts"
      />
      <NotificationSwitch
        label="New Order Alerts"
        setting="newOrderAlerts"
      />
      <NotificationSwitch
        label="Payment Reminders"
        setting="paymentReminders"
      />

      <Button 
        type="submit" 
        variant="contained" 
        sx={{ mt: 3 }}
      >
        Save Notification Settings
      </Button>
    </Box>
  );
}