import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { productAPI } from '../../api/api';

// Fetch products
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (storeId, { rejectWithValue }) => {
    try {
      const response = await productAPI.getProducts(storeId);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

// Add product
export const addProduct = createAsyncThunk(
  'products/addProduct',
  async ({ storeId, productData }, { rejectWithValue }) => {
    try {
      const response = await productAPI.addProduct(storeId, productData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

// Delete product
export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (productId, { rejectWithValue }) => {
    try {
      await productAPI.deleteProduct(productId);
      return productId;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      });
  }
});

export default productsSlice.reducer;