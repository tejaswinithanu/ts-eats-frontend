import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../../store/orderManagement.store";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  Typography,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Skeleton
} from "@mui/material";
import { updateOrder } from "../../../store/userSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { formatPrice } from "../../../utils/formatPrice";
import { statusTextMapper } from "../../../utils/statusColorMapper";

export const OrderManagement = () => {
  const { orders, getOrdersStatus } = useSelector((state: any) => state.orderManagementSlice);
  const dispatch = useDispatch();

  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  useEffect(() => {
    dispatch<any>(getAllOrders());
  }, [dispatch]);

  const handleOrderAction = async (orderId: string, action: string) => {
    try {
      const response = await dispatch(updateOrder({ orderId, status: action }));
      if (updateOrder.fulfilled.match(response)) {
        toast.success(action === "cancelled" ? "Order canceled successfully!" : "Order accepted successfully!");
        dispatch<any>(getAllOrders())
      } else {
        toast.error(response.payload);
      }
    } catch (err: any) {
      toast.error(err.message || 'Error while updating the order!');
    }
  };

  const handleOpenCancelDialog = (orderId: string) => {
    setSelectedOrderId(orderId);
    setCancelDialogOpen(true);
  };

  const handleConfirmCancel = () => {
    if (selectedOrderId) {
      handleOrderAction(selectedOrderId, "cancelled");
      setCancelDialogOpen(false);
    }
  };

  return (
    <Box p={3}>
      <ToastContainer theme="dark" newestOnTop={true} position="top-right" autoClose={3000} />
      <Typography variant="h5" mb={3}>Recent Orders</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: 'var(--primary-color)' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Order Id</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Ordered By</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Ordered At</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Items</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Total Value</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getOrdersStatus === 'loading' ? (
              // Render skeleton rows when loading
              Array.from(new Array(5)).map((_, index) => (
                <TableRow key={index}>
                  <TableCell><Skeleton variant="text" width="80%" /></TableCell>
                  <TableCell><Skeleton variant="text" width="60%" /></TableCell>
                  <TableCell><Skeleton variant="text" width="70%" /></TableCell>
                  <TableCell><Skeleton variant="text" width="50%" /></TableCell>
                  <TableCell><Skeleton variant="text" width="60%" /></TableCell>
                  <TableCell><Skeleton variant="text" width="40%" /></TableCell>
                  <TableCell><Skeleton variant="rectangular" width="100%" height={30} /></TableCell>
                </TableRow>
              ))
            ) : (
              orders.map((order: any) => (
                <TableRow key={order.orderId}>
                  <TableCell>{order.orderId}</TableCell>
                  <TableCell>{order.user.username}</TableCell>
                  <TableCell>{new Date(order.orderDate).toLocaleString()}</TableCell>
                  <TableCell>
                    <Tooltip
                      title={
                        <Box>
                          {order.items.map((item: any, index: number) => (
                            <Box key={index} display="flex" justifyContent="space-between" p={1}>
                              <Typography variant="body2">{item.menuItem.name}</Typography>
                              <Typography variant="body2" sx={{ ml: 2 }}>Qty: {item.quantity}</Typography>
                              <Typography variant="body2" sx={{ ml: 2 }}>Price: ₹{item.price}</Typography>
                            </Box>
                          ))}
                        </Box>
                      }
                      arrow
                      placement="top"
                    >
                      <Typography variant="body2" sx={{ color: 'primary.main', cursor: 'pointer' }}>
                        View Items
                      </Typography>
                    </Tooltip>
                  </TableCell>
                  <TableCell>{formatPrice(order.totalAmount)}</TableCell>
                  <TableCell sx={{ color: statusTextMapper[order.status] }}>{order.status}</TableCell>
                  <TableCell>
                    {order.status === "pending" && (
                      <Box sx={{ display: 'flex' }}>
                        <Button
                          variant="contained"
                          color="success"
                          size="small"
                          onClick={() => handleOrderAction(order.orderId, "delivered")}
                          sx={{ mr: 1 }}
                        >
                          Accept
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          onClick={() => handleOpenCancelDialog(order.orderId)}
                        >
                          Cancel
                        </Button>
                      </Box>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Cancel Confirmation Dialog */}
      <Dialog open={cancelDialogOpen} onClose={() => setCancelDialogOpen(false)}>
        <DialogTitle>Confirm Cancellation</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to cancel this order?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCancelDialogOpen(false)} variant="outlined">No</Button>
          <Button onClick={handleConfirmCancel} color="error" variant="contained">
            Yes, Cancel Order
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
