import React from "react";
import { useNavigate } from "react-router-dom";
import { deleteRestaurant } from "../services/api";

import food1 from "../assets/food1.jpg";
import food2 from "../assets/food2.jpg";
import food3 from "../assets/food3.jpg";

function RestaurantCard({ restaurant, addToCart, onDelete, index }) {
  const navigate = useNavigate();

  const images = [food1, food2, food3];

  const imageIndex = Math.floor(Math.random() * images.length);

  const handleDelete = (id) => {
    deleteRestaurant(id)
      .then(() => {
        alert("Deleted successfully");
        onDelete(id); // 🔥 instant UI update
      })
      .catch((err) => console.log(err));
  };

  return (
    <div
      className="card"
      onClick={() => navigate(`/restaurant/${restaurant.id}`)}
      style={{ cursor: "pointer" }}
    >
      {/* 🍔 IMAGE */}
      <img
        src={images[imageIndex]}
        alt="food"
        onError={(e) => (e.target.src = food1)}
        style={{
          width: "100%",
          height: "150px",
          objectFit: "cover",
          borderTopLeftRadius: "12px",
          borderTopRightRadius: "12px",
        }}
      />

      {/* 📄 CONTENT */}
      <div style={{ padding: "12px" }}>
        <h3 style={{ margin: "0 0 5px 0" }}>
          {restaurant.name || "No Name"}
        </h3>

        <p style={{ color: "gray", fontSize: "14px" }}>
          📍 {restaurant.address || "No Address"}
        </p>

        <p style={{ fontWeight: "bold" }}>
          ⭐ {restaurant.rating || "4.2"}
        </p>

        {/* 🔘 BUTTONS */}
        <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
          <button
            className="btn btn-green"
            onClick={(e) => {
              e.stopPropagation();
              addToCart(restaurant);
            }}
          >
            Add
          </button>

          <button
            className="btn btn-blue"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/edit/${restaurant.id}`);
            }}
          >
            Edit
          </button>

          <button
            className="btn btn-red"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(restaurant.id);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default RestaurantCard;