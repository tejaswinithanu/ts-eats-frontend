import React from 'react';
import { Box, Card, CardContent, Typography, Grid } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateActiveAction } from './../../store/adminSlice';
import { AdminNavbar } from './adminNavbar';

export const AdminLandingPage: React.FC = () => {
  const {adminActions}=useSelector((state:any)=>state.adminSlice)
  const navigate=useNavigate()
  const dispatch=useDispatch();

  const handleActionClick=(url:any, action:any)=>{
    dispatch(updateActiveAction(action))
    navigate(url)
  }

  return (
    <Box>
      <AdminNavbar/>
      <Box sx={{backgroundColor:'#dee0e3', minHeight:'85vh', height:'85vh', overflow:'auto',
                '&::-webkit-scrollbar': {
                display: 'none', // Hide scrollbar
                }
            }}>
            <Box sx={{
                padding: { xs: "10px", lg: "15px 12vw" }, 
            }}>
      
            {/* Welcome Message */}
            <Typography variant="h4" align="center" gutterBottom>
              Welcome to the Admin Dashboard
            </Typography>
            <Typography variant="subtitle1" align="center" color="textSecondary" mb={4}>
              Manage users, menu, and orders from here.
            </Typography>

            {/* Management Cards */}
            <Grid container spacing={3} justifyContent="center">
                
              
                {adminActions.map((action:any)=>(
                  <Grid key={action.actionId} item xs={12} sm={6} md={4}>
                  <Card onClick={()=>handleActionClick(action.redirectTo, action.action)} sx={{cursor:'pointer', height: '100%', textAlign: 'center', padding: '1rem', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}>
                  <action.icon sx={{fontSize:50, color:'var(--primary-color)'}}/>
                  <CardContent>
                    <Typography variant="h6">{action.action}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {action.description}
                    </Typography>
                  </CardContent>
                </Card>
                </Grid>
                ))}
              
            </Grid>
      </Box>
      </Box>
    </Box>   
  );
};


