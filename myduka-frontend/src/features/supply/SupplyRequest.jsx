import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchSupplyRequests, 
  updateSupplyRequest 
} from './SupplySlice';
import { DataGrid } from '@mui/x-data-grid';

const requestColumns = [
  { field: 'productName', headerName: 'Product', width: 200 },
  { field: 'quantity', headerName: 'Quantity', width: 120 },
  { field: 'requestedBy', headerName: 'Requested By', width: 200 },
  { field: 'status', headerName: 'Status', width: 150 },
  { 
    field: 'actions', 
    headerName: 'Actions', 
    width: 200,
    renderCell: (params) => {
      const dispatch = useDispatch();
      
      const handleApprove = () => {
        dispatch(updateSupplyRequest({ id: params.row.id, status: 'approved' }));
      };
      
      const handleReject = () => {
        dispatch(updateSupplyRequest({ id: params.row.id, status: 'rejected' }));
      };
      
      return (
        <div>
          <button onClick={handleApprove}>Approve</button>
          <button onClick={handleReject}>Reject</button>
        </div>
      );
    }
  }
];

export default function SupplyRequests() {
  const dispatch = useDispatch();
  const { requests, status, error } = useSelector((state) => state.supply);

  useEffect(() => {
    dispatch(fetchSupplyRequests());
  }, [dispatch]);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <h2>Supply Requests</h2>
      {status === 'loading' && <p>Loading requests...</p>}
      {error && <p className="error">{error}</p>}
      <DataGrid
        rows={requests}
        columns={requestColumns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
}