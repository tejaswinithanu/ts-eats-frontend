import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginOrRegister from './components/LoginOrRegister/loginOrRegister';
import  Home from './pages/Home/home';
import Menu from './pages/Menu/menu'
import { ProtectedRoute } from './components/ProtectedRoute/protectedRoute';
import Cart from './pages/Cart/cart';

function App() {
  return (
    <BrowserRouter>  
      <Routes>
        <Route path="/login" element={<LoginOrRegister/>}/>
        <Route path="/register" element={<LoginOrRegister/>}/>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/cart" element={<Cart/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
