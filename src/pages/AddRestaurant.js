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
        navigate("/"); // go back to home
      })
      .catch((err) => {
        console.log(err);
        alert("Error adding restaurant");
      });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add Restaurant</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          type="text"
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          type="text"
          name="cuisine"
          placeholder="Cuisine"
          value={form.cuisine}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          type="number"
          name="rating"
          placeholder="Rating"
          value={form.rating}
          onChange={handleChange}
          required
        />
        <br /><br />

        <button type="submit">Add Restaurant</button>
      </form>
    </div>
  );
}

export default AddRestaurant;