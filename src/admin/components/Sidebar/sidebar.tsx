import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography, List, ListItemIcon, ListItemText, ListItemButton } from "@mui/material";
import { updateActiveAction } from "../../../store/adminSlice";
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useNavigate } from "react-router-dom";

export const SideBar = () => {
    const dispatch = useDispatch();
    const { adminActions, activeAction } = useSelector((state: any) => state.adminSlice);
    const navigate=useNavigate()
    const handleActionClick = (action: string, url:any) => {
        dispatch(updateActiveAction(action));
        navigate(url)
    };

    const handleDashboardClick=()=>{
        dispatch(updateActiveAction(''))
        navigate('/admin-dashboard')
    }

    const handleLogoClick=()=>{
        dispatch(updateActiveAction(''))
        navigate('/admin-dashboard')
    }

    return (
        <Box 
  sx={{
    minHeight: '100vh', 
    minWidth: "20%", 
    maxWidth: '25%', 
    backgroundColor: "#303030", 
    display: "flex", 
    flexDirection: "column", 
    alignItems: "center",
    padding: '20px', // Use padding instead of margin if it's more suitable
  }}
>
  {/* Logo and Title */}
  <Box 
    onClick={handleLogoClick} 
    sx={{
      cursor: 'pointer',
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'flex-start',
      width: '100%', 
      textAlign: "center", 
      paddingBottom: 1, 
      borderBottom: '1px solid #cfcdca',
      margin: '20px 0', // Apply margin-top and margin-bottom for spacing
    }}
  >
    <Typography variant="h6" sx={{ fontFamily: 'Lucida Handwriting', color: 'white' }}>
      TS Eats
    </Typography>
  </Box>

  {/* Action Tabs */}
  <List>
    <ListItemButton
      onClick={handleDashboardClick}
      sx={{
        backgroundColor: "transparent",
        color: "black",
        marginBottom: "10px", // Use margin for spacing between items
        borderRadius: "5px",
      }}
    >
      <ListItemIcon>
        <DashboardIcon sx={{ color: 'white' }} />
      </ListItemIcon>
      <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'white' }}>
        Admin Dashboard
      </Typography>
    </ListItemButton>

    {adminActions.map((action: any) => (
      <ListItemButton
        key={action.actionId}
        selected={activeAction === action.actionId}
        onClick={() => handleActionClick(action.action, action.redirectTo)}
        sx={{
          backgroundColor: activeAction === action.action ? "white" : "transparent",    
          marginBottom: "10px", // Use margin for spacing
          borderRadius: "5px",
          '&:hover': {
            backgroundColor: activeAction === action.action ? "white" : "transparent" // Removes default hover effect
          }
        }}
      >
        <ListItemIcon>
          <action.icon sx={{ color: activeAction === action.action ? "#303030" : 'white' }} />
        </ListItemIcon>
        <ListItemText sx={{ color: activeAction === action.action ? "#303030" : '#ededeb' }} primary={action.action} />
      </ListItemButton>
    ))}
  </List>
</Box>

    );
};

export default SideBar;
