import React from 'react';
import { Box, Typography, IconButton, useTheme, useMediaQuery } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

const Footer: React.FC = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        padding: isSmallScreen ? '1rem' : '2rem',
        backgroundColor: '#333',
        color: '#fff',
        textAlign: 'center',
      }}
    >
      <Typography variant="body2">
        &copy; {new Date().getFullYear()} TS Eats. All rights reserved.
      </Typography>
      <Box sx={{ mt: 1 }}>
        <IconButton color="inherit" href="https://facebook.com">
          <FacebookIcon />
        </IconButton>
        <IconButton color="inherit" href="https://instagram.com">
          <InstagramIcon />
        </IconButton>
        <IconButton color="inherit" href="https://twitter.com">
          <TwitterIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Footer;
