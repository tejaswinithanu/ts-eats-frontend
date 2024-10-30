import { Box, Button, Slide, Paper } from '@mui/material';
import { useSelector } from 'react-redux';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { useNavigate } from 'react-router-dom';

const SlideUpFooter = () => {
  const cartItems = useSelector((state:any) => state.userSlice.cartItems);
  const navigate=useNavigate()

  const isCartNotEmpty = cartItems.length > 0;

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
          zIndex: 1200, // Ensures it appears above other content
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" p={1}>
          <Box>
            {`Order now! There are ${cartItems.length} Items in your Cart`}
          </Box>
          <Button 
            variant="contained"
            sx={{bgcolor:"#ebba34", color: 'white' }}
            onClick={() => {
              // Redirect to the cart page or perform cart view action
              navigate('/cart')
            }}
          >
            View Cart
            <RestaurantIcon sx={{marginLeft:'3px'}}/>
          </Button>
        </Box>
      </Paper>
    </Slide>
  );
};

export default SlideUpFooter;
