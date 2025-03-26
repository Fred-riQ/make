import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import Sidebar from './Sidebar';

const drawerWidth = 240;

export default function Layout() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />
      
      {/* Sidebar */}
      <Sidebar 
        mobileOpen={mobileOpen} 
        handleDrawerToggle={handleDrawerToggle} 
        drawerWidth={drawerWidth} 
      />
      
      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          backgroundColor: '#f5f5f5',
          minHeight: '100vh'
        }}
      >
        <Toolbar /> {/* This pushes content below the AppBar */}
        <Box sx={{ 
          maxWidth: 1200, 
          mx: 'auto',
          py: 2
        }}>
          <Outlet /> {/* This is where child routes will render */}
        </Box>
      </Box>
      
    </Box>
  );
}