import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, Typography } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '80vh',
          textAlign: 'center',
          p: 3
        }}
      >
        <ErrorOutlineIcon 
          sx={{ 
            fontSize: 80, 
            color: 'error.main',
            mb: 2
          }} 
        />
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom
          sx={{ 
            fontWeight: 700,
            color: 'text.primary'
          }}
        >
          404 - Page Not Found
        </Typography>
        <Typography 
          variant="h6" 
          component="p"
          sx={{ 
            mb: 3,
            color: 'text.secondary'
          }}
        >
          Oops! The page you're looking for doesn't exist or has been moved.
        </Typography>
        <Typography 
          variant="body1"
          sx={{ 
            mb: 4,
            color: 'text.secondary'
          }}
        >
          You may have mistyped the address or the page may have been removed.
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/')}
          sx={{
            px: 4,
            py: 1.5,
            fontSize: '1rem',
            textTransform: 'none',
            borderRadius: 2,
            boxShadow: 'none',
            '&:hover': {
              boxShadow: 'none'
            }
          }}
        >
          Return to Homepage
        </Button>
      </Box>
    </Container>
  );
}