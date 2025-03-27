// src/pages/About.jsx
import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import StoreIcon from '@mui/icons-material/Store';

export default function About() {
  return (
    <Container maxWidth="md">
      <Box sx={{ 
        textAlign: 'center', 
        my: 4,
        py: 4,
        px: 2,
        borderRadius: 2,
        backgroundColor: 'background.paper'
      }}>
        <StoreIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
        <Typography variant="h3" component="h1" gutterBottom>
          About MyDuka
        </Typography>
        <Typography variant="body1" paragraph>
          MyDuka is a comprehensive inventory management system designed to help small and medium-sized 
          businesses streamline their operations. Our platform provides real-time tracking of products, 
          sales, and inventory levels.
        </Typography>
        <Typography variant="body1" paragraph>
          Founded in 2023, our mission is to empower merchants with tools that were previously only 
          accessible to large enterprises. With MyDuka, you can manage your stock, generate reports, 
          and track sales from anywhere.
        </Typography>
        <Typography variant="h5" component="h2" sx={{ mt: 4, mb: 2 }}>
          Key Features
        </Typography>
        <ul style={{ textAlign: 'left', paddingLeft: '20px' }}>
          <li><Typography variant="body1">Real-time inventory tracking</Typography></li>
          <li><Typography variant="body1">Sales and revenue reporting</Typography></li>
          <li><Typography variant="body1">Multi-user access with role-based permissions</Typography></li>
          <li><Typography variant="body1">Supply chain management</Typography></li>
          <li><Typography variant="body1">Mobile-friendly interface</Typography></li>
        </ul>
      </Box>
    </Container>
  );
}