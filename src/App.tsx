import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginOrRegister from './components/LoginOrRegister/loginOrRegister';
import  Home from './pages/Home/home';
import { MenuList } from './components/MenuList/menuList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginOrRegister/>}/>
        <Route path="/register" element={<LoginOrRegister/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path="/menu" element={<MenuList/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
