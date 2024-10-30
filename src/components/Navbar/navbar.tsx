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
  ListItemIcon,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import HomeIcon from '@mui/icons-material/Home';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import InfoIcon from '@mui/icons-material/Info';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { keyframes } from "@mui/system";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { changeMode } from '../../store/authSlice';

const colorChangeAnimation = keyframes`
  0% { color: #ff357a; }
  25% { color: #fff172; }
  50% { color: #4caf50; }
  75% { color: #2196f3; }
  100% { color: #ff357a; }
`;

const tabs=[
  {
    tabName:'Home',
    redirectUrl:'/',
    icon:<HomeIcon/>
  },
  {
    tabName:'Menu',
    redirectUrl:'/menu',
    icon:<RestaurantMenuIcon/>
  },
  {
    tabName:'About us',
    redirectUrl:'/about',
    icon:<InfoIcon/>
  },
  {
    tabName:'Home',
    redirectUrl:'/contact',
    icon:<ContactMailIcon/>
  }
]


const Navbar: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const dispatch=useDispatch()
  const navigate=useNavigate()

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const handleLogout=()=>{
    sessionStorage.clear()
    dispatch(changeMode('login'))
    navigate('/login')
  }

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
                {tabs.map((tab) => (
                  <ListItem component="div" key={tab.tabName} onClick={toggleDrawer(false)}>
                    <Link className="link-item-dark" to={tab.redirectUrl}>
                    <ListItemIcon>
                      {tab.icon}
                    </ListItemIcon>
                  <ListItemText primary={tab.tabName} />
                  </Link>
                </ListItem>
                
                ))}
              </List>
              <Button onClick={handleLogout} color='inherit' sx={{bgcolor:'#ebba34'}}>Logout</Button>
            </Drawer>
          </>
        ) : (
          <>
            <Button color="inherit"><Link className='link-item' to="/">Home</Link></Button>
            <Button color="inherit"><Link className='link-item' to="/menu">Menu</Link></Button>
            <Button color="inherit">About Us</Button>
            <Button color="inherit">Contact</Button>
            <Button onClick={handleLogout} color='inherit' sx={{bgcolor:'#ebba34'}}>Logout</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
