
import { Box, Button, Card, CardContent, CardMedia, Grid, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StarRatings from 'react-star-ratings';
import { addCartItem} from "../../store/userSlice";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';



export const MenuItemCard=({item,cartItems}:any)=>{
    const [quantity, setQuantity] = useState(1);
    const [isAddedtoCart,addtoCart]=useState(false);
    const {addCartStatus}=useSelector((state:any)=>state.userSlice)
    
    const dispatch=useDispatch()

    useEffect(() => {
      const cartItem = cartItems.find((cartItem: any) => cartItem.itemId === item.itemId);
      if (cartItem) {
          setQuantity(cartItem.quantity);
          addtoCart(true);
      }
  }, [cartItems, item.itemId]);

    const handleAdd=async ()=>{
      const userId=sessionStorage.getItem('userId')
      const details={
        userId,itemId:item.itemId,quantity
      }
      console.log('details before dispatch',details)
      await dispatch<any>(addCartItem(details))
      addtoCart(true)
    }

    const formatPrice = (price: number) => {
      return new Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'INR'
      }).format(price);
  };

  // Function to render stars based on the rating
  // const renderStars = (rating: number) => {
  //     const stars = [];
  //     for (let i = 1; i <= 5; i++) {
  //         if (i <= rating) {
  //             stars.push(<StarIcon key={i} sx={{ color: 'gold' }} />);
  //         } else {
  //             stars.push(<StarBorderIcon key={i} sx={{ color: 'gray' }} />);
  //         }
  //     }
  //     return stars;
  // };

    return(
        <Grid item xs={12} sm={6} md={4}>
            <Card>
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
                      onChange={(e:any) => setQuantity(Number(e.target.value))}
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