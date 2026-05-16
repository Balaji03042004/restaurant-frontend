import React, { useEffect, useState } from "react";
import { getRestaurants, updateRestaurantLike } from "../services/restaurantService";
import RestaurantCard from "../components/RestaurantCard";

function Home({ addToCart }) {
  const [restaurants, setRestaurants] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    getRestaurants()
      .then((res) => setRestaurants(res.data))
      .catch(() => setError("Failed to load restaurants. Please try again."));
  }, []);

  const handleDeleteUI = (id) => {
    setRestaurants((prev) => prev.filter((r) => r.id !== id));
  };

  const handleLikeToggle = (restaurant) => {
    const updated = { ...restaurant, isLiked: !restaurant.isLiked };

    setRestaurants((prev) =>
      prev.map((r) => (r.id === restaurant.id ? updated : r))
    );

    updateRestaurantLike(restaurant.id, updated).catch(() => {
      setRestaurants((prev) =>
        prev.map((r) => (r.id === restaurant.id ? restaurant : r))
      );
    });
  };

  const filtered = restaurants.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page">

      {error && <p style={{ color: "red", padding: "10px" }}>{error}</p>}

      <input
        className="search"
        placeholder="Search restaurants..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid">
        {filtered.map((r, index) => (
          <RestaurantCard
            key={r.id}
            restaurant={r}
            addToCart={addToCart}
            onDelete={handleDeleteUI}
            onLikeToggle={handleLikeToggle}
            index={index}   
          />
        ))}
      </div>
    </div>
  );
}

export default Home;