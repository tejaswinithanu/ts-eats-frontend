import React, { useEffect, useState} from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Divider,
  Box,
  Avatar,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


import { useDispatch, useSelector } from 'react-redux';
import { getCartItems } from '../../store/userSlice';
import { CartItem } from '../../components/CartItem/cartItem';
import { LoadingView } from '../../components/Loading/loading';
import { ErrorView } from '../../components/ErrorView/errorView';

const Cart = () => {
  const {cartItems,status,error}=useSelector((state:any)=>state.userSlice)
  const [isErrorOpen,setError]=useState(true);
  const dispatch=useDispatch()
  const userId=sessionStorage.getItem('userId')

  useEffect(()=>{
    dispatch(getCartItems(userId))
  },[])

  const totalPrice = cartItems.reduce(
    (total:any, item:any) => total + item.menuItem.price*item.quantity,
    0
  );

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
    }).format(price);
};

  const handleGoBack=()=>{
    window.history.back()
  }

  if (status==='loading') return <LoadingView/>

  if (error !== "") return <ErrorView open={isErrorOpen} onClose={()=>{setError(false)}} errorMessage={error}/>

  return (
    <div>
      <AppBar sx={{bgcolor:'transparent'}} position="static">
        <Toolbar>
          <IconButton onClick={handleGoBack} edge="start" color="inherit" aria-label="back">
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6">Cart</Typography>
        </Toolbar>
      </AppBar>
      <Box p={4} sx={{display:'flex',flexDirection:'column', paddingLeft:'10%', paddingRight:'10%'}}>
      <Grid container spacing={2} direction="column" justifyContent="flex-start">
            {cartItems.map((item: any) =>  
                 (
                   <CartItem key={item.itemId} item={item}/> 
                 )
            )}
      </Grid>


        <Divider />
        <Box sx={{display:'flex',flexDirection:'column',width:"300px",alignSelf:'flex-end', marginTop: '30px', padding:'20px', bgcolor:'white', borderRadius:'5px'}}>
        <Box>
            <Typography sx={{color:'black', marginBottom:'12px'}} variant="h6">Cart Total</Typography>
            <Box sx={{display:'flex', justifyContent:'space-between'}}>
                <Typography sx={{color:'gray'}}>Subtotal</Typography>
                <Typography sx={{color:'gray'}}>{formatPrice(totalPrice)}</Typography>
            </Box>
            <Box sx={{display:'flex', justifyContent:'space-between', borderBottom:'1px solid gray'}}>
                <Typography sx={{color:'gray'}}>Discounts</Typography>
                <Typography sx={{color:'gray'}}>{formatPrice(0)}</Typography>
            </Box>
            <Box sx={{display:'flex', justifyContent:'space-between'}}>
                <Typography sx={{color:'gray'}}>Total</Typography>
                <Typography sx={{color:'gray'}}>{formatPrice(totalPrice)}</Typography>
            </Box>
        </Box>
        
        <Button variant="contained" color="primary" sx={{textAlign:'center', marginTop: '16px',background: 'linear-gradient(45deg, #ff357a, #fff172)' }}>
          Place Order
        </Button>
        </Box>
      </Box>
    </div>
  );
};

export default Cart;
