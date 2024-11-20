import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItemText,
  ListItemIcon,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Avatar,
  Box,
  Button,
  ListItemButton,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  RestaurantMenu as RestaurantMenuIcon,
  Info as InfoIcon,
  AccountCircle,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { changeMode } from './../../store/authSlice';
import { keyframes } from '@mui/system';
import { shortName } from './../../utils/formatName';

const colorChangeAnimation = keyframes`
  0% { color: #ff357a; }
  25% { color: #fff172; }
  50% { color: #4caf50; }
  75% { color: #2196f3; }
  100% { color: #ff357a; }
`;

let tabsList = [
  { tabId: 'home', tabName: 'Home', redirectUrl: '/', icon: <HomeIcon />, isActive:false },
  { tabId: 'menu', tabName: 'Menu', redirectUrl: '/menu', icon: <RestaurantMenuIcon />, isActive:false },
];

const Navbar: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [profileDrawerOpen, setProfileDrawerOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // Current URL path
  const username = sessionStorage.getItem('username');
  const userPic = sessionStorage.getItem('userImg');
  const [tabs, setTabs] = useState(tabsList);

  // Highlight active tab based on current location
  useEffect(() => {
    const updatedTabs = tabs.map((tab) => ({
      ...tab,
      isActive: location.pathname === tab.redirectUrl,
    }));
    setTabs(updatedTabs);
  }, [location.pathname]);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const toggleProfileDrawer = (open: boolean) => () => {
    setProfileDrawerOpen(open);
  };

  const handleLogoutConfirm = () => {
    sessionStorage.clear();
    const azureLogoutUrl = `https://login.microsoftonline.com/${process.env.REACT_APP_TENANT_ID}/oauth2/v2.0/logout?post_logout_redirect_uri=${encodeURIComponent(
      'http://localhost:3000/login'
    )}`;
    window.location.href = azureLogoutUrl;
    dispatch(changeMode('login'));
  };

  const handleLogoutClick = () => {
    setLogoutDialogOpen(true);
  };

  const closeLogoutDialog = () => {
    setLogoutDialogOpen(false);
  };

  return (
    <AppBar position="relative" color="transparent" elevation={0}>
      <Toolbar sx={{ padding: isMobile ? '0 10px' : '0 20px' }}>
        <Typography
          variant={isMobile ? 'h6' : 'h5'}
          sx={{
            flexGrow: 1,
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #ff357a, #fff172)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            animation: `${colorChangeAnimation} 3s ease infinite`,
            backgroundSize: '200% 200%',
            fontFamily: 'Lucida Handwriting',
            fontSize: isMobile ? '1.2rem' : '1.5rem',
          }}
        >
          TS Eats
        </Typography>

        {isMobile ? (
          <>
            <IconButton sx={{ color: 'white' }} edge="end" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
              <List sx={{ width: 200 }}>
                {tabs.map((tab) => (
                  <ListItemButton
                    component={Link}
                    to={tab.redirectUrl}
                    key={tab.tabName}
                    onClick={toggleDrawer(false)}
                  >
                    <ListItemIcon>{tab.icon}</ListItemIcon>
                    <ListItemText primary={tab.tabName} />
                  </ListItemButton>
                ))}
              </List>
              <Button onClick={handleLogoutClick} color="inherit" sx={{ bgcolor: '#ebba34' }}>
                Logout
              </Button>
            </Drawer>
          </>
        ) : (
          <>
            {tabs.map((eachTab) => (
              <Button
                key={eachTab.tabId}
                color="inherit"
                sx={{ color: eachTab.isActive ? 'var(--primary-color)' : 'white' }}
              >
                <Link
                  className="link-item"
                  style={{ color: 'inherit', textDecoration: 'none' }}
                  to={eachTab.redirectUrl}
                >
                  {eachTab.tabName}
                </Link>
              </Button>
            ))}

            <Box
              display="flex"
              alignItems="center"
              onClick={toggleProfileDrawer(true)}
              sx={{ cursor: 'pointer', ml: 2, pl: 1, borderLeft: '1px solid #aeb0af' }}
            >
              <Typography variant="body1" sx={{ mr: 1, color: 'white' }}>
                {username}
              </Typography>
              <Avatar src={userPic || ''} alt={username || ''}>
                {!userPic && shortName()}
              </Avatar>
            </Box>
          </>
        )}
      </Toolbar>

       {/* Profile Drawer */}
       <Drawer anchor="right" open={profileDrawerOpen} onClose={toggleProfileDrawer(false)}>
        <Box sx={{ width: isMobile ? 200 : 250, padding: 2 }}>
          <Avatar src={userPic || ''} alt={username || ''} sx={{ margin: 'auto', width: isMobile ? 40 : 60, height: isMobile ? 40 : 60 }}>
            {!userPic && shortName()}
          </Avatar>
          <Typography variant="h6" align="center">{username}</Typography>
          {/* <Button fullWidth variant="outlined" sx={{ mt: 2, color: 'var(--primary-color)', borderColor: 'var(--primary-color)' }}>
            Profile
          </Button> */}
          <Button fullWidth variant="outlined" sx={{ mt: 1, color: 'var(--primary-color)', borderColor: 'var(--primary-color)' }} onClick={() => navigate('/orders')}>
            My Orders
          </Button>
          <Button fullWidth variant="contained" sx={{ mt: 1, backgroundColor: 'var(--primary-color)' }} onClick={handleLogoutClick}>
            Logout
          </Button>
        </Box>
      </Drawer>

      {/* Logout Dialog */}
      <Dialog open={logoutDialogOpen} onClose={closeLogoutDialog}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to log out?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeLogoutDialog} color="warning">
            Cancel
          </Button>
          <Button onClick={handleLogoutConfirm} color="warning" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  );
};

export default Navbar;
