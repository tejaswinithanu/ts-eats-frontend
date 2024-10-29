import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Button,
  ListItemButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useDispatch, useSelector } from 'react-redux';
import { MenuItemCard } from '../MenuItemCard/menuItemCard';
import { getMenuItems } from '../../store/menuSlice';



export const MenuList: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const {menuItems} = useSelector((state:any)=>state.menuSlice)

  const dispatch=useDispatch()

  useEffect(()=>{
    dispatch<any>(getMenuItems())
  },[dispatch])

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const renderMenuItems = () => (
    <List>
      {menuItems.map((item:any) => (
        <MenuItemCard key={item.itemId} item={item}/>
      ))}
    </List>
  );

  return (
    <AppBar sx={{color:'white'}} position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1}}>
          TS Eats
        </Typography>
        {isMobile ? (
          <>
            <IconButton color="inherit" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
              <Box
                sx={{ width: 250 }}
                role="presentation"
                onClick={toggleDrawer(false)}
                onKeyDown={toggleDrawer(false)}
              >
                {renderMenuItems()}
              </Box>
            </Drawer>
          </>
        ) : (
          <Box sx={{ display: 'flex', gap: 2 }}>
            {menuItems.map((item:any) => (
              <Button color="inherit" key={item}>
                {item}
              </Button>
            ))}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};


