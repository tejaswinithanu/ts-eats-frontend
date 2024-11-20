import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Button,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  AppBar,
  Toolbar,
  IconButton,
  Dialog,
  DialogContent,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import { getCartItems, placeOrder } from "./../../store/userSlice";
import { keyframes } from "@mui/system";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import { formatPrice } from "./../../utils/formatPrice";

const moveHorizontally = keyframes`
  0% {
    left: -10%;
  }
  100% {
    left: 110%;
  }
`;

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartData, getCartStatus } = useSelector((state: any) => state.userSlice);
  const { cartItems, totalCartAmount } = cartData;
  const userId = sessionStorage.getItem("userId");

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    dispatch(getCartItems(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    if (getCartStatus === "succeeded" && cartItems.length === 0) {
      navigate("/");
    }
  }, [getCartStatus, cartItems, navigate]);

  const handlePlaceOrder = () => {
    dispatch(placeOrder(userId));
    setShowConfetti(true);
    setOrderPlaced(true);

    setTimeout(() => {
      setShowConfetti(false);
      setOrderPlaced(false);
      navigate("/orders");
    }, 6000);
  };

  const handleGoBack = () => {
    navigate("/cart");
  };

  return (
    <Box
      sx={{
        backgroundColor: "var(--primary-color)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={400}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 9999,
          }}
        />
      )}

      <AppBar position="static" sx={{ bgcolor: "#303030", boxShadow: "none", width: "100%", height: "10vh" }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleGoBack} aria-label="back">
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" sx={{ color: "white", flexGrow: 1 }}>
            Checkout
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          width: "100%",
          maxWidth: { xs: "100%", md: "50%" },
          bgcolor: "white",
          minHeight: "90vh",
          mt: 2,
          p: { xs: 2, sm: 3 },
          borderRadius: { xs: 0, md: 3 },
          boxShadow: { xs: "none", md: "0px 4px 10px rgba(0, 0, 0, 0.2)" }
        }}
      >
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Cart Items
          </Typography>
          <List>
            {cartItems.map((item: any) => (
              <ListItem
                key={item.itemId}
                sx={{
                  px: 0,
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  justifyContent: "space-between",
                  alignItems: { xs: "flex-start", sm: "center" },
                }}
              >
                <ListItemText
                  primary={`${item.menuItem.name} (x${item.quantity})`}
                  secondary={`Price: ₹${item.menuItem.price * item.quantity}`}
                  primaryTypographyProps={{
                    sx: { fontSize: "1rem", fontWeight: "bold" },
                  }}
                  secondaryTypographyProps={{
                    sx: { fontSize: "0.9rem", color: "gray" },
                  }}
                />
              </ListItem>
            ))}
          </List>
        </CardContent>

        <Box
          sx={{
            width: "100%",
            mb: 3,
            mt: 2,
            borderBottom: "1px solid gray",
          }}
        >
          <CardContent
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h6">Total Amount</Typography>
            <Typography variant="h5" sx={{ color: "primary.main", fontWeight: "bold" }}>
              {formatPrice(totalCartAmount)}
            </Typography>
          </CardContent>
        </Box>

        <Box
          sx={{
            width: "100%",
            mb: 3,
            mt: 2,
            borderBottom: "1px solid gray",
          }}
        >
          <CardContent>
            <Typography variant="h6">Payment Method</Typography>
            <Typography variant="body1" sx={{ color: "gray" }}>
              Cash on Delivery
            </Typography>
          </CardContent>
        </Box>

        <Button
          variant="contained"
          onClick={handlePlaceOrder}
          sx={{
            width: "100%",
            maxWidth: 600,
            background: "linear-gradient(45deg, #ff357a, #fff172)",
            color: "white",
            mt: 2,
            py: 1.5,
            fontSize: "1rem",
            borderRadius: 2,
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          }}
        >
          Place Order
        </Button>
      </Box>

      <Dialog open={orderPlaced} onClose={() => setOrderPlaced(false)}>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography variant="h6" sx={{ color: "green", mb: 2 }}>
            Order Placed Successfully!
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Thank you for your order.
          </Typography>
          <Button
            sx={{
              background: "linear-gradient(45deg, #ff357a, #fff172)",
              color: "white",
              mt: 2,
              px: 3,
              py: 1,
              borderRadius: 2,
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            }}
            variant="contained"
            onClick={() => navigate("/orders")}
          >
            View Orders
          </Button>
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: "50px",
              mt: 2,
              overflow: "hidden",
            }}
          >
            <DeliveryDiningIcon
              sx={{
                position: "absolute",
                animation: `${moveHorizontally} 2s linear infinite`,
                color: "green",
              }}
              fontSize="large"
            />
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default CheckoutPage;
