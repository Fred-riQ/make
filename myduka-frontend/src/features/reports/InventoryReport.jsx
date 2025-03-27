import React from 'react';
import { Box, Typography } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const inventoryData = [
  { name: 'In Stock', value: 400 },
  { name: 'Low Stock', value: 100 },
  { name: 'Out of Stock', value: 50 },
];

const COLORS = ['#0088FE', '#FFBB28', '#FF8042'];

export default function InventoryReport() {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Inventory Status
      </Typography>
      <Box sx={{ height: 400 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={inventoryData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {inventoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
}