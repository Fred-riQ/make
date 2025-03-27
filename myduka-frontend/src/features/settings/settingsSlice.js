// src/features/settings/settingsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';

// Async Thunks
export const fetchUserSettings = createAsyncThunk(
  'settings/fetchUserSettings',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/users/${userId}/settings`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { 
        message: 'Failed to fetch settings' 
      });
    }
  }
);

export const updateUserSettings = createAsyncThunk(
  'settings/updateUserSettings',
  async ({ userId, settings }, { rejectWithValue }) => {
    try {
      const response = await api.patch(
        `/users/${userId}/settings`,
        settings
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { 
        message: 'Failed to update settings' 
      });
    }
  }
);

export const resetUserSettings = createAsyncThunk(
  'settings/resetUserSettings',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/users/${userId}/settings/reset`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { 
        message: 'Failed to reset settings' 
      });
    }
  }
);

// Slice
const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    preferences: {
      theme: 'light', // 'light' | 'dark' | 'system'
      language: 'en',
      notifications: {
        email: true,
        push: true,
        sms: false
      },
      privacy: {
        profileVisibility: 'public', // 'public' | 'private' | 'connections'
        dataSharing: false
      }
    },
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    lastUpdated: null
  },
  reducers: {
    // For client-side only updates (not persisted to server)
    setTheme: (state, action) => {
      state.preferences.theme = action.payload;
    },
    toggleNotification: (state, action) => {
      const { type, value } = action.payload;
      state.preferences.notifications[type] = value !== undefined ? value : !state.preferences.notifications[type];
    },
    // Add other immediate update reducers as needed
  },
  extraReducers: (builder) => {
    builder
      // Fetch Settings
      .addCase(fetchUserSettings.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserSettings.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.preferences = action.payload;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(fetchUserSettings.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message;
      })
      
      // Update Settings
      .addCase(updateUserSettings.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserSettings.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.preferences = action.payload;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(updateUserSettings.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message;
      })
      
      // Reset Settings
      .addCase(resetUserSettings.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(resetUserSettings.fulfilled, (state) => {
        state.status = 'succeeded';
        state.preferences = {
          theme: 'light',
          language: 'en',
          notifications: {
            email: true,
            push: true,
            sms: false
          },
          privacy: {
            profileVisibility: 'public',
            dataSharing: false
          }
        };
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(resetUserSettings.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message;
      });
  }
});

// Actions
export const { 
  setTheme, 
  toggleNotification 
} = settingsSlice.actions;

// Selectors
export const selectSettings = (state) => state.settings.preferences;
export const selectTheme = (state) => state.settings.preferences.theme;
export const selectNotifications = (state) => state.settings.preferences.notifications;
export const selectSettingsStatus = (state) => state.settings.status;
export const selectSettingsError = (state) => state.settings.error;
export const selectLastUpdated = (state) => state.settings.lastUpdated;

// Reducer
export default settingsSlice.reducer;