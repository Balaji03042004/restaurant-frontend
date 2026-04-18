import React from "react";
import { useNavigate } from "react-router-dom";
import { deleteRestaurant } from "../services/restaurantService";
import { FaHeart, FaRegHeart } from "react-icons/fa";

import food1 from "../assets/food1.jpg";
import food2 from "../assets/food2.jpg";
import food3 from "../assets/food3.jpg";
import food4 from "../assets/food4.jpg";
import food5 from "../assets/food5.jpg";
import food6 from "../assets/food6.jpg";
import food7 from "../assets/food7.jpg";
import food8 from "../assets/food8.jpg";

function RestaurantCard({
  restaurant,
  addToCart,
  onDelete,
  onLikeToggle,
  index, // ✅ IMPORTANT (from Home.js)
}) {
  const navigate = useNavigate();

  // 🍔 FIXED IMAGE ARRAY (NO RANDOM)
  const images = [
    food1,
    food2,
    food3,
    food4,
    food5,
    food6,
    food7,
    food8,
  ];

  // 🧠 STABLE IMAGE SELECTION (ORDER BASED)
  const imageUrl = images[index % images.length];

  // ❌ DELETE
  const handleDelete = (id) => {
    deleteRestaurant(id)
      .then(() => {
        alert("Deleted successfully");
        onDelete(id);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div
      className="card"
      onClick={() => navigate(`/restaurant/${restaurant.id}`)}
      style={{
        cursor: "pointer",
        borderRadius: "14px",
        overflow: "hidden",
        background: "#fff",
        transition: "0.3s",
      }}
    >
      {/* 🍔 IMAGE */}
      <div style={{ position: "relative" }}>
        <img
          src={imageUrl}
          alt="food"
          style={{
            width: "100%",
            height: "170px",
            objectFit: "cover",
          }}
        />

        {/* ⭐ Rating */}
        <div
          style={{
            position: "absolute",
            bottom: "10px",
            left: "10px",
            background: "green",
            color: "white",
            padding: "4px 8px",
            borderRadius: "6px",
            fontSize: "13px",
          }}
        >
          ⭐ {restaurant.rating || "4.2"}
        </div>

        {/* 🟢🔴 Veg/Non-Veg */}
        <div
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            background:
              restaurant.category === "Veg" ? "green" : "red",
            color: "white",
            padding: "4px 8px",
            borderRadius: "6px",
            fontSize: "12px",
          }}
        >
          {restaurant.category === "Veg" ? "🟢 Veg" : "🔴 Non-Veg"}
        </div>

        {/* ❤️ Like Button */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            onLikeToggle && onLikeToggle(restaurant);
          }}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "white",
            padding: "6px",
            borderRadius: "50%",
          }}
        >
          {restaurant.isLiked ? (
            <FaHeart color="red" />
          ) : (
            <FaRegHeart />
          )}
        </div>
      </div>

      {/* 📄 CONTENT */}
      <div style={{ padding: "12px" }}>
        <h3 style={{ margin: "0 0 5px 0" }}>
          {restaurant.name || "No Name"}
        </h3>

        <p style={{ color: "gray", fontSize: "14px" }}>
          {restaurant.cuisine || "Cuisine"}
        </p>

        <p style={{ color: "gray", fontSize: "13px" }}>
          📍 {restaurant.address || "No Address"}
        </p>

        <p style={{ fontWeight: "bold", marginTop: "5px" }}>
          ₹{restaurant.price || 200}
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