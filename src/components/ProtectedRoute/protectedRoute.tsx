import React from 'react';
import { Navigate } from 'react-router-dom';


const isAuthenticated = () => {
    return sessionStorage.getItem('token') !== null;
};

export const ProtectedRoute = ({ children }:any) => {
    if (!isAuthenticated()) {
        return <Navigate to="/login" />;
    }
    return children;
};


