import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRestaurantById, updateRestaurant } from "../services/restaurantService";

function EditRestaurant() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [restaurant, setRestaurant] = useState({
    name: "",
    address: ""
  });

  useEffect(() => {
    getRestaurantById(id)
      .then((res) => setRestaurant(res.data))
      .catch((err) => console.log(err));
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
      .catch((err) => console.log(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={restaurant.name}
        onChange={handleChange}
        placeholder="Name"
      />

      <input
        name="address"
        value={restaurant.address}
        onChange={handleChange}
        placeholder="Address"
      />

      <button type="submit">Update</button>
    </form>
  );
}

export default EditRestaurant;