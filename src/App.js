import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import AddRestaurant from "./pages/AddRestaurant";
import Cart from "./pages/Cart";
import RestaurantDetails from "./pages/RestaurantDetails";
import EditRestaurant from "./pages/EditRestaurant";
import Login from "./pages/Login";
import LoginSuccess from "./pages/LoginSuccess";

import { AuthContext } from "./context/AuthContext";

import "./App.css";

// Defined outside App to avoid unnecessary remounts on every render
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {

  const [cart, setCart] = useState([]);

  const { login, isAuthenticated, logout } = useContext(AuthContext);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      login(token);
      window.history.replaceState({}, document.title, "/");
    }
  }, [login]);

  const addToCart = (item) => {
    setCart((prev) => [...prev, item]);
  };

  const removeFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const totalItems = cart.length;

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
            <Link to="/cart">Cart ({totalItems})</Link>

            {/* AUTH BUTTON */}
            {isAuthenticated ? (
              <button onClick={logout} className="logout-btn">
                Logout
              </button>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </div>
        </div>

        <Routes>

          {/* PUBLIC */}
          <Route path="/login" element={<Login />} />
          <Route path="/login/success" element={<LoginSuccess />} />

          {/* PROTECTED ROUTES */}
          <Route path="/" element={
            <ProtectedRoute>
              <Home addToCart={addToCart} />
            </ProtectedRoute>
          } />

          <Route path="/add" element={
            <ProtectedRoute>
              <AddRestaurant />
            </ProtectedRoute>
          } />

          <Route path="/cart" element={
            <ProtectedRoute>
              <Cart cart={cart} removeFromCart={removeFromCart} />
            </ProtectedRoute>
          } />

          <Route path="/restaurant/:id" element={
            <ProtectedRoute>
              <RestaurantDetails addToCart={addToCart} />
            </ProtectedRoute>
          } />

          <Route path="/edit/:id" element={
            <ProtectedRoute>
              <EditRestaurant />
            </ProtectedRoute>
          } />

        </Routes>

      </div>
    </Router>
  );
}

export default App;