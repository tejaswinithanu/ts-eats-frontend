import React from 'react';
import { Box, Typography, Button, useMediaQuery, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'; // Import Play icon

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
        flexDirection: { xs: 'column', lg: 'row' },
        color: '#fff',
        textAlign: 'center',
        padding: isSmallScreen ? '0 1rem' : '0',
        overflow: 'hidden', // Ensures the pseudo-element doesn’t overflow
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: { xs: 'center', lg: 'flex-start' },
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <Typography
          sx={{ fontWeight: 'bold', fontFamily: 'Times New Roman' }}
          variant={isSmallScreen ? 'h5' : 'h3'}
          gutterBottom
        >
          Welcome to{' '}
          <Typography
            variant={isSmallScreen ? 'h5' : 'h3'}
            component='span'
            sx={{
              background: 'linear-gradient(45deg, #ff357a, #fff172)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              fontWeight: 'bold',
              fontFamily: 'Times New Roman',
            }}
          >
            TS Eats
          </Typography>
        </Typography>
        <Typography sx={{ fontSize: { xs: '12px', lg: '15px' } }} variant={isSmallScreen ? 'h6' : 'h5'} gutterBottom>
          A taste of tradition, Awake your taste buds
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{ mt: 3, background: 'linear-gradient(45deg, #ff357a, #fff172)' }}
        >
          <Link style={{ textDecoration: 'none', color: 'white' }} to="/menu">
            Explore Menu
          </Link>
        </Button>
      </Box>

      <Box
        sx={{
          width: { xs: '100%', sm: '70%', md: '50%' }, // Adjust width based on breakpoints
          height: 'auto', // Keeps the aspect ratio
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          order: { xs: '-1', lg: '0' },
          position: 'relative', // Enable absolute positioning for children
        }}
      >
        <a href="https://youtu.be/2-5du2oVM5g?si=F6WRwjyKpO8o8to3" target="_blank" rel="noopener noreferrer">
          <img
            alt="food"
            src="https://res.cloudinary.com/dqqijdyjr/image/upload/v1730718262/food1-removebg-preview_gkqfoa.png"
            style={{ width: '100%', height: 'auto', objectFit: 'cover' }} // Ensures image takes full width
          />
          {/* Overlaying the play button */}
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              bgcolor: 'rgba(0, 0, 0, 0.5)', // Optional background for better visibility
              borderRadius: '50%', // Make it circular
              p: 1, // Padding for the icon
            }}
          >
            <PlayCircleOutlineIcon sx={{ color: 'white', fontSize: '3rem' }} />
          </Box>
        </a>
      </Box>
    </Box>
  );
};

export default HeroSection;
