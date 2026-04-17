import React, { useState } from "react";
import { addRestaurant } from "../services/api";
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
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addRestaurant(form)
      .then(() => {
        alert("Restaurant Added Successfully!");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        alert("Error adding restaurant");
      });
  };

  return (
  <div style={{ display: "flex", justifyContent: "center", marginTop: "40px" }}>
    
    {/* 🔥 CARD CONTAINER */}
    <div className="card" style={{ padding: "25px", width: "400px" }}>
      
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        ➕ Add Restaurant
      </h2>

      {/* 🔥 FORM */}
      <form onSubmit={handleSubmit} className="form">

        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Restaurant Name"
        />

        <input
          type="text"
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Address"
        />

        <input
          type="text"
          name="cuisine"
          value={form.cuisine}
          onChange={handleChange}
          placeholder="Cuisine (e.g., Indian, Chinese)"
        />

        <input
          type="number"
          name="rating"
          value={form.rating}
          onChange={handleChange}
          placeholder="Rating (1-5)"
        />

        {/* 🔥 BUTTON */}
        <button className="btn btn-green" type="submit">
          Add Restaurant
        </button>

      </form>
    </div>

  </div>
);
}

export default AddRestaurant;