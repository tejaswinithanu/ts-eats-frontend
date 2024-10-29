import React from 'react';
import { Box, Typography, Button, useMediaQuery, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        height: '80vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        color: '#fff',
        textAlign: 'center',
        padding: isSmallScreen ? '0 1rem' : '0',
        overflow: 'hidden', // Ensures the pseudo-element doesn’t overflow
      }}
    >
      <Typography variant={isSmallScreen ? 'h4' : 'h2'} gutterBottom sx={{ fontWeight: 'bold' }}>
        Welcome to{' '}
        <Typography variant={isSmallScreen ? 'h4' : 'h2'} component='span' 
        sx={{
          background: 'linear-gradient(45deg, #ff357a, #fff172)', 
          WebkitBackgroundClip: 'text', 
          backgroundClip: 'text', 
          color: 'transparent',
          fontWeight:'bold'
        }}
        >
        TS Eats
        </Typography>
      </Typography>
      <Typography variant={isSmallScreen ? 'h6' : 'h5'} gutterBottom>
        A taste of tradition, Awake your taste buds
      </Typography>
      <Button variant="contained" color="primary" size="large" sx={{ mt: 3,background: 'linear-gradient(45deg, #ff357a, #fff172)' }}>
        <Link style={{textDecoration:'none',color:'white'}} to="/menu">Explore Menu</Link>
      </Button>
    </Box>
  );
};

export default HeroSection;
