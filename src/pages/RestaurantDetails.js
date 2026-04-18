import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRestaurantById, getMenuByRestaurant } from "../services/restaurantService";

function RestaurantDetails({ addToCart }) {
  const { id } = useParams();

  // ✅ STATE (FIXED - was missing in your code)
  const [restaurant, setRestaurant] = useState(null);
  const [menu, setMenu] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [cartMap, setCartMap] = useState({});

  // 🔥 LOAD DATA
  useEffect(() => {
    getRestaurantById(id)
      .then((res) => setRestaurant(res.data))
      .catch((err) => console.log(err));

    getMenuByRestaurant(id)
      .then((res) => setMenu(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!restaurant) return <p style={{ padding: "20px" }}>Loading...</p>;

  // 🍽 Categories
  const categories = [
    "All",
    ...new Set(menu.map((item) => item.category)),
  ];

  // 🔍 Filter menu
  const filteredMenu =
    activeCategory === "All"
      ? menu
      : menu.filter((item) => item.category === activeCategory);

  // ➕ ADD ITEM
  const handleAdd = (item) => {
    setCartMap((prev) => ({
      ...prev,
      [item.id]: (prev[item.id] || 0) + 1,
    }));

    addToCart?.(item);
  };

  // ➖ REMOVE ITEM
  const handleRemove = (item) => {
    setCartMap((prev) => {
      const current = prev[item.id] || 0;

      if (current <= 1) {
        const copy = { ...prev };
        delete copy[item.id];
        return copy;
      }

      return {
        ...prev,
        [item.id]: current - 1,
      };
    });
  };

  return (
    <div className="menu-page">

      {/* 🏢 RESTAURANT HEADER */}
      <div className="sticky-header">
        <h2 style={{ margin: 0 }}>{restaurant.name}</h2>
        <p style={{ margin: "5px 0", color: "gray" }}>
          ⭐ {restaurant.rating} • {restaurant.cuisine}
        </p>
        <p style={{ fontSize: "13px", color: "gray" }}>
          📍 {restaurant.address}
        </p>
      </div>

      {/* 🍱 CATEGORY FILTER */}
      <div className="category-bar">
        {categories.map((cat) => (
          <button
            key={cat}
            className={activeCategory === cat ? "active-chip" : "chip"}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 🍔 MENU LIST */}
      <div className="menu-list">
        {filteredMenu.map((item) => {
          const count = cartMap[item.id] || 0;

          return (
            <div className="menu-card" key={item.id}>

              {/* LEFT SIDE */}
              <div>
                <h4 style={{ margin: 0 }}>{item.name}</h4>
                <p style={{ fontSize: "12px", color: "gray" }}>
                  {item.category}
                </p>
                <b>₹{item.price}</b>
              </div>

              {/* RIGHT SIDE (BUTTONS) */}
              {count === 0 ? (
                <button className="add-btn" onClick={() => handleAdd(item)}>
                  ADD
                </button>
              ) : (
                <div className="qty-box">
                  <button onClick={() => handleRemove(item)}>-</button>
                  <span>{count}</span>
                  <button onClick={() => handleAdd(item)}>+</button>
                </div>
              )}

            </div>
          );
        })}
      </div>

    </div>
  );
}

export default RestaurantDetails;