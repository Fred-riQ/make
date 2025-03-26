import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Typography, Box, Paper } from '@mui/material';
import InventoryIcon from '@mui/icons-material/Inventory';
import StoreIcon from '@mui/icons-material/Store';
import AssessmentIcon from '@mui/icons-material/Assessment';

export default function Home() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <InventoryIcon fontSize="large" />,
      title: "Inventory Management",
      description: "Track and manage your products with real-time stock updates",
      action: () => navigate('/products')
    },
    {
      icon: <StoreIcon fontSize="large" />,
      title: "Store Analytics",
      description: "View sales performance and inventory reports",
      action: () => navigate('/reports')
    },
    {
      icon: <AssessmentIcon fontSize="large" />,
      title: "Supply Tracking",
      description: "Manage product orders and supplier information",
      action: () => navigate('/supply-requests')
    }
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ 
        textAlign: 'center', 
        my: 4,
        background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
        color: 'white',
        py: 6,
        borderRadius: 2,
        boxShadow: 3
      }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Welcome to MyDuka
        </Typography>
        <Typography variant="h6" component="p">
          Your complete inventory management solution
        </Typography>
      </Box>

      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
        gap: 3,
        my: 4
      }}>
        {features.map((feature, index) => (
          <Paper 
            key={index}
            elevation={3}
            sx={{ 
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              transition: 'transform 0.3s',
              '&:hover': {
                transform: 'scale(1.03)',
                boxShadow: 6
              }
            }}
          >
            <Box sx={{ color: 'primary.main', mb: 2 }}>
              {feature.icon}
            </Box>
            <Typography variant="h5" component="h3" gutterBottom>
              {feature.title}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {feature.description}
            </Typography>
            <Button 
              variant="contained" 
              onClick={feature.action}
              sx={{ mt: 'auto' }}
            >
              Explore
            </Button>
          </Paper>
        ))}
      </Box>

      <Box sx={{ 
        textAlign: 'center', 
        my: 6,
        p: 3,
        backgroundColor: 'background.paper',
        borderRadius: 2
      }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Get Started Today
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Start managing your inventory more efficiently with MyDuka's powerful tools
        </Typography>
        <Button 
          variant="contained" 
          size="large"
          onClick={() => navigate('/dashboard')}
        >
          Go to Dashboard
        </Button>
      </Box>
    </Container>
  );
}