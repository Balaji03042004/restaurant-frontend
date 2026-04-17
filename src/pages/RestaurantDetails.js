import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRestaurantById } from "../services/api";

function RestaurantDetails() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    getRestaurantById(id)
      .then((res) => setRestaurant(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!restaurant) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>{restaurant.name}</h2>
      <p><strong>Location:</strong> {restaurant.address}</p>

      <button>Edit</button>
      <button>Delete</button>
    </div>
  );
}

export default RestaurantDetails;