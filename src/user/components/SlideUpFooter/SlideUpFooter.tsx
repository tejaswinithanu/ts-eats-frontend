import { Box, Button, Slide, Paper, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getCartItems } from '../../../store/userSlice';

const SlideUpFooter = () => {
  const theme = useTheme(); // Access the theme
  const { cartData } = useSelector((state: any) => state.userSlice);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = sessionStorage.getItem('userId');

  useEffect(() => {
    dispatch(getCartItems(userId));
  }, [dispatch, userId]);

  const isCartNotEmpty = cartData.cartItems.length > 0;

  return (
    <Slide direction="up" in={isCartNotEmpty} mountOnEnter unmountOnExit>
      <Paper
        elevation={3}
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          p: 2,
          bgcolor: 'white',
          color: 'black',
          textAlign: 'center',
          zIndex: 1200,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row', // Default layout for large devices
          [theme.breakpoints.down('md')]: {
            flexDirection: 'column', // Stack items for medium devices
            padding: '16px',
          },
          [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            padding: '12px',
          },
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            textAlign: 'center',
            [theme.breakpoints.down('md')]: {
              marginBottom: '8px',
            },
          }}
        >
          {`Order now! There are ${cartData.cartItems.length} Items in your Cart`}
        </Box>
        <Button
          variant="contained"
          sx={{
            bgcolor: "#ebba34",
            color: 'white',
            textTransform: 'none',
            fontSize: '14px',
            padding: '6px 16px',
            [theme.breakpoints.down('md')]: {
              width: '100%',
              padding: '8px',
            },
            [theme.breakpoints.down('sm')]: {
              fontSize: '12px',
              padding: '6px 12px',
            },
          }}
          onClick={() => navigate('/cart')}
        >
          View Cart
          <RestaurantIcon sx={{ marginLeft: '3px', fontSize: '18px' }} />
        </Button>
      </Paper>
    </Slide>
  );
};

export default SlideUpFooter;
