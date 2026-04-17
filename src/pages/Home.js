import React, { useEffect, useState } from "react";
import { getRestaurants } from "../services/api";
import RestaurantCard from "../components/RestaurantCard";

function Home({ addToCart }) {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  // 🔍 FILTER
  const filteredRestaurants = restaurants.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  // ✅ DELETE WITHOUT RELOAD
  const handleDeleteUI = (id) => {
    setRestaurants((prev) => prev.filter((r) => r.id !== id));
  };

  useEffect(() => {
    getRestaurants()
      .then((res) => {
        setRestaurants(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch data");
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      
      {/* 🔥 BANNER */}
      <div
        style={{
          position: "relative",
          height: "200px",
          borderRadius: "12px",
          overflow: "hidden",
          marginBottom: "20px",
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4"
          alt="banner"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />

        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: "24px",
            fontWeight: "bold",
          }}
        >
          Discover Great Food 🍽
        </div>
      </div>

      <h2 style={{ textAlign: "center" }}>Restaurants</h2>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* 🔍 SEARCH */}
      <input
        type="text"
        placeholder="🔍 Search restaurants..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "12px 15px",
          width: "100%",
          borderRadius: "25px",
          border: "1px solid #ddd",
          marginBottom: "20px",
          fontSize: "14px",
          outline: "none",
        }}
      />

      {/* ❗ EMPTY STATE */}
      {filteredRestaurants.length === 0 && !loading && (
        <p style={{ textAlign: "center" }}>No restaurants found 😢</p>
      )}

      {/* 🍽 GRID */}
      <div className="grid">
        {filteredRestaurants.map((r, index) => (
          <RestaurantCard
            key={r.id}
            restaurant={r}
            addToCart={addToCart}
            onDelete={handleDeleteUI} 
             index={index}  
          />
        ))}
      </div>
    </div>
  );
}

export default Home;