import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const RoleProtectedRoute = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const userRole = sessionStorage.getItem('role'); // Assuming role is stored as 'user' or 'admin'

  // If the user is not authenticated or does not have the correct role, redirect them to login
  if (!userRole || !allowedRoles.includes(userRole)) {
    return <Navigate to="/login" replace />;
  }

  // If role is allowed, render the nested routes
  return <Outlet />;
};

export default RoleProtectedRoute;
