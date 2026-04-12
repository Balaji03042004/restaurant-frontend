import React, { useEffect, useState } from "react";
import { getRestaurants } from "../services/api";
import RestaurantCard from "../components/RestaurantCard";

function Home({ addToCart }) {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getRestaurants()
      .then((res) => {
        setRestaurants(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch data");
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Restaurants</h2>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {restaurants.map((r) => (
          <RestaurantCard
            key={r.id}
            restaurant={r}
            addToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;