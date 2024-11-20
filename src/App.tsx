import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './user/pages/home';
import Menu from './user/pages/menu';
import { ProtectedRoute } from './user/components/protectedRoute';
import Cart from './user/pages/cart';
import AuthForm from './user/components/authForm';
import CheckoutPage from './user/components/checkout';
import { Runway } from './user/components/runway';
import { AdminLandingPage } from './admin/components/adminLandingPage';
import { UserOrders } from './admin/components/userOrders';
import { UserManagement } from './admin/components/userManagement';
import { MenuManagement } from './admin/components/menuMangement';
import { OrderManagement } from './admin/components/OrderManagement/orderManagement';
import { MyOrders } from './user/pages/myOrders';
import RoleProtectedRoute from './user/components/roleProtectedRoute'; 
import { AdminDashboard } from './admin/pages/adminDashboard';

function App() {
  return (
    <BrowserRouter>  
      <Routes>
        <Route path="/login" element={<AuthForm />} />
        <Route path="/runway" element={<Runway />} />
        <Route path="/register" element={<AuthForm />} />

        {/* Protected route for authenticated users */}
        <Route element={<ProtectedRoute />}>
          
          {/* User Routes - Protected by Role */}
          <Route element={<RoleProtectedRoute allowedRoles={['user']} />}>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/menu/:category" element={<Menu />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/orders" element={<MyOrders />} />
          </Route>

          {/* Admin Routes - Protected by Role */}
          <Route element={<RoleProtectedRoute allowedRoles={['admin']} />}>
            <Route path="admin-dashboard" element={<AdminLandingPage />} />
            <Route path="/" element={<AdminDashboard/>}>    
              <Route path="user-management" element={<UserManagement />} />
              <Route path="menu-management" element={<MenuManagement />} />
              <Route path="order-management" element={<OrderManagement />} />
              <Route path="orders/:userId" element={<UserOrders />} />
            </Route>
          </Route>

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
