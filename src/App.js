import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import AddRestaurant from "./pages/AddRestaurant";
import Cart from "./pages/Cart";
import RestaurantDetails from "./pages/RestaurantDetails";
import EditRestaurant from "./pages/EditRestaurant";

import "./App.css";

function App() {
  // 🛒 Cart state
  const [cart, setCart] = useState([]);

  // ➕ Add to cart
  const addToCart = (restaurant) => {
    setCart([...cart, restaurant]);
  };

  return (
    <Router>
      <div style={{ padding: "20px" }}>
        <h1>Restaurant App</h1>

        {/* 🔥 NAVBAR */}
        <div className="navbar">
          <div className="logo">🍽 Foodie</div>

          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/add">Add</Link>

            <Link to="/cart">
              Cart <span className="cart-badge">{cart.length}</span>
            </Link>
          </div>
        </div>

        {/* 🚀 ROUTES */}
        <Routes>
          <Route path="/" element={<Home addToCart={addToCart} />} />
          <Route path="/add" element={<AddRestaurant />} />
          <Route path="/cart" element={<Cart cart={cart} />} />
          <Route path="/restaurant/:id" element={<RestaurantDetails />} />
          <Route path="/edit/:id" element={<EditRestaurant />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;