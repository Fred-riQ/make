import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';

export const fetchSupplyRequests = createAsyncThunk(
  'supply/fetchRequests',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/supply');
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const createSupplyRequest = createAsyncThunk(
  'supply/createRequest',
  async (requestData, { rejectWithValue }) => {
    try {
      const response = await api.post('/supply', requestData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateSupplyRequest = createAsyncThunk(
  'supply/updateRequest',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/supply/${id}`, { status });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const supplySlice = createSlice({
  name: 'supply',
  initialState: {
    requests: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSupplyRequests.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSupplyRequests.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.requests = action.payload;
      })
      .addCase(fetchSupplyRequests.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'Failed to fetch requests';
      })
      .addCase(createSupplyRequest.fulfilled, (state, action) => {
        state.requests.push(action.payload);
      })
      .addCase(updateSupplyRequest.fulfilled, (state, action) => {
        const index = state.requests.findIndex(req => req.id === action.payload.id);
        if (index !== -1) {
          state.requests[index] = action.payload;
        }
      });
  }
});

export default supplySlice.reducer;