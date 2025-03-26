import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import productsReducer from '../features/products/productsSlice';
import adminReducer from '../features/admin/adminSlice';
import supplyReducer from '../features/supply/SupplySlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    admin: adminReducer,
    supply: supplyReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});