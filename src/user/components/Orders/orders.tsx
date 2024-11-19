import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Card, CardContent, Typography, List, ListItem, ListItemText, AppBar, Toolbar, Container, Divider, Chip } from "@mui/material";
import { getOrderHistory } from "../../../store/userSlice";
import { format } from "date-fns";
import { NoOrdersView } from "../NoOrdersView/noOrdersView";
import { statusTextMapper} from "../../../utils/statusColorMapper";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import PendingIcon from '@mui/icons-material/HourglassEmpty'; // Example icon for "pending" status


const statusIconMapper: any = {
    delivered: <CheckCircleIcon sx={{ color: 'green' }} />,
    cancelled: <CancelIcon sx={{ color: 'red' }} />,
    pending: <PendingIcon sx={{ color: 'orange' }} />,
  };

export const Orders = () => {
    const { orderHistory } = useSelector((state: any) => state.userSlice);
    const dispatch = useDispatch();
    const userId = sessionStorage.getItem('userId');

    useEffect(() => {
        dispatch(getOrderHistory(userId));
    }, [dispatch, userId]);

    return (
        <Box sx={{ backgroundColor: "#f4f4f4", minHeight: "90vh", padding: "20px 0" }}>
            <AppBar position="static" sx={{ backgroundColor: 'var(--primary-color)' }}>
                <Toolbar>
                    <Typography variant="h6" sx={{ color: "white", flexGrow: 1, textAlign: "center" }}>
                        My Orders
                    </Typography>
                </Toolbar>
            </AppBar>

            {
                orderHistory.length===0 ?
                (<NoOrdersView/>):
                (
                    <Container maxWidth="md" sx={{ marginTop: 3 }}>
                <List>
                    {orderHistory.map((order: any) => (
                        <Card 
                            key={order.orderId} 
                            sx={{
                                backgroundColor: "white", 
                                marginBottom: 3, 
                                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)", 
                                borderRadius: "10px", 
                                overflow: "hidden"
                            }}
                        >
                            {/* Card Header with Order ID and Status */}
                            <Box sx={{ backgroundColor: "var(--primary-color)", padding: "10px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <Typography variant="h6" sx={{ color: "white" }}>Order ID: {order.orderId}</Typography>
                                <Chip 
                                    label={order.status} 
                                    color="primary" 
                                    icon={statusIconMapper[order.status] || undefined} 
                                    sx={{ 
                                        backgroundColor: 'white', 
                                        color: statusTextMapper[order.status], 
                                        fontWeight: 'bold',
                                    }} 
                                    />
                            </Box>

                            <CardContent sx={{ padding: "20px" }}>
                                {/* Order Date */}
                                <Typography variant="body2" sx={{ color: "gray", marginBottom: "10px" }}>
                                    Placed on: {format(new Date(order.orderDate), "MMMM dd, yyyy")}
                                </Typography>

                                {/* Items List */}
                                <List>
                                    {order.items.map((item: any, index: number) => (
                                        <React.Fragment key={item.itemId}>
                                            <ListItem disableGutters sx={{ display: "flex", justifyContent: "space-between", padding: "8px 0" }}>
                                                <ListItemText
                                                    primary={item.menuItem.name}
                                                    secondary={`Quantity: ${item.quantity}`}
                                                    primaryTypographyProps={{ sx: { color: "black" }}}
                                                    secondaryTypographyProps={{ sx: { color: "#777" }}}
                                                />
                                                <Typography variant="body2" sx={{ color: "#f2a445", fontWeight: "bold" }}>
                                                    ₹{item.menuItem.price * item.quantity}
                                                </Typography>
                                            </ListItem>
                                            {index < order.items.length - 1 && <Divider />}
                                        </React.Fragment>
                                    ))}
                                </List>

                                {/* Total Amount */}
                                <Divider sx={{ marginY: 2, color:'black' }} />
                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <Typography variant="h6" sx={{ color: "#ff357a", fontWeight: "bold" }}>Total</Typography>
                                    <Typography variant="h6" sx={{ color: "black", fontWeight: "bold" }}>₹ {order.totalAmount}</Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    ))}
                </List>
            </Container>
                )
            }
            
            
        </Box>
    );
};

export default Orders;
