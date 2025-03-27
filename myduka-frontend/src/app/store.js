import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import productsReducer from '../features/products/productsSlice';
import adminReducer from '../features/admin/adminSlice';
import supplyReducer from '../features/supply/supplySlice'; 
import reportsReducer from '../features/reports/reportsSlice';
import settingsReducer from '../features/settings/settingsSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    admin: adminReducer,
    supply: supplyReducer,
    reports: reportsReducer,
    settings: settingsReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});