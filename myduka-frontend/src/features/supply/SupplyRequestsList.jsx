import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  DataGrid,
  GridToolbar,
  GridActionsCellItem,
  GridRowModes
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
  Alert
} from '@mui/material';
import {
  Check as ApproveIcon,
  Close as RejectIcon,
  Visibility as ViewIcon,
  Add as AddIcon
} from '@mui/icons-material';
import {
  fetchSupplyRequests,
  approveSupplyRequest,
  rejectSupplyRequest
} from './supplySlice';
import { useNavigate } from 'react-router-dom';

export default function SupplyRequestsList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { requests, status, error } = useSelector(state => state.supply);

  useEffect(() => {
    dispatch(fetchSupplyRequests());
  }, [dispatch]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { 
      field: 'productName', 
      headerName: 'Product', 
      width: 180,
      renderCell: (params) => (
        <Typography fontWeight="medium">{params.value}</Typography>
      )
    },
    { field: 'quantity', headerName: 'Quantity', width: 100 },
    { 
      field: 'requestedBy', 
      headerName: 'Requested By', 
      width: 180,
      valueGetter: (params) => params.row.user?.name || 'Unknown'
    },
    { 
      field: 'status', 
      headerName: 'Status', 
      width: 130,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={
            params.value === 'approved' ? 'success' :
            params.value === 'pending' ? 'warning' : 'error'
          }
          variant="outlined"
          size="small"
        />
      )
    },
    { field: 'createdAt', headerName: 'Date', width: 150 },
    { 
      field: 'actions', 
      headerName: 'Actions', 
      type: 'actions',
      width: 150,
      getActions: (params) => [
        params.row.status === 'pending' && (
          <GridActionsCellItem
            icon={<ApproveIcon color="success" />}
            label="Approve"
            onClick={() => dispatch(approveSupplyRequest(params.id))}
          />
        ),
        params.row.status === 'pending' && (
          <GridActionsCellItem
            icon={<RejectIcon color="error" />}
            label="Reject"
            onClick={() => dispatch(rejectSupplyRequest(params.id))}
          />
        ),
        <GridActionsCellItem
          icon={<ViewIcon />}
          label="View"
          onClick={() => navigate(`/supply-requests/${params.id}`)}
        />
      ].filter(Boolean) // Remove false values from conditional rendering
    }
  ];

  return (
    <Box sx={{ height: 600, width: '100%', p: 2 }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 2
      }}>
        <Typography variant="h5" component="h1">
          Supply Requests
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/supply-requests/new')}
        >
          New Request
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <DataGrid
        rows={requests}
        columns={columns}
        loading={status === 'loading'}
        components={{ Toolbar: GridToolbar }}
        initialState={{
          sorting: {
            sortModel: [{ field: 'createdAt', sort: 'desc' }],
          },
        }}
      />
    </Box>
  );
}