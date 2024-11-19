import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Grid,
  Box,
  Skeleton,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useDispatch, useSelector } from 'react-redux';
import { getCartItems } from '../../../store/userSlice';
import { CartItem } from '../../components/CartItem/cartItem';
import { ErrorView } from '../../components/ErrorView/errorView';
import { EmptyCartView } from '../../components/EmptyCart/emptyCartView';
import { AddressSection } from '../../components/AddressSection/addressSection';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from '../../../utils/formatPrice';

const Cart = () => {
  let { cartData, getCartStatus, getCartError } = useSelector((state: any) => state.userSlice);
  const { cartItems } = cartData || [];
  const [isErrorOpen, setError] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = sessionStorage.getItem('userId');

  useEffect(() => {
    dispatch(getCartItems(userId));
  }, [dispatch, userId]);

  const totalPrice = cartItems.reduce(
    (total: any, item: any) => total + item.menuItem.price * item.quantity,
    0
  );

  const handleGoBack = () => {
    navigate('/menu')
  };

  if (getCartError !== "") return <ErrorView open={isErrorOpen} onClose={() => setError(false)} errorMessage={getCartError} />;

  return (
    <div>
      <AppBar sx={{ bgcolor: '#303030' }} position="static">
        <Toolbar>
          <IconButton onClick={handleGoBack} edge="start" color="inherit" aria-label="back">
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6">Cart</Typography>
        </Toolbar>
      </AppBar>

      {cartItems.length === 0 && getCartStatus !== 'loading' ? (
        <EmptyCartView />
      ) : (
        <Box
          sx={{
            backgroundColor: 'white',
            minHeight:{xs:'100%', md:'90vh'},
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' }, // Stack items for small devices
            justifyContent: { xs: 'center', sm: 'space-between' },
            gap: { xs: 2, sm: 4 },
            padding:{xs:2, md:0}
          }}
        >
          {/* Cart Items Section */}
          <Grid
            spacing={2}
            sx={{
              flex: 3,
              flexDirection: 'column',
              marginTop: { xs: '10px', sm: '20px' },
              padding: { xs: 1, sm: '20px' },
              width: { xs: '100%', sm: 'auto' }, // Full width for small devices
            }}
          >
            {getCartStatus === 'loading'
              ? Array.from(new Array(3)).map((_, index) => (
                  <Grid sx={{ marginBottom: '2em' }} item xs={12} key={index}>
                    <Skeleton variant="rectangular" width="100%" height={80} />
                  </Grid>
                ))
              : cartItems.map((item: any) => (
                  <Grid sx={{ marginBottom: '3em' }} key={item.itemId}>
                    <CartItem item={item} />
                  </Grid>
                ))}
          </Grid>

          {/* Checkout Section */}
          <Box
            sx={{
              flex: 1,
              padding: { xs: '10px', sm: '20px' }, // Adjust padding for responsiveness
              minHeight: '90vh',
              backgroundColor: 'white',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              alignItems: 'center',
              width: { xs: '100%', md: '25%' }, // Full width for small devices
            }}
          >
            <AddressSection />
            <Box
              sx={{
                bgcolor: 'white',
                borderRadius: '5px',
                boxShadow: '2px 2px 12px rgba(0, 0, 0, 0.3)',
                width: '100%',
                padding: '20px',
                marginTop: { xs: 2, sm: 0 },
              }}
            >
              <Box>
                <Typography
                  sx={{ color: 'black', marginBottom: '12px' }}
                  variant="h6"
                >
                  Summary
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography sx={{ color: 'gray' }}>Subtotal</Typography>
                  <Typography sx={{ color: 'gray' }}>{formatPrice(totalPrice)}</Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid gray',
                    paddingBottom: '8px',
                    marginBottom: '8px',
                  }}
                >
                  <Typography sx={{ color: 'gray' }}>Discounts</Typography>
                  <Typography sx={{ color: 'gray' }}>{formatPrice(0)}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography sx={{ color: 'gray' }}>Total</Typography>
                  <Typography sx={{ color: 'gray' }}>{formatPrice(totalPrice)}</Typography>
                </Box>
              </Box>

              <Button
                variant="contained"
                onClick={() => navigate('/checkout')}
                color="primary"
                sx={{
                  textAlign: 'center',
                  marginTop: '16px',
                  background: 'linear-gradient(45deg, #ff357a, #fff172)',
                  width: { xs: '100%', sm: 'auto' }, // Full width for small devices
                }}
              >
                Proceed to checkout
              </Button>
            </Box>
          </Box>
        </Box>

      )}
    </div>
  );
};

export default Cart;
