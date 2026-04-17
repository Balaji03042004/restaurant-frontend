import React, { useEffect, useState } from "react";
import { getRestaurants, updateRestaurantLike } from "../services/api";
import RestaurantCard from "../components/RestaurantCard";

function Home({ addToCart }) {
  const [restaurants, setRestaurants] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getRestaurants().then((res) => setRestaurants(res.data));
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