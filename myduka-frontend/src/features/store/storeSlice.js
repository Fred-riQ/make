// src/features/store/storeSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';

// Async thunks
export const fetchStores = createAsyncThunk(
  'store/fetchStores',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/stores');
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Failed to fetch stores');
    }
  }
);

export const createStore = createAsyncThunk(
  'store/createStore',
  async (storeData, { rejectWithValue }) => {
    try {
      const response = await api.post('/stores', storeData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Failed to create store');
    }
  }
);

export const updateStore = createAsyncThunk(
  'store/updateStore',
  async ({ id, ...storeData }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/stores/${id}`, storeData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Failed to update store');
    }
  }
);

export const deleteStore = createAsyncThunk(
  'store/deleteStore',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/stores/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Failed to delete store');
    }
  }
);

const storeSlice = createSlice({
  name: 'store',
  initialState: {
    stores: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStores.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStores.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.stores = action.payload;
      })
      .addCase(fetchStores.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(createStore.fulfilled, (state, action) => {
        state.stores.push(action.payload);
      })
      .addCase(updateStore.fulfilled, (state, action) => {
        const index = state.stores.findIndex(store => store.id === action.payload.id);
        if (index !== -1) {
          state.stores[index] = action.payload;
        }
      })
      .addCase(deleteStore.fulfilled, (state, action) => {
        state.stores = state.stores.filter(store => store.id !== action.payload);
      });
  }
});

export default storeSlice.reducer;