import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import AddRestaurant from "./pages/AddRestaurant";
import Cart from "./pages/Cart";

function App() {
  // 🛒 Cart state
  const [cart, setCart] = useState([]);

  // ➕ Add to cart function
  const addToCart = (restaurant) => {
    setCart([...cart, restaurant]);
  };

  return (
    <Router>
      <div style={{ padding: "20px" }}>
        <h1>Restaurant App</h1>

        {/* Navigation */}
        <Link to="/">Home</Link> |{" "}
        <Link to="/add">Add Restaurant</Link> |{" "}
        <Link to="/cart">Cart ({cart.length})</Link>

        <Routes>
          <Route path="/" element={<Home addToCart={addToCart} />} />
          <Route path="/add" element={<AddRestaurant />} />
          <Route path="/cart" element={<Cart cart={cart} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;