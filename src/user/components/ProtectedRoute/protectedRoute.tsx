import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const isAuthenticated = () => {
  return sessionStorage.getItem('token') !== null;
};

export const ProtectedRoute = () => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  return <Outlet />; // Render child routes
};
