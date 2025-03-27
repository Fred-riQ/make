import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';

// Async Thunks
export const fetchSupplyRequests = createAsyncThunk(
  'supply/fetchRequests',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/supply-requests');
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { 
        message: 'Failed to fetch supply requests' 
      });
    }
  }
);

export const approveSupplyRequest = createAsyncThunk(
  'supply/approveRequest',
  async (requestId, { rejectWithValue }) => {
    try {
      const response = await api.patch(
        `/supply-requests/${requestId}/approve`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { 
        message: 'Failed to approve request' 
      });
    }
  }
);

export const rejectSupplyRequest = createAsyncThunk(
  'supply/rejectRequest',
  async (requestId, { rejectWithValue }) => {
    try {
      const response = await api.patch(
        `/supply-requests/${requestId}/reject`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { 
        message: 'Failed to reject request' 
      });
    }
  }
);

// Slice
const supplySlice = createSlice({
  name: 'supply',
  initialState: {
    requests: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    actionStatus: 'idle' // Track specific action states
  },
  reducers: {
    resetSupplyStatus: (state) => {
      state.status = 'idle';
      state.error = null;
      state.actionStatus = 'idle';
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch requests
      .addCase(fetchSupplyRequests.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSupplyRequests.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.requests = action.payload;
      })
      .addCase(fetchSupplyRequests.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message;
      })
      
      // Approve request
      .addCase(approveSupplyRequest.pending, (state) => {
        state.actionStatus = 'approve-loading';
      })
      .addCase(approveSupplyRequest.fulfilled, (state, action) => {
        state.actionStatus = 'approve-success';
        const index = state.requests.findIndex(
          req => req.id === action.payload.id
        );
        if (index !== -1) {
          state.requests[index] = action.payload;
        }
      })
      .addCase(approveSupplyRequest.rejected, (state, action) => {
        state.actionStatus = 'approve-error';
        state.error = action.payload?.message;
      })
      
      // Reject request
      .addCase(rejectSupplyRequest.pending, (state) => {
        state.actionStatus = 'reject-loading';
      })
      .addCase(rejectSupplyRequest.fulfilled, (state, action) => {
        state.actionStatus = 'reject-success';
        const index = state.requests.findIndex(
          req => req.id === action.payload.id
        );
        if (index !== -1) {
          state.requests[index] = action.payload;
        }
      })
      .addCase(rejectSupplyRequest.rejected, (state, action) => {
        state.actionStatus = 'reject-error';
        state.error = action.payload?.message;
      });
  }
});

// Exports
export const { resetSupplyStatus } = supplySlice.actions;
export default supplySlice.reducer;

// Selectors
export const selectAllRequests = (state) => state.supply.requests;
export const selectSupplyStatus = (state) => state.supply.status;
export const selectSupplyError = (state) => state.supply.error;
export const selectActionStatus = (state) => state.supply.actionStatus;