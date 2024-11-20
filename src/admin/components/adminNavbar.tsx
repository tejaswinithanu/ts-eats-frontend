import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Drawer, Avatar, Typography, Button, Dialog, Box, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changeMode } from './../../store/authSlice';
import { shortName } from './../../utils/formatName';

export const AdminNavbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const {activeAction}=useSelector((state:any)=>state.adminSlice)
  const dispatch=useDispatch()
  const navigate=useNavigate()

  const username = sessionStorage.getItem('username') || 'User';
  const userImage = sessionStorage.getItem('userImage'); 

  const toggleDrawer = (open:any) => () => {
    setDrawerOpen(open);
  };

  const handleLogoutConfirm = () => {
    sessionStorage.clear(); 
    dispatch(changeMode('login'));
    navigate('/login')
  };

  const handleLogoutClick = () => {
    setLogoutDialogOpen(true);
  };
  
  const closeLogoutDialog = () => {
    setLogoutDialogOpen(false);
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: 'var(--primary-color)', color: '#333', boxShadow: 'none', px:{xs:3,lg:5}}}>
        <Toolbar sx={{height:'15vh', padding: activeAction
                ? "0px"
                : { xs: "0px", lg: "15px 12vw" },}}>
          <Typography variant="h5" sx={{ flexGrow: 1, color: '#333', fontWeight: 'bold', fontFamily:'Lucida Handwriting' }}>
            {activeAction !== "" ? (activeAction): 'TS Eats'}
          </Typography> 
          <IconButton  sx={{paddingLeft:'15px', borderLeft:'1px solid gray', borderRadius:'0'}} color="inherit" onClick={toggleDrawer(true)}>
            <Typography variant="h5" sx={{ marginRight: 1 }}>{username}</Typography>
            {userImage ? (
              <Avatar sx={{width:'50px'}} src={userImage} alt={username} />
            ) : (
              <Avatar sx={{ width: '40px', height:'40px', bgcolor: '#6f7070' }}>
                {shortName()}
              </Avatar>
            )}
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <div style={{ width: 250, padding: 20 }}>
          <Avatar alt={username} style={{ margin: 'auto', width: 60, height: 60 }}>
            {userImage || shortName()}
          </Avatar>
          <Typography variant="h6" align="center">{username}</Typography>
          <Typography variant="body2" align="center">{sessionStorage.getItem('userEmail')}</Typography>
          {/* <Button fullWidth variant="outlined" color="primary" sx={{ mt: 1 , color:'var(--primary-color)', borderColor:'var(--primary-color)'}} style={{ marginTop: 20 }}>
            Profile Settings
          </Button> */}
          <Button fullWidth variant="contained" sx={{ mt: 1, backgroundColor:'var(--primary-color)' }} onClick={handleLogoutClick}>
            Logout
          </Button>
        </div>
      </Drawer>

      <Dialog open={logoutDialogOpen} onClose={closeLogoutDialog}>
        <Box sx={{ border: '5px double var(--primary-color)', borderRadius: '5px' }}>
          <DialogTitle>Confirm Logout</DialogTitle>
          <DialogContent>
            <DialogContentText>Are you sure you want to log out?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeLogoutDialog} color="warning">Cancel</Button>
            <Button onClick={handleLogoutConfirm} color="warning" autoFocus>Confirm</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
};  
