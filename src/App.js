import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import AddRestaurant from "./pages/AddRestaurant";
import Cart from "./pages/Cart";
import RestaurantDetails from "./pages/RestaurantDetails";
import EditRestaurant from "./pages/EditRestaurant";

import "./App.css";

function App() {
  const [cart, setCart] = useState([]);

  // ➕ ADD TO CART
  const addToCart = (item) => {
    setCart((prev) => [...prev, item]);
  };

  // ❌ REMOVE
  const removeFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  // 🧮 TOTAL ITEMS
  const totalItems = cart.length;

  // 💰 TOTAL PRICE
  const totalPrice = cart.reduce(
    (sum, item) => sum + (item.price || 0),
    0
  );

  return (
    <Router>
      <div className="app-container">

        {/* NAVBAR */}
        <div className="navbar">
          <div className="logo">🍽 Foodie</div>

          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/add">Add</Link>

            <Link to="/cart">
              Cart <span className="cart-badge">{totalItems}</span>
            </Link>
          </div>
        </div>

        {/* ROUTES */}
        <Routes>
          <Route path="/" element={<Home addToCart={addToCart} />} />
          <Route path="/add" element={<AddRestaurant />} />
          <Route
            path="/cart"
            element={<Cart cart={cart} removeFromCart={removeFromCart} />}
          />
          <Route
            path="/restaurant/:id"
            element={<RestaurantDetails addToCart={addToCart} />}
          />
          <Route path="/edit/:id" element={<EditRestaurant />} />
        </Routes>

        {/* 🛒 STICKY CART BAR */}
        {cart.length > 0 && (
          <div className="sticky-cart-bar">
            <div>
              <b>{totalItems} items</b>
              <p style={{ margin: 0, fontSize: "12px" }}>
                ₹{totalPrice} total
              </p>
            </div>

            <Link to="/cart">
              <button className="view-cart-btn">
                View Cart →
              </button>
            </Link>
          </div>
        )}

      </div>
    </Router>
  );
}

export default App;