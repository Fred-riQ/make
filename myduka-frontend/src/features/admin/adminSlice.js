import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';

// Async Thunks
export const fetchUsers = createAsyncThunk(
  'admin/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/admin/users');
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: 'Failed to fetch users' });
    }
  }
);

export const createUser = createAsyncThunk(
  'admin/createUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post('/admin/users', userData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: 'User creation failed' });
    }
  }
);

export const updateUser = createAsyncThunk(
  'admin/updateUser',
  async ({ userId, userData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/admin/users/${userId}`, userData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: 'Update failed' });
    }
  }
);

export const deleteUser = createAsyncThunk(
  'admin/deleteUser',
  async (userId, { rejectWithValue }) => {
    try {
      await api.delete(`/admin/users/${userId}`);
      return userId;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: 'Deletion failed' });
    }
  }
);

export const updateUserRole = createAsyncThunk(
  'admin/updateUserRole',
  async ({ userId, role }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/admin/users/${userId}/role`, { role });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: 'Role update failed' });
    }
  }
);

export const resetUserPassword = createAsyncThunk(
  'admin/resetUserPassword',
  async (userId, { rejectWithValue }) => {
    try {
      await api.post(`/admin/users/${userId}/reset-password`);
      return userId;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: 'Password reset failed' });
    }
  }
);

export const toggleUserStatus = createAsyncThunk(
  'admin/toggleUserStatus',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/admin/users/${userId}/status`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: 'Status update failed' });
    }
  }
);

// Slice Configuration
const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    users: [],
    status: 'idle',
    error: null,
    currentUser: null
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    clearAdminError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Users
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message;
      })

      // Create User
      .addCase(createUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message;
      })

      // Update User
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex(user => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })

      // Delete User
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(user => user.id !== action.payload);
      })

      // Update Role
      .addCase(updateUserRole.fulfilled, (state, action) => {
        const user = state.users.find(u => u.id === action.payload.id);
        if (user) {
          user.role = action.payload.role;
        }
      })

      // Reset Password
      .addCase(resetUserPassword.fulfilled, (state, action) => {
        // Can add notification state change here if needed
      })

      // Toggle Status
      .addCase(toggleUserStatus.fulfilled, (state, action) => {
        const user = state.users.find(u => u.id === action.payload.id);
        if (user) {
          user.status = user.status === 'active' ? 'inactive' : 'active';
        }
      });
  }
});

// Selectors
export const selectAllUsers = (state) => state.admin.users;
export const selectAdminStatus = (state) => state.admin.status;
export const selectAdminError = (state) => state.admin.error;
export const selectCurrentEditableUser = (state) => state.admin.currentUser;

// Actions
export const { setCurrentUser, clearAdminError } = adminSlice.actions;

// Reducer
export default adminSlice.reducer;