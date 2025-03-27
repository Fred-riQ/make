import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  DataGrid,
  GridToolbar,
  GridActionsCellItem,
  GridRowModes,
  gridClasses
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
  Snackbar,
  LinearProgress,
  Tooltip
} from '@mui/material';
import {
  Check as ApproveIcon,
  Close as RejectIcon,
  Visibility as ViewIcon,
  Add as AddIcon,
  Edit as EditIcon
} from '@mui/icons-material';
import {
  fetchSupplyRequests,
  approveSupplyRequest,
  rejectSupplyRequest,
  resetSupplyStatus
} from './supplySlice';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

export default function SupplyRequestsList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { requests, status, error, actionStatus } = useSelector(state => state.supply);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Reset status when component unmounts
  useEffect(() => {
    return () => {
      dispatch(resetSupplyStatus());
    };
  }, [dispatch]);

  // Fetch requests on mount
  useEffect(() => {
    dispatch(fetchSupplyRequests());
  }, [dispatch]);

  // Handle action status changes
  useEffect(() => {
    if (actionStatus === 'approve-success') {
      setSnackbar({ open: true, message: 'Request approved successfully', severity: 'success' });
      dispatch(resetSupplyStatus());
    } else if (actionStatus === 'reject-success') {
      setSnackbar({ open: true, message: 'Request rejected successfully', severity: 'success' });
      dispatch(resetSupplyStatus());
    } else if (actionStatus === 'approve-error' || actionStatus === 'reject-error') {
      setSnackbar({ open: true, message: error || 'Action failed', severity: 'error' });
    }
  }, [actionStatus, error, dispatch]);

  const handleApprove = (id) => {
    setSelectedRequest(id);
    setOpenDialog(true);
  };

  const handleConfirmAction = (action) => {
    setOpenDialog(false);
    if (action === 'approve') {
      dispatch(approveSupplyRequest(selectedRequest));
    } else {
      dispatch(rejectSupplyRequest(selectedRequest));
    }
  };

  const columns = [
    { 
      field: 'id', 
      headerName: 'ID', 
      width: 70,
      renderCell: (params) => `#${params.value}`
    },
    { 
      field: 'productName', 
      headerName: 'Product', 
      width: 180,
      renderCell: (params) => (
        <Typography fontWeight="medium" noWrap>
          {params.value}
        </Typography>
      )
    },
    { 
      field: 'quantity', 
      headerName: 'Qty', 
      width: 80,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color="primary"
          size="small"
          variant="outlined"
        />
      )
    },
    { 
      field: 'requestedBy', 
      headerName: 'Requester', 
      width: 180,
      valueGetter: (params) => params.row.user?.name || 'Unknown',
      renderCell: (params) => (
        <Typography variant="body2" noWrap>
          {params.value}
        </Typography>
      )
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
    { 
      field: 'createdAt', 
      headerName: 'Date', 
      width: 150,
      valueFormatter: (params) => dayjs(params.value).format('DD MMM YYYY'),
      renderCell: (params) => (
        <Typography variant="body2">
          {dayjs(params.value).format('DD MMM YYYY')}
        </Typography>
      )
    },
    { 
      field: 'actions', 
      headerName: 'Actions', 
      type: 'actions',
      width: 150,
      getActions: (params) => [
        params.row.status === 'pending' && (
          <Tooltip title="Approve" key="approve">
            <GridActionsCellItem
              icon={<ApproveIcon color="success" />}
              label="Approve"
              onClick={() => handleApprove(params.id)}
              disabled={status === 'loading'}
            />
          </Tooltip>
        ),
        params.row.status === 'pending' && (
          <Tooltip title="Reject" key="reject">
            <GridActionsCellItem
              icon={<RejectIcon color="error" />}
              label="Reject"
              onClick={() => handleApprove(params.id)}
              disabled={status === 'loading'}
            />
          </Tooltip>
        ),
        <Tooltip title="View details" key="view">
          <GridActionsCellItem
            icon={<ViewIcon color="info" />}
            label="View"
            onClick={() => navigate(`/supply-requests/${params.id}`)}
          />
        </Tooltip>,
        <Tooltip title="Edit" key="edit">
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            onClick={() => navigate(`/supply-requests/${params.id}/edit`)}
            disabled={params.row.status !== 'pending'}
          />
        </Tooltip>
      ].filter(Boolean)
    }
  ];

  return (
    <Box sx={{ height: 'calc(100vh - 200px)', width: '100%', p: 3 }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 3
      }}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Supply Requests
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/supply-requests/new')}
          sx={{ 
            borderRadius: 2,
            px: 3,
            py: 1
          }}
        >
          Create Request
        </Button>
      </Box>

      {status === 'loading' && <LinearProgress />}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <DataGrid
        rows={requests}
        columns={columns}
        loading={status === 'loading'}
        components={{ 
          Toolbar: GridToolbar,
          LoadingOverlay: LinearProgress
        }}
        sx={{
          [`& .${gridClasses.cell}`]: {
            py: 1.5,
          },
          borderRadius: 2,
          boxShadow: 1
        }}
        initialState={{
          sorting: {
            sortModel: [{ field: 'createdAt', sort: 'desc' }],
          },
          pagination: {
            pageSize: 10,
          },
        }}
        pageSizeOptions={[10, 25, 50]}
        disableRowSelectionOnClick
      />

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirm Action</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to perform this action?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button 
            onClick={() => handleConfirmAction('approve')} 
            color="success"
            variant="contained"
          >
            Approve
          </Button>
          <Button 
            onClick={() => handleConfirmAction('reject')} 
            color="error"
            variant="outlined"
          >
            Reject
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert 
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}