import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { Button, IconButton, Snackbar } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { productAPI } from '../../api/api';
import { fetchProducts, deleteProduct } from './productsSlice';
import ProductForm from './ProductForm';

const productColumns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Product Name', width: 200 },
  { field: 'buying_price', headerName: 'Buying Price', width: 130 },
  { field: 'selling_price', headerName: 'Selling Price', width: 130 },
  { field: 'quantity', headerName: 'Quantity', width: 130 },
  { field: 'expiry_date', headerName: 'Expiry Date', width: 150 },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 150,
    renderCell: (params) => (
      <div>
        <IconButton onClick={() => handleEdit(params.row)}>
          <EditIcon color="primary" />
        </IconButton>
        <IconButton onClick={() => handleDelete(params.row.id)}>
          <DeleteIcon color="error" />
        </IconButton>
      </div>
    ),
  },
];

export default function Products() {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.products);
  const [openForm, setOpenForm] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddProduct = () => {
    setCurrentProduct(null);
    setOpenForm(true);
  };

  const handleEdit = (product) => {
    setCurrentProduct(product);
    setOpenForm(true);
  };

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await productAPI.deleteProduct(productId);
        dispatch(deleteProduct(productId));
        setSnackbar({ open: true, message: 'Product deleted successfully' });
      } catch (err) {
        setSnackbar({ open: true, message: err.response?.data?.message || 'Delete failed' });
      }
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <div style={{ height: 600, width: '100%' }}>
      <div className="d-flex justify-content-between mb-3">
        <h2>Product Inventory</h2>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddProduct}
        >
          Add Product
        </Button>
      </div>

      {status === 'loading' && <p>Loading products...</p>}
      {error && <p className="text-danger">{error}</p>}

      <DataGrid
        rows={products}
        columns={productColumns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        disableSelectionOnClick
      />

      <ProductForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        product={currentProduct}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbar.message}
      />
    </div>
  );
}