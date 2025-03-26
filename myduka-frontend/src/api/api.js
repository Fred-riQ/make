import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: 'http://127.0.0.1:5000/api', // Match your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      window.location = '/auth/login';
    }
    return Promise.reject(error);
  }
);

// Authentication API
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  protected: () => api.get('/auth/protected'),
};

// Admin API
export const adminAPI = {
  getUsers: () => api.get('/admin/users'),
  deleteUser: (userId) => api.delete(`/admin/delete_user/${userId}`),
  updateUserRole: (userId, roleData) => api.put(`/admin/update_role/${userId}`, roleData),
};

// Store API
export const storeAPI = {
  createStore: (storeData) => api.post('/stores', storeData),
  getStores: () => api.get('/stores'),
  getStore: (storeId) => api.get(`/stores/${storeId}`),
  updateStore: (storeId, storeData) => api.put(`/stores/${storeId}`, storeData),
  deleteStore: (storeId) => api.delete(`/stores/${storeId}`),
};

// Product API
export const productAPI = {
  addProduct: (storeId, productData) => api.post(`/stores/${storeId}/products`, productData),
  getProducts: (storeId) => api.get(`/stores/${storeId}/products`),
  updateProduct: (productId, productData) => api.put(`/products/${productId}`, productData),
  deleteProduct: (productId) => api.delete(`/products/${productId}`),
};

export default api;