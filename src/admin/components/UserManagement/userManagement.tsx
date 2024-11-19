import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllUsers, updateSearchUserValue } from "../../../store/userManagement.store";
import "react-toastify/dist/ReactToastify.css";
import { ErrorView } from "../../../user/components/ErrorView/errorView";
import { getOrderHistory } from "../../../store/userSlice";
import { Skeleton, Typography } from "@mui/material";

export const UserManagement = () => {
  const { users, getUsersStatus, searchUserValue } = useSelector(
    (state: any) => state.userManagementSlice
  );
  const [isErrorOpen, setError] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<string>("userId");

  useEffect(() => {
    dispatch<any>(getAllUsers());
  }, [dispatch]);

  const handleViewOrders = async (userId: string) => {
    await dispatch(getOrderHistory(userId));
    navigate(`/orders/${userId}`);
  };

  const handleRequestSort = (property: string) => {
    const isAscending = orderBy === property && order === "asc";
    setOrder(isAscending ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortUsers = (array: any[]) => {
    const sortedArray = [...array];
    return sortedArray.sort((a, b) => {
      if (orderBy === "userId" || orderBy === "username") {
        const compareA = a[orderBy]?.toLowerCase();
        const compareB = b[orderBy]?.toLowerCase();
        if (compareA < compareB) {
          return order === "asc" ? -1 : 1;
        }
        if (compareA > compareB) {
          return order === "asc" ? 1 : -1;
        }
        return 0;
      }

      if (orderBy === "createdAt") {
        const compareA = new Date(a[orderBy]);
        const compareB = new Date(b[orderBy]);
        if (compareA < compareB) {
          return order === "asc" ? -1 : 1;
        }
        if (compareA > compareB) {
          return order === "asc" ? 1 : -1;
        }
        return 0;
      }

      return 0;
    });
  };

  const renderSkeletonRows = () => {
    return Array.from({ length: 5 }).map((_, index) => (
      <tr key={index}>
        <td><Skeleton variant="text" width="70%" /></td>
        <td><Skeleton variant="text" width="40%" /></td>
        <td><Skeleton variant="rectangular" width="50px" height="30px" /></td>
      </tr>
    ));
  };

  const onChangeSearchUserValue = (e: any) => {
    dispatch(updateSearchUserValue(e.target.value));
  };

  const sortedUsers = sortUsers(users);

  return (
    <div style={{ padding: "8px 20px" }}>
        
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px", alignItems:'center' }}>
      <Typography variant='h6'>USERS</Typography>
        <input
          type="search"
          placeholder="Search by Name"
          style={{
            padding: "8px",
            width: "40%",
            border: "1px solid #ccc",
            borderRadius: "4px",
            outline:'none'
          }}
          onChange={onChangeSearchUserValue}
        />
      </div>

      {getUsersStatus === "loading" ? (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead style={{ backgroundColor: "var(--primary-color)" }}>
          <tr>
            <th style={{ fontWeight: "bold", padding: "10px" }}>Customer Name</th>
            <th style={{ fontWeight: "bold", padding: "10px" }}>Joined At</th>
            <th style={{ fontWeight: "bold", padding: "10px" }}>Orders</th>
          </tr>
        </thead>
        <tbody>{renderSkeletonRows()}</tbody>
      </table>
      ) : getUsersStatus === "failed" ? (
        <ErrorView
          open={isErrorOpen}
          onClose={() => setError(false)}
          errorMessage="Couldn't get users"
        />
      ) : (
        <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: "0 20px" }}>
          <thead>
            <tr style={{ backgroundColor: "#f4f4f4" }}>
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
                  <div onClick={() => handleRequestSort("username")} style={{flex:1, display:'flex', justifyContent:'flex-start'}}>
                  <span>Customer Name</span>
                  </div>
                  <div onClick={() => handleRequestSort("createdAt")} style={{flex:1, display:'flex', justifyContent:'center'}}>
                  <span>Joined At</span>
                  </div>
                  <div style={{flex:1, display:'flex', justifyContent:'center'}}>
                  <span>Orders</span>
                  </div>
                </div>
              </th>
              
            </tr>
          </thead>
          <tbody>
            {sortedUsers
              .filter((user: any) =>
                user.username.toLowerCase().includes(searchUserValue.toLowerCase())
              )
              .map((user: any) => (
                <tr key={user.userId}>
                  <td colSpan={3} style={{ padding: 0, border: "none" }}>
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
                    }}
                    className="row-container"
                  >
                    <div style={{flex:1, display:'flex', justifyContent:'flex-start'}}>
                    <span>
                      {user.username}
                    </span>
                    </div>
                    <div style={{flex:1, display:'flex', justifyContent:'center'}}>
                    <span>{new Date(user.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div style={{flex:1, display:'flex', justifyContent:'center'}}>
                    <span>
                      <button style={{padding:'10px',backgroundColor:'transparent',border:'1px solid var(--primary-color)', borderRadius:'10px'}} onClick={() => handleViewOrders(user.userId)}>View Orders</button>
                    </span>
                    </div>
                  </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
