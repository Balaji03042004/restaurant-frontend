import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import AddRestaurant from "./pages/AddRestaurant";

function App() {
  return (
    <Router>
      <div style={{ padding: "20px" }}>
        <h1>Restaurant App</h1>

        {/* Navigation */}
        <Link to="/">Home</Link> |{" "}
        <Link to="/add">Add Restaurant</Link>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddRestaurant />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;