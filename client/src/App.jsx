import React, { useContext } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import { AppContext } from './context/AppContext.jsx';
import './index.css'; // Ensure Tailwind CSS is imported
import MyOrders from './pages/MyOrders.jsx';

const App = () => {

  const {isSeller} = useContext(AppContext);
  const isSellerPath = useLocation().pathname.includes('seller');

  return (
    <div>
      {isSellerPath ? null : <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products/:id" element={<Products />} />
        <Route path="/my-orders" element={<MyOrders />} />
      </Routes>
    </div>
  );
};

export default App;
