import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateOrder, getOrderHistory } from "../../../store/userSlice";
import {
  Box,
  Typography,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Button,
  Skeleton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { statusColorMapper, statusTextMapper } from "../../../utils/statusColorMapper";
import { NoOrdersView } from "../NoOrdersView/noOrdersView";

export const UserOrders = () => {
  const { orderHistory, status } = useSelector((state: any) => state.userSlice);
  const { userId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openDialog, setOpenDialog] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState<any>(null);

  useEffect(() => {
    if (userId) {
      dispatch(getOrderHistory(userId));
    }
  }, [dispatch, userId]);

  const handleCancelOrder = (orderId: any) => {
    setOrderToCancel(orderId);
    setOpenDialog(true);
  };

  const handleConfirmCancel = async () => {
    if (orderToCancel) {
      await dispatch<any>(updateOrder({ orderId: orderToCancel, status: "cancelled" }));
      dispatch(getOrderHistory(userId));
      setOpenDialog(false);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const renderSkeletonRows = () => {
    return Array.from({ length: 5 }).map((_, index) => (
      <tr key={index}>
        <td><Skeleton variant="text" width="80%" /></td>
        <td><Skeleton variant="text" width="60%" /></td>
        <td><Skeleton variant="text" width="70%" /></td>
        <td><Skeleton variant="text" width="40%" /></td>
        <td><Skeleton variant="rectangular" width="50px" height="30px" /></td>
      </tr>
    ));
  };

  return (
    <div style={{padding:'10px 30px'}}>
      {status === "loading" ? (
        <Box>
          <Box sx={{ marginBottom: "20px" }}>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              <Skeleton width="30%" />
            </Typography>
          </Box>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead style={{ backgroundColor: "var(--primary-color)" }}>
              <tr>
                <th style={{ fontWeight: "bold", padding: "10px" }}>Order ID</th>
                <th style={{ fontWeight: "bold", padding: "10px" }}>Ordered At</th>
                <th style={{ fontWeight: "bold", padding: "10px" }}>Items</th>
                <th style={{ fontWeight: "bold", padding: "10px" }}>Status</th>
                <th style={{ fontWeight: "bold", padding: "10px" }}>Action</th>
              </tr>
            </thead>
            <tbody>{renderSkeletonRows()}</tbody>
          </table>
        </Box>
      ) : orderHistory && orderHistory.length === 0 ? (
        <Box>
          <IconButton onClick={() => navigate("/user-management")}>
            <ArrowBackIcon />
          </IconButton>
          <NoOrdersView />
        </Box>
      ) : (
        <Box>
          <Box sx={{ marginBottom: "20px" }}>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              <IconButton onClick={() => navigate("/user-management")}>
                <ArrowBackIcon />
              </IconButton>
              Orders
            </Typography>
          </Box>
          <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: "0 20px" }}>
            <thead>
              <tr>
                <th>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "20px 10px",
                      borderRadius: "10px", // Full border radius for the row
                      backgroundColor:'#e8e8e8'
                }}
                  >
                    <div style={{flex:1, display:'flex', justifyContent:'flex-start'}}>
                      <span>Order ID</span>
                    </div>
                    <div style={{flex:1, display:'flex', justifyContent:'flex-start'}}>
                      <span>Ordered At</span>
                    </div>
                    <div style={{flex:1, display:'flex', justifyContent:'flex-start'}}>
                      <span>Items</span>
                    </div>
                    <div style={{flex:1, display:'flex', justifyContent:'flex-start'}}>
                      <span>Status</span>
                    </div>
                    <div style={{flex:1, display:'flex', justifyContent:'flex-start'}}>
                      <span>Actions</span>
                    </div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {orderHistory.map((order: any) => (
                <tr key={order.orderId}>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "10px",
                        backgroundColor: "#fff",
                        borderRadius: "10px", // Full border radius for the row                      
                        border: "2px solid #dee0e3",
                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                        height:'70px', 
                        borderLeft:`6px solid ${statusColorMapper[order.status]}`
                      }}
                      className="row-container"
                    >

                    <div style={{flex:1, display:'flex', justifyContent:'flex-start'}}>
                      <span>
                      {order.orderId.substring(0,13)}
                      </span>
                    </div>

                    <div style={{flex:1, display:'flex', justifyContent:'flex-start'}}>
                      <span>
                      {new Date(order.orderDate).toLocaleDateString()}
                      </span>
                    </div>

                    <div style={{flex:1, display:'flex', justifyContent:'flex-start'}}>
                      <span>
                      <Tooltip
                      title={
                        <div>
                          {order.items.map((item: any, index: number) => (
                            <div key={index}>
                              <strong>{item.menuItem.name}</strong>: {item.quantity} x ${item.price}
                            </div>
                          ))}
                        </div>
                      }
                      arrow
                    >
                      <span style={{color:'#6c9ef5'}}>View items</span>
                    </Tooltip>
                      </span>
                    </div>

                    <div style={{flex:1, display:'flex', justifyContent:'flex-start'}}>
                      <span style={{color:`${statusTextMapper[order.status]}`}}>
                      {order.status}
                      </span>
                    </div>

                    <div style={{flex:1, display:'flex', justifyContent:'flex-start'}}>
                      <span>
                      {order.status === "pending" ? (
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => handleCancelOrder(order.orderId)}
                        >
                          Cancel
                        </Button>
                      ):
                      (
                        <Typography variant="body2" color="textSecondary">
                          No action required
                        </Typography>
                      )}
                      </span>
                    </div>

                    </div>
                  </td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      )}

      <Dialog open={openDialog} onClose={handleCloseDialog} aria-labelledby="dialog-title" aria-describedby="dialog-description">
        <DialogTitle id="dialog-title">Cancel Order</DialogTitle>
        <DialogContent>
          <Typography id="dialog-description">
            Are you sure you want to cancel this order? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            No
          </Button>
          <Button onClick={handleConfirmCancel} color="error">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
