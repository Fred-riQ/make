import { createSlice, createAsyncThunk, createSelector, isAnyOf } from '@reduxjs/toolkit';
import api from '../../api/api';

// Helper function for API error handling
const handleApiError = (error) => {
  return error.response?.data || { 
    message: 'An unexpected error occurred. Please try again.' 
  };
};

// Async Thunks
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      return response.data;
    } catch (err) {
      return rejectWithValue(handleApiError(err));
    }
  }
);

export const registerAdmin = createAsyncThunk(
  'auth/registerAdmin',
  async ({ token, userData }, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `/auth/register-admin?token=${token}`, 
        userData
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(handleApiError(err));
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (err) {
      return rejectWithValue(handleApiError(err));
    }
  }
);

export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, { rejectWithValue, getState }) => {
    try {
      const { token } = getState().auth;
      const response = await api.post('/auth/refresh-token', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(handleApiError(err));
    }
  }
);

export const verifyEmail = createAsyncThunk(
  'auth/verifyEmail',
  async (verificationToken, { rejectWithValue }) => {
    try {
      const response = await api.get(`/auth/verify-email?token=${verificationToken}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(handleApiError(err));
    }
  }
);

export const requestPasswordReset = createAsyncThunk(
  'auth/requestPasswordReset',
  async (email, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/request-password-reset', { email });
      return response.data;
    } catch (err) {
      return rejectWithValue(handleApiError(err));
    }
  }
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({ token, newPassword }, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/reset-password', { 
        token, 
        newPassword 
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(handleApiError(err));
    }
  }
);

// Slice Configuration
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('token') || null,
    refreshToken: localStorage.getItem('refreshToken') || null,
    status: 'idle',
    error: null,
    isAuthenticated: false,
    emailVerified: false,
    role: null
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.emailVerified = false;
      state.role = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    setAuthState: (state, action) => {
      if (action.payload) {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.isAuthenticated = !!action.payload.token;
        state.emailVerified = action.payload.emailVerified || false;
        state.role = action.payload.user?.role || null;
      }
    }
  },
  extraReducers: (builder) => {
    // First handle all specific fulfilled cases
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.isAuthenticated = true;
        state.emailVerified = action.payload.emailVerified || false;
        state.role = action.payload.user?.role || null;
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(registerAdmin.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.emailVerified = action.payload.emailVerified || false;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(verifyEmail.fulfilled, (state) => {
        state.emailVerified = true;
        if (state.user) {
          state.user.emailVerified = true;
        }
      });

    // Then add matchers for pending/rejected states
    builder
      .addMatcher(
        isAnyOf(
          login.pending,
          registerAdmin.pending,
          registerUser.pending,
          refreshToken.pending,
          verifyEmail.pending,
          requestPasswordReset.pending,
          resetPassword.pending
        ),
        (state) => {
          state.status = 'loading';
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          login.rejected,
          registerAdmin.rejected,
          registerUser.rejected,
          refreshToken.rejected,
          verifyEmail.rejected,
          requestPasswordReset.rejected,
          resetPassword.rejected
        ),
        (state, action) => {
          state.status = 'failed';
          state.error = action.payload?.message || 'An error occurred';
        }
      );
  }
});

// Selectors
const selectAuthState = (state) => state.auth;

export const selectCurrentUser = createSelector(
  [selectAuthState],
  (auth) => auth.user
);

export const selectCurrentToken = createSelector(
  [selectAuthState],
  (auth) => auth.token
);

export const selectIsAuthenticated = createSelector(
  [selectAuthState],
  (auth) => auth.isAuthenticated
);

export const selectAuthStatus = createSelector(
  [selectAuthState],
  (auth) => auth.status
);

export const selectAuthError = createSelector(
  [selectAuthState],
  (auth) => auth.error
);

export const selectCurrentRole = createSelector(
  [selectAuthState],
  (auth) => auth.role || auth.user?.role
);

export const selectUserRole = createSelector(
  [selectCurrentUser],
  (user) => user?.role
);

export const selectEmailVerified = createSelector(
  [selectAuthState],
  (auth) => auth.emailVerified
);

// Actions
export const { logout, clearError, setAuthState } = authSlice.actions;

// Reducer
export default authSlice.reducer;