// src/features/reports/reportsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  status: 'idle',
  error: null
};

const reportsSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {
    // Add your reducers here
  },
  // Add extraReducers if needed
});

export default reportsSlice.reducer;