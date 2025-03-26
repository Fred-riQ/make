import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { productAPI } from '../../api/api';

export default function ProductForm({ open, onClose, product, storeId, refreshProducts }) {
  const [formData, setFormData] = useState({
    name: '',
    buying_price: '',
    selling_price: '',
    quantity: '',
    expiry_date: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form when product prop changes
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        buying_price: product.buying_price || '',
        selling_price: product.selling_price || '',
        quantity: product.quantity || '',
        expiry_date: product.expiry_date || ''
      });
    } else {
      setFormData({
        name: '',
        buying_price: '',
        selling_price: '',
        quantity: '',
        expiry_date: ''
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Product name is required';
    if (!formData.buying_price || isNaN(formData.buying_price)) newErrors.buying_price = 'Valid buying price required';
    if (!formData.selling_price || isNaN(formData.selling_price)) newErrors.selling_price = 'Valid selling price required';
    if (!formData.quantity || isNaN(formData.quantity)) newErrors.quantity = 'Valid quantity required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const productData = {
        ...formData,
        buying_price: parseFloat(formData.buying_price),
        selling_price: parseFloat(formData.selling_price),
        quantity: parseInt(formData.quantity),
      };

      if (product) {
        // Update existing product
        await productAPI.updateProduct(product.id, productData);
      } else {
        // Create new product
        await productAPI.addProduct(storeId, productData);
      }

      refreshProducts();
      onClose();
    } catch (error) {
      console.error('Error saving product:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{product ? 'Edit Product' : 'Add New Product'}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            margin="dense"
            name="name"
            label="Product Name"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
            required
          />

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <TextField
              margin="dense"
              name="buying_price"
              label="Buying Price"
              type="number"
              fullWidth
              variant="outlined"
              value={formData.buying_price}
              onChange={handleChange}
              error={!!errors.buying_price}
              helperText={errors.buying_price}
              required
              inputProps={{ step: "0.01" }}
            />

            <TextField
              margin="dense"
              name="selling_price"
              label="Selling Price"
              type="number"
              fullWidth
              variant="outlined"
              value={formData.selling_price}
              onChange={handleChange}
              error={!!errors.selling_price}
              helperText={errors.selling_price}
              required
              inputProps={{ step: "0.01" }}
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <TextField
              margin="dense"
              name="quantity"
              label="Quantity"
              type="number"
              fullWidth
              variant="outlined"
              value={formData.quantity}
              onChange={handleChange}
              error={!!errors.quantity}
              helperText={errors.quantity}
              required
            />

            <TextField
              margin="dense"
              name="expiry_date"
              label="Expiry Date"
              type="date"
              fullWidth
              variant="outlined"
              value={formData.expiry_date}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" color="primary" variant="contained" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Product'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}