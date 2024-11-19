import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './user/pages/Home/home';
import Menu from './user/pages/Menu/menu';
import { ProtectedRoute } from './user/components/ProtectedRoute/protectedRoute';
import Cart from './user/pages/Cart/cart';
import AuthForm from './user/components/AuthForm/authForm';
import CheckoutPage from './user/components/Checkout/checkout';
import { Runway } from './user/components/Runway/runway';
import { AdminLandingPage } from './admin/components/AdminLandingPage/adminLandingPage';
import { UserOrders } from './admin/components/UserOrders/userOrders';
import { UserManagement } from './admin/components/UserManagement/userManagement';
import { MenuManagement } from './admin/components/MenuManagement/menuMangement';
import { OrderManagement } from './admin/components/OrderManagement/orderManagement';
import { MyOrders } from './user/pages/MyOrders/myOrders';
import RoleProtectedRoute from './user/components/RoleProtectedRoute/roleProtectedRoute'; 
import { AdminDashboard } from './admin/pages/AdminDashboard/adminDashboard';

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
