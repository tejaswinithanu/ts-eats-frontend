import { Box, Button, Slide, Paper } from '@mui/material';
import { useSelector } from 'react-redux';

const SlideUpFooter = () => {
  // Assuming cartItems is an array of items in the cart
  const cartItems = useSelector((state:any) => state.userSlice.cartItems);

  // Only show the footer if there are items in the cart
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
          bgcolor: 'primary.main',
          color: 'white',
          textAlign: 'center',
          zIndex: 1200, // Ensures it appears above other content
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" p={1}>
          <Box>
            {`Items in Cart: ${cartItems.length}`}
          </Box>
          <Button
            variant="contained"
            sx={{ bgcolor: 'secondary.main', color: 'white' }}
            onClick={() => {
              // Redirect to the cart page or perform cart view action
              window.location.href = '/cart';
            }}
          >
            View Cart
          </Button>
        </Box>
      </Paper>
    </Slide>
  );
};

export default SlideUpFooter;
