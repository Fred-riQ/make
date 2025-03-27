// src/features/store/StoreManagement.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  DataGrid, 
  GridToolbar,
  GridActionsCellItem 
} from '@mui/x-data-grid';
import {
  Box,
  Typography,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  LinearProgress,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Store as StoreIcon,
  Inventory as InventoryIcon
} from '@mui/icons-material';
import { fetchStores, createStore, updateStore, deleteStore } from './storeSlice';
import StoreForm from './StoreForm';

export default function StoreManagement() {
  const dispatch = useDispatch();
  const { stores, status, error } = useSelector(state => state.store);
  const [openForm, setOpenForm] = useState(false);
  const [currentStore, setCurrentStore] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    dispatch(fetchStores());
  }, [dispatch]);

  const handleSubmit = (storeData) => {
    if (currentStore) {
      dispatch(updateStore({ id: currentStore.id, ...storeData }));
    } else {
      dispatch(createStore(storeData));
    }
    setOpenForm(false);
    setCurrentStore(null);
  };

  const handleDelete = () => {
    dispatch(deleteStore(currentStore.id));
    setConfirmDelete(false);
    setCurrentStore(null);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { 
      field: 'name', 
      headerName: 'Store Name', 
      width: 200,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <StoreIcon color="primary" />
          <Typography fontWeight="medium">{params.value}</Typography>
        </Box>
      )
    },
    { 
      field: 'location', 
      headerName: 'Location', 
      width: 200 
    },
    { 
      field: 'status', 
      headerName: 'Status', 
      width: 130,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={
            params.value === 'active' ? 'success' :
            params.value === 'inactive' ? 'error' : 'warning'
          }
          size="small"
        />
      )
    },
    { 
      field: 'inventoryCount', 
      headerName: 'Inventory', 
      width: 120,
      renderCell: (params) => (
        <Tooltip title="Total products">
          <Chip
            icon={<InventoryIcon fontSize="small" />}
            label={params.value}
            variant="outlined"
          />
        </Tooltip>
      )
    },
    { 
      field: 'actions', 
      headerName: 'Actions', 
      type: 'actions',
      width: 120,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          onClick={() => {
            setCurrentStore(params.row);
            setOpenForm(true);
          }}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon color="error" />}
          label="Delete"
          onClick={() => {
            setCurrentStore(params.row);
            setConfirmDelete(true);
          }}
        />
      ]
    }
  ];

  return (
    <Box sx={{ height: '100%', p: 3 }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 3
      }}>
        <Typography variant="h4" component="h1" gutterBottom>
          <StoreIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
          Store Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenForm(true)}
          sx={{ borderRadius: 2 }}
        >
          Add Store
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {status === 'loading' && <LinearProgress />}

      <Box sx={{ height: 'calc(100vh - 200px)', width: '100%' }}>
        <DataGrid
          rows={stores}
          columns={columns}
          loading={status === 'loading'}
          components={{ Toolbar: GridToolbar }}
          density="comfortable"
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 25, 50]}
          disableRowSelectionOnClick
          sx={{
            '& .MuiDataGrid-cell': {
              py: 1,
            },
            borderRadius: 2,
            boxShadow: 1
          }}
        />
      </Box>

      {/* Store Form Dialog */}
      <Dialog 
        open={openForm} 
        onClose={() => {
          setOpenForm(false);
          setCurrentStore(null);
        }}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {currentStore ? 'Edit Store' : 'Add New Store'}
        </DialogTitle>
        <DialogContent>
          <StoreForm 
            initialValues={currentStore || { 
              name: '',
              location: '',
              status: 'active'
            }}
            onSubmit={handleSubmit}
            onCancel={() => {
              setOpenForm(false);
              setCurrentStore(null);
            }}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={confirmDelete}
        onClose={() => setConfirmDelete(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete {currentStore?.name}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDelete(false)}>Cancel</Button>
          <Button 
            onClick={handleDelete} 
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}