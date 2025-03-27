import React, { useEffect, useState } from 'react';
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  LockReset as ResetPasswordIcon
} from '@mui/icons-material';
import { 
  fetchUsers,
  deleteUser,
  updateUserRole,
  resetUserPassword
} from './adminSlice';

export default function UserManagement() {
  const dispatch = useDispatch();
  const { users, status, error } = useSelector(state => state.admin);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [passwordResetDialog, setPasswordResetDialog] = useState(false);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { 
      field: 'role', 
      headerName: 'Role', 
      width: 130,
      editable: true,
      type: 'singleSelect',
      valueOptions: ['merchant', 'admin', 'clerk']
    },
    { 
      field: 'status', 
      headerName: 'Status', 
      width: 120,
      renderCell: (params) => (
        <Box
          sx={{
            color: params.value === 'active' ? 'success.main' : 'error.main',
            fontWeight: 'bold'
          }}
        >
          {params.value}
        </Box>
      )
    },
    { 
      field: 'actions', 
      headerName: 'Actions', 
      type: 'actions',
      width: 150,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          onClick={() => {
            setSelectedUser(params.row);
            setOpenDialog(true);
          }}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon color="error" />}
          label="Delete"
          onClick={() => {
            if (window.confirm(`Delete user ${params.row.name}?`)) {
              dispatch(deleteUser(params.id));
            }
          }}
        />,
        <GridActionsCellItem
          icon={<ResetPasswordIcon />}
          label="Reset Password"
          onClick={() => {
            setSelectedUser(params.row);
            setPasswordResetDialog(true);
          }}
        />
      ]
    }
  ];

  const handleRoleChange = async (params, event) => {
    await dispatch(updateUserRole({
      userId: params.id,
      role: event.target.value
    }));
    dispatch(fetchUsers());
  };

  const handleResetPassword = async () => {
    await dispatch(resetUserPassword(selectedUser.id));
    setPasswordResetDialog(false);
  };

  return (
    <Box sx={{ height: 600, width: '100%', p: 2 }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 2
      }}>
        <Typography variant="h5" component="h1">
          User Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setSelectedUser(null);
            setOpenDialog(true);
          }}
        >
          Add User
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <DataGrid
        rows={users}
        columns={columns}
        loading={status === 'loading'}
        components={{ Toolbar: GridToolbar }}
        experimentalFeatures={{ newEditingApi: true }}
        processRowUpdate={handleRoleChange}
        onProcessRowUpdateError={(error) => console.error(error)}
      />

      {/* Edit/Create User Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>
          {selectedUser ? 'Edit User' : 'Create New User'}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            variant="standard"
            defaultValue={selectedUser?.name || ''}
          />
          <TextField
            margin="dense"
            label="Email"
            fullWidth
            variant="standard"
            defaultValue={selectedUser?.email || ''}
          />
          {!selectedUser && (
            <TextField
              margin="dense"
              label="Password"
              type="password"
              fullWidth
              variant="standard"
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={() => setOpenDialog(false)}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* Reset Password Dialog */}
      <Dialog open={passwordResetDialog} onClose={() => setPasswordResetDialog(false)}>
        <DialogTitle>
          Reset Password for {selectedUser?.name}
        </DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to reset the password for {selectedUser?.email}?
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            A temporary password will be generated and sent to the user's email.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPasswordResetDialog(false)}>Cancel</Button>
          <Button 
            onClick={handleResetPassword}
            color="warning"
            variant="contained"
          >
            Reset Password
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}