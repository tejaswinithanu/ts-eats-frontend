import {
    Grid,
    Card,
    CardContent,
    CardActions,
    Typography,
    IconButton,
    Box,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
} from "@mui/material";

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useDispatch } from "react-redux";
import { useState } from "react";
import { getCartItems, removeCartItem, updateQuantity } from "./../../store/userSlice";
import { formatPrice } from "./../../utils/formatPrice";
import { LoadingView } from "./loading";

export const CartItem = ({ item }: any) => {
    const [quantity, setQuantity] = useState(item.quantity);
    const { menuItem } = item;
    const dispatch = useDispatch();
    const userId = sessionStorage.getItem('userId');
    const [isLoading,setIsLoading]=useState(false);

    console.log(item.menuItem)

    const [open, setOpen] = useState(false);

    const handleIncreaseQuantity = async () => {
        setIsLoading(true)
        await setQuantity(quantity + 1);
        await dispatch(updateQuantity({ userId, itemId: item.itemId, quantity: quantity + 1 }));
        dispatch(getCartItems(userId));
        setIsLoading(false);
    };

    const handleDecreaseQuantity = async () => {
        setIsLoading(true)
        if (quantity > 1) setQuantity(quantity - 1);
        await dispatch(updateQuantity({ userId, itemId: item.itemId, quantity: quantity > 1 ? quantity - 1 : quantity }));
        dispatch(getCartItems(userId));
        setIsLoading(false)
    };

    const handleRemove = async () => {
        setIsLoading(true)
        handleClose();
        await dispatch<any>(removeCartItem(item.cartId));
        dispatch(getCartItems(userId));
        setIsLoading(false);
    };

    const handleQuantityChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value, 10);
        if (!isNaN(value) && value >= 1) {
            await setQuantity(value);
        }
        await dispatch(updateQuantity({ userId, itemId: item.itemId, quantity: value }));
        dispatch(getCartItems(userId));
    };

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Grid 
            item 
            xs={12} 
            sx={{ 
                display: 'flex', 
                flexDirection: 'row',
                justifyContent: 'center',
                marginBottom: '1rem', 
            }}
        >
            <Card
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: { xs: 'center', sm: 'flex-start', md:'center' },
                    width: '100%',
                    padding: '1rem',
                    borderRadius: '12px',
                    boxShadow: '2px 4px 8px rgba(0, 0, 0, 0.3)',
                    overflow: 'hidden',
                    position:'relative',
                    opacity:isLoading? 0.5:1
                }}
            >
                {/* Image Section */}
                <Box
                    sx={{
                        flexShrink: 0,
                        width: { xs: '100%', sm: '120px' },
                        height: { xs: '150px', sm: '120px' },
                        backgroundImage: `url(${menuItem.imageUrl})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        borderRadius: '12px',
                        marginBottom: { xs: '1rem', sm: '0' },
                    }}
                ></Box>

                {/* Content Section */}
                <Box
                    sx={{
                        flex: 1,
                        display: 'flex',
                        justifyContent:'space-between',
                        flexDirection: {xs:'column', md:'row'},
                        alignItems:'center',
                        marginLeft: { xs: 0, sm: '1rem' },
                        textAlign: { xs: 'center', sm: 'left' },
                    }}
                >
                    <CardContent sx={{display:'flex',flexDirection:{xs:'column',md:'row'}, alignItems:'center', justifyContent:'space-between', flex:1}}>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        {menuItem.name}
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 700, color: 'gray' }}>
                        {formatPrice(item.totalPrice)}
                    </Typography>
                    </CardContent>
                    <CardActions sx={{display:'flex', alignItems:'center', justifyContent:'space-between', flex:1}}>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                border: '1px solid #ff357a',
                                borderRadius: '20px',
                                padding: '0.25rem 0.5rem',
                            }}
                        >
                            <IconButton aria-label="decrease quantity" onClick={handleDecreaseQuantity}>
                                <RemoveIcon />
                            </IconButton>
                            <TextField
                                value={quantity}
                                onChange={handleQuantityChange}
                                type="number"
                                inputProps={{ min: 1, style: { textAlign: 'center' }, max:item.availableItems }}
                                variant="standard"
                                sx={{
                                    width: '40px',
                                    textAlign: 'center',
                                    '& .MuiInput-underline:before, & .MuiInput-underline:after': {
                                        borderBottom: 'none',
                                    },
                                }}
                            />
                            <IconButton
                             disabled={item.quantity===item.availableItems}
                             aria-label="increase quantity" onClick={handleIncreaseQuantity}>
                                <AddIcon />
                            </IconButton>
                        </Box>
                        <Button
                            color="inherit"
                            onClick={handleClickOpen}
                            aria-label="remove item"
                            sx={{ marginLeft: { xs: 0, sm: '0.5rem' }, border:'1px solid red' }}
                        >
                            Remove
                        </Button>
                    </CardActions>

                        {/* <IconButton
                            color="inherit"
                            onClick={handleClickOpen}
                            aria-label="remove item"
                            sx={{ marginLeft: { xs: 0, sm: '0.5rem' } }}
                        >
                            <DeleteIcon />
                        </IconButton> */}
                </Box>
                    {isLoading && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          zIndex: 1, // Ensure loader is above the button
                        }}
                      >
                        <LoadingView size={24}/>
                      </div>
                    )}
            </Card>

            {/* Confirmation Dialog */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Remove Item</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to remove this item from your cart?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleRemove} color="primary">
                        Remove
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
};
