import React, { useEffect, useState } from "react";
import { getRestaurants } from "../services/api";

function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getRestaurants()
      .then((res) => {
        console.log("DATA:", res.data);
        setRestaurants(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("ERROR:", err);
        setError("Failed to fetch data");
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Restaurants</h2>

      {/* ✅ Loading */}
      {loading && <p>Loading...</p>}

      {/* ❌ Error */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* ⚠️ No Data */}
      {!loading && restaurants.length === 0 && !error && (
        <p>No restaurants found</p>
      )}

      {/* ✅ Grid UI */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {restaurants.map((r) => (
          <div
            key={r.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "15px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              transition: "transform 0.2s",
            }}
          >
            <h3>{r.name}</h3>
            <p>📍 {r.address}</p>
            <p>🍽 {r.cuisine}</p>
            <p>⭐ {r.rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;