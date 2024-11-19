
import { Box, Button, Card, CardContent, CardMedia, Grid, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StarRatings from 'react-star-ratings';
import { addCartItem, getCartItems, updateQuantity} from "../../../store/userSlice";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { getMenuItems } from "../../../store/menuSlice";
import { formatPrice } from "../../../utils/formatPrice";



export const MenuItemCard=({item,cartItems}:any)=>{
    const [quantity, setQuantity] = useState(1);
    const [isAddedtoCart,addtoCart]=useState(false);
    const {addCartStatus}=useSelector((state:any)=>state.userSlice)
    
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
      
      const details={
        userId,itemId:item.itemId,quantity
      }
      await dispatch<any>(addCartItem(details))
      addtoCart(true)
      dispatch(getCartItems(userId))
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
            <Card sx={{border:'1px solid black'}}>
              <CardMedia
                component="img"
                height="200"
                image={item.imageUrl}
                alt={item.name}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {item.name}
                </Typography>
                <Typography sx={{
                  overflow: 'hidden',         // Hides overflow text
                  textOverflow: 'ellipsis',   // Adds ellipsis
                  whiteSpace: 'nowrap',       // Prevents text from wrapping to the next line
                  display: 'block', 
                }} variant="body2" color="text.secondary">
                  {item.description}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center',justifyContent:'space-between'}}>
                <Box sx={{ marginTop: 1 }}>
                    <StarRatings
                      rating={item.averageRating}
                      starRatedColor="gold"
                      numberOfStars={5}
                      name='rating'
                      starDimension="20px"
                      starSpacing="2px"
                    />
                </Box>
                <Typography variant="body1" sx={{ marginTop: 1, fontWeight: 'bold', color:'Black' }}>
                    {formatPrice(item.price)} 
                </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center',justifyContent: 'space-between', marginTop: 2 }}>
                
                
                
                
                {isAddedtoCart?(
                  <Box sx={{ display: 'flex', alignItems: 'center'}}>
                  <Typography variant="body2" sx={{ marginRight: 1, color:'black' }}>
                      Qty:
                  </Typography>
                      <TextField
                      type="number"
                      value={quantity}
                      onChange={handleQuantity}
                      inputProps={{ min: 1 }}
                      size="small"
                      sx={{ width: '60px', marginRight: 1 }} // Adjust width and margin as needed
                  />
                  <CheckCircleIcon/>

                  </Box>
                ):(
                  <Button sx={{background: 'linear-gradient(45deg, #ff357a, #fff172)', color:'white', padding:"5px 20px"}} variant="contained" onClick={handleAdd}>
                    Add+
                  </Button>
                )}
                
                </Box>
              </CardContent>
            </Card>
          </Grid>
    )
}