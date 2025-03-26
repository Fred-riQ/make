import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, createUser } from './adminSlice';
import { DataGrid } from '@mui/x-data-grid';

const userColumns = [
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'email', headerName: 'Email', width: 250 },
  { field: 'role', headerName: 'Role', width: 150 },
  { field: 'status', headerName: 'Status', width: 150 },
];

export default function AdminPanel() {
  const dispatch = useDispatch();
  const { users, status, error } = useSelector((state) => state.admin);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'clerk',
    password: ''
  });

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleCreateUser = async (e) => {
    e.preventDefault();
    await dispatch(createUser(newUser));
    setNewUser({
      name: '',
      email: '',
      role: 'clerk',
      password: ''
    });
  };

  return (
    <div>
      <h2>User Management</h2>
      
      <div style={{ height: 400, width: '100%', marginBottom: '2rem' }}>
        <DataGrid
          rows={users}
          columns={userColumns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </div>

      <div className="create-user-form">
        <h3>Add New User</h3>
        <form onSubmit={handleCreateUser}>
          <input
            type="text"
            placeholder="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({...newUser, name: e.target.value})}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({...newUser, email: e.target.value})}
            required
          />
          <select
            value={newUser.role}
            onChange={(e) => setNewUser({...newUser, role: e.target.value})}
          >
            <option value="clerk">Clerk</option>
            <option value="admin">Admin</option>
          </select>
          <input
            type="password"
            placeholder="Password"
            value={newUser.password}
            onChange={(e) => setNewUser({...newUser, password: e.target.value})}
            required
          />
          <button type="submit">Create User</button>
        </form>
      </div>
    </div>
  );
}