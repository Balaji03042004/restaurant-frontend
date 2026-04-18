import React, { useState } from "react";
import { addRestaurant } from "../services/restaurantService";
import { useNavigate } from "react-router-dom";

function AddRestaurant() {
  const [form, setForm] = useState({
    name: "",
    address: "",
    cuisine: "",
    rating: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addRestaurant(form)
      .then(() => {
        alert("Restaurant Added Successfully!");
        navigate("/");
      })
      .catch(() => alert("Error adding restaurant"));
  };

  return (
    <div className="add-page">

      <div className="form-card">

        <h2 className="title">🍽 Add Restaurant</h2>
        <p className="subtitle">Create a new restaurant listing</p>

        <form onSubmit={handleSubmit} className="form">

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Restaurant Name"
            required
          />

          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Address"
            required
          />

          <input
            name="cuisine"
            value={form.cuisine}
            onChange={handleChange}
            placeholder="Cuisine (Indian, Chinese...)"
            required
          />

          <input
            type="number"
            name="rating"
            value={form.rating}
            onChange={handleChange}
            placeholder="Rating (1 - 5)"
            min="1"
            max="5"
            step="0.1"
            required
          />

          <button type="submit" className="submit-btn">
            ➕ Add Restaurant
          </button>

        </form>

      </div>

    </div>
  );
}

export default AddRestaurant;