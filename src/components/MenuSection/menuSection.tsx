import React, { useEffect, useState } from 'react';
import { Grid,Typography, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getMenuItems } from '../../store/menuSlice';
import { MenuItemCard } from '../MenuItemCard/menuItemCard';
import { getCartItems } from '../../store/userSlice';
import { LoadingView } from '../Loading/loading';
import { ErrorView } from '../ErrorView/errorView';



const MenuSection: React.FC = () => {
  const {menuItems,status,error}=useSelector((state:any)=>state.menuSlice)
  const {cartItems}=useSelector((state:any)=>state.userSlice)
  const [isErrorOpen,setError]=useState(true);
  const dispatch=useDispatch()
  const userId=sessionStorage.getItem('userId')

  useEffect(()=>{
    dispatch<any>(getMenuItems())
    dispatch<any>(getCartItems(userId))
  },[dispatch])

  if(status === "loading") return <LoadingView/>

  if(status==="succeeded" && menuItems.length===0) return <div>Empty List...</div>

  if(error !== "") return <ErrorView open={isErrorOpen} onClose={()=>{setError(false)}} errorMessage={error}/>


  return (
    <Box>
      <Box sx={{backgroundImage: 'linear-gradient(180deg,#ff357a 0%, transparent 90%)',padding:'10px'}}>
      <Typography sx={{fontFamily:'Lucida Handwriting'}} variant="h6" textAlign="center">
        Specially made for you
      </Typography>
      </Box>
      <Grid sx={{ padding: { xs: '1rem', md: '2rem' } }} container spacing={3}>
        {menuItems.map((item:any) => (
          <MenuItemCard cartItems={cartItems} key={item.itemId} item={item}/>
        ))}
      </Grid>
    </Box>
  );
};

export default MenuSection;
