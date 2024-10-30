import { Avatar,
     Grid, 
     Card,
    CardContent,
    CardActions, 
    Typography,
    IconButton,
    Box,
    TextField
} from "@mui/material"

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from "react-redux";
import { useState } from "react";
import { getCartItems, removeCartItem, updateQuantity } from "../../store/userSlice";

export const CartItem=({item}:any)=>{
    const [quantity,setQuantity]=useState(item.quantity)
    const {menuItem}=item
    const dispatch=useDispatch()
    const userId=sessionStorage.getItem('userId')
    

    const handleIncreaseQuantity=async ()=>{
        await setQuantity(setQuantity(quantity + 1))
        await dispatch(updateQuantity({userId,itemId:item.itemId,quantity}))
        dispatch(getCartItems(userId))
    }

    const handleDecreaseQuantity=async ()=>{
        if (quantity > 1) await setQuantity(quantity - 1);
        await dispatch(updateQuantity({userId,itemId:item.itemId,quantity}))
        dispatch(getCartItems(userId))
    }

    const handleRemove=async ()=>{
        await dispatch<any>(removeCartItem(item.cartId))
        dispatch(getCartItems(userId))
    }

    const handleQuantityChange =async (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value, 10);
        if (!isNaN(value) && value >= 1) {
            await setQuantity(value);
        }
        await dispatch(updateQuantity({userId,itemId:item.itemId,quantity:event.target.value}))
        dispatch(getCartItems(userId))
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR'
        }).format(price);
    };

    return(
        <Grid
            sx={{ display: 'flex', width: '100%', alignItems: 'center' }} // Align items center for proper vertical alignment
            item
            xs={12}
            sm={6}
            md={4}
            key={item.itemId}
        >

            <Avatar
                variant="rounded"
                src={menuItem.imageUrl}
                alt={menuItem.name}
                sx={{
                    width: '120px',           // Set width of the circular image
                    height: '120px',          // Set height of the circular image
                    borderRadius: '50%',      // Make the image circular
                    boxShadow: 3 ,
                    border:'2px solid white'             // Optional: add shadow for effect
                }}
            />
            <Card sx={{ display: 'flex',justifyContent:'space-between' , flexDirection: 'row',  padding: 2, flexGrow: 1 }}>
                <CardContent sx={{ color: 'black', display:"flex", alignItems:'center'}}>
                    <Typography variant="h6">{menuItem.name}</Typography>
                    <Typography sx={{ color: 'black' , marginLeft:'20px'}} variant="body1">
                        Price: {formatPrice(menuItem.price)}
                    </Typography>
                </CardContent>
                <CardActions>
                <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            backgroundColor: '#ff357a', 
                            borderRadius: '4px',    
                            width: 'fit-content',     
                            marginRight: 'auto'        
                        }}
                    >
                        <IconButton aria-label="decrease quantity" onClick={handleDecreaseQuantity} sx={{ minWidth: '30px' , color:'white'}}>
                            <RemoveIcon/>
                        </IconButton>
                        <TextField
                value={quantity}
                onChange={handleQuantityChange}
                type="number"
                inputProps={{ min: 1, style: { textAlign: 'center', width: '40px', color: 'white' } }}
                variant="standard"
                sx={{
                    mx: 1,
                    '& .MuiInputBase-root': {
                        color: 'white',
                    },
                    '& .MuiInput-underline:before': {
                        borderBottomColor: 'transparent', // Hide underline
                    },
                    '& .MuiInput-underline:after': {
                        borderBottomColor: 'transparent', // Hide underline on focus
                    },
                }}
            />
                        <IconButton aria-label="increase quantity" onClick={handleIncreaseQuantity} sx={{ minWidth: '30px', color:'white' }}>
                            <AddIcon/>
                        </IconButton>
                    </Box>
                    <IconButton color="error" onClick={handleRemove} aria-label="remove item">
                        <DeleteIcon />
                    </IconButton>
                </CardActions>
            </Card>
        </Grid>
    )
}