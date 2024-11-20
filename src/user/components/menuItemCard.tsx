
import { Box, Button, Card, CardContent, CardMedia, Grid, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { useDispatch} from "react-redux";
import StarRatings from 'react-star-ratings';
import { addCartItem, getCartItems, updateQuantity} from "./../../store/userSlice";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { formatPrice } from "./../../utils/formatPrice";
import CircleIcon from "@mui/icons-material/Circle";
import { LoadingView } from "./loading";



export const MenuItemCard=({item,cartItems}:any)=>{
    const [quantity, setQuantity] = useState(1);
    const [isAddedtoCart,addtoCart]=useState(false);
    const [isLoading,setIsLoading]=useState(false);
    
    const dispatch=useDispatch()
    const userId=sessionStorage.getItem('userId')

    useEffect(() => {
      const cartItem = cartItems.find((cartItem: any) => cartItem.itemId === item.itemId);
      if (cartItem) {
          setQuantity(cartItem.quantity);
          addtoCart(true);
      }
  }, [cartItems, item.itemId]);

    const handleAdd=async ()=>{
      setIsLoading(true)
      const details={
        userId,itemId:item.itemId,quantity
      }
      await dispatch<any>(addCartItem(details))
      addtoCart(true)
      dispatch(getCartItems(userId))
      setIsLoading(false)
    }

    

    const handleQuantity=async (e:any)=>{
      setQuantity(Number(e.target.value))
      const details={
        userId,itemId:item.itemId,quantity:e.target.value
      }
      await dispatch(updateQuantity(details))  
      dispatch(getCartItems(userId))
    }

    return(
      <Grid item xs={12} sm={6} md={4}>
      <Card
        sx={{
          border: '1px solid black',
          position: 'relative',
          transition: 'transform 0.3s ease-in-out',
          '&:hover': {
            animation: 'sizzle 0.8s ease-in-out', // Applies the sizzle animation on hover
            boxShadow: '0px 4px 20px rgba(255, 99, 71, 0.5)', // Adds a glowing effect
          },
          '@keyframes sizzle': {
            '0%, 100%': {
              transform: 'rotate(0deg)', // Original position
            },
            '25%': {
              transform: 'rotate(2deg)', // Slight clockwise tilt
            },
            '50%': {
              transform: 'rotate(-2deg)', // Slight counter-clockwise tilt
            },
            '75%': {
              transform: 'rotate(1deg)', // Smaller clockwise tilt
            },
          },
        }}
      >
        <CardMedia
          component="img"
          height="200"
          image={item.imageUrl}
          alt={item.name}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            borderRadius: '5px',
            width: 30,
            height: 30,
            boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.2)',
          }}
        >
          {/* Green signal for veg, red signal for non-veg */}
          <CircleIcon
            sx={{
              color: item.type?.toLowerCase() === "veg" ? "#4caf50" : "#f44336", // Green for veg, red for non-veg
              fontSize: "20px",
            }}
          />
        </Box>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {item.name}
          </Typography>
          <Typography
            sx={{
              overflow: 'hidden',         // Hides overflow text
              textOverflow: 'ellipsis',   // Adds ellipsis
              whiteSpace: 'nowrap',       // Prevents text from wrapping to the next line
              display: 'block',
            }}
            variant="body2"
            color="text.secondary"
          >
            {item.description}
          </Typography>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ marginTop: 1 }}>
              <StarRatings
                rating={item.averageRating}
                starRatedColor="gold"
                numberOfStars={5}
                name="rating"
                starDimension="20px"
                starSpacing="2px"
              />
            </Box>
            <Typography
              variant="body1"
              sx={{ marginTop: 1, fontWeight: 'bold', color: 'Black' }}
            >
              {formatPrice(item.price)}
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 2,
            }}
          >
            {isAddedtoCart ? (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography
                  variant="body2"
                  sx={{ marginRight: 1, color: 'black' }}
                >
                  Qty:
                </Typography>
                <TextField
                  type="number"
                  value={quantity}
                  onChange={handleQuantity}
                  inputProps={{ min: 1, max:item.availableItems }}
                  size="small"
                  sx={{ width: '60px', marginRight: 1 }} // Adjust width and margin as needed
                />
                <CheckCircleIcon />
              </Box>
            ) : (
              <div style={{ position: 'relative', display: 'inline-block' }}>
              <Button
                sx={{
                  background: 'linear-gradient(45deg, #ff357a, #fff172)',
                  color: 'white',
                  padding: '5px 20px',
                  position: 'relative', 
                  opacity: isLoading ? 0.7 : 1, // Reduce opacity when loading
                }}
                variant="contained"
                onClick={handleAdd}
              >
                Add+
              </Button>
              
              {isLoading && (
                <>
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      backgroundColor: 'rgba(255, 255, 255, 0.6)', // Semi-transparent overlay
                      borderRadius: '4px', // Match the button's border-radius
                    }}
                  ></div>
                  <div
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      zIndex: 1,
                    }}
                  >
                    <LoadingView size={20} />
                  </div>
                </>
              )}
            </div>

            )}
          </Box>
        </CardContent>
      </Card>
    </Grid>


    
    )
}

export default MenuItemCard