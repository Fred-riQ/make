import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../../api/api';
import { Button, TextField, Checkbox, Typography, Link, Paper } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { styled } from '@mui/system';

const LoginContainer = styled(Paper)({
  padding: '2rem',
  maxWidth: '450px',
  margin: '2rem auto',
  textAlign: 'center',
});

const FormContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  marginTop: '1.5rem',
});

const RememberMeContainer = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  margin: '1rem 0',
});

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await authAPI.login({ email, password });
      
      // Store token in localStorage
      localStorage.setItem('token', response.data.token);
      
      // Redirect to dashboard
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoginContainer elevation={3}>
      <LockOutlinedIcon color="primary" style={{ fontSize: '2.5rem' }} />
      <Typography variant="h5" gutterBottom>
        Log in to your account
      </Typography>
      
      <Typography variant="body2" color="textSecondary" paragraph>
        Change your Password immediately you log in
      </Typography>
      
      <hr style={{ width: '100%', margin: '1.5rem 0' }} />
      
      <form onSubmit={handleSubmit}>
        <FormContainer>
          <Typography variant="subtitle1" align="left">
            Email
          </Typography>
          <TextField
            variant="outlined"
            placeholder="Enter your email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          
          <Typography variant="subtitle1" align="left" style={{ marginTop: '1rem' }}>
            Password
          </Typography>
          <TextField
            variant="outlined"
            type="password"
            placeholder="Enter your password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          <RememberMeContainer>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Checkbox
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                color="primary"
              />
              <Typography variant="body2">Remember for 30 days</Typography>
            </div>
            <Link href="#" variant="body2">
              Forget password
            </Link>
          </RememberMeContainer>
          
          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}
          
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            disabled={isLoading}
            style={{ marginTop: '1rem' }}
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </Button>
        </FormContainer>
      </form>
      
      <Typography variant="body2" style={{ marginTop: '2rem' }}>
        Don't have log in credentials? <Link href="#">Request to Admin</Link>
      </Typography>
    </LoginContainer>
  );
}