import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { keyframes } from "@mui/system";

const colorChangeAnimation = keyframes`
  0% { color: #ff357a; }
  25% { color: #fff172; }
  50% { color: #4caf50; }
  75% { color: #2196f3; }
  100% { color: #ff357a; }
`;


const Navbar: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  return (
    <AppBar position="sticky" color="transparent" elevation={0}>
      <Toolbar>
        <Typography variant="h5" 
        sx={{ 
          flexGrow: 1, 
          fontWeight: 'bold' ,
          background: 'linear-gradient(45deg, #ff357a, #fff172)', // Gradient color for text
          WebkitBackgroundClip: 'text', // For Safari
          backgroundClip: 'text', // For other browsers
          color: 'transparent', 
          animation: `${colorChangeAnimation} 3s ease infinite`,
          backgroundSize: '200% 200%',
        }}>
          TS Eats
        </Typography>
        {isMobile ? (
          <>
            <IconButton edge="end" color="inherit" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer sx={{ '& .MuiDrawer-paper': { width: 200 } }} anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
              <List>
                {['Home', 'Menu', 'About Us', 'Contact'].map((text) => (
                  <ListItem component="div" key={text} onClick={toggleDrawer(false)}>
                  <ListItemText primary={text} />
                </ListItem>
                
                ))}
              </List>
            </Drawer>
          </>
        ) : (
          <>
            <Button color="inherit">Home</Button>
            <Button color="inherit">Menu</Button>
            <Button color="inherit">About Us</Button>
            <Button color="inherit">Contact</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
