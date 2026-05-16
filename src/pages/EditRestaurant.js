import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRestaurantById, updateRestaurant } from "../services/restaurantService";

function EditRestaurant() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [restaurant, setRestaurant] = useState({
    name: "",
    address: "",
    cuisine: "",
    rating: "",
  });

  useEffect(() => {
    getRestaurantById(id)
      .then((res) => setRestaurant(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    setRestaurant({
      ...restaurant,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    updateRestaurant(id, restaurant)
      .then(() => {
        alert("Updated successfully");
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to update restaurant. Please try again.");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={restaurant.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />

      <input
        name="address"
        value={restaurant.address}
        onChange={handleChange}
        placeholder="Address"
        required
      />

      <input
        name="cuisine"
        value={restaurant.cuisine}
        onChange={handleChange}
        placeholder="Cuisine (Indian, Chinese...)"
        required
      />

      <input
        type="number"
        name="rating"
        value={restaurant.rating}
        onChange={handleChange}
        placeholder="Rating (1 - 5)"
        min="1"
        max="5"
        step="0.1"
        required
      />

      <button type="submit">Update</button>
    </form>
  );
}

export default EditRestaurant;