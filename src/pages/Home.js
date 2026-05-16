import React, { useEffect, useState } from "react";
import { getRestaurants, updateRestaurantLike } from "../services/restaurantService";
import RestaurantCard from "../components/RestaurantCard";

function Home({ addToCart }) {
  const [restaurants, setRestaurants] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  const [aiInput, setAiInput] = useState("");
  const [aiResult, setAiResult] = useState("");
  const [loadingAi, setLoadingAi] = useState(false);

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

  const getAiRecommendation = async () => {
    if (!aiInput.trim()) return;

    setLoadingAi(true);
    try {
      const res = await fetch("http://localhost:8080/api/ai/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "text/plain"
        },
        body: aiInput
      });

      const data = await res.text();
      setAiResult(data);
    } catch (err) {
      setAiResult("Failed to get AI suggestions");
    }
    setLoadingAi(false);
  };

  const filtered = restaurants.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page">

      {error && <p style={{ color: "red", padding: "10px" }}>{error}</p>}


            <div style={{ padding: "10px" }}>
        <h3>🤖 AI Food Suggestions</h3>

        <input
          className="search"
          placeholder="e.g. spicy chicken, veg dinner..."
          value={aiInput}
          onChange={(e) => setAiInput(e.target.value)}
        />

        <button onClick={getAiRecommendation} style={{ marginTop: "5px" }}>
          Get Suggestions
        </button>

        {loadingAi && <p>Loading AI suggestions...</p>}

        {aiResult && (
          <div style={{ background: "#f5f5f5", padding: "10px", marginTop: "10px" }}>
            <strong>Suggestions:</strong>
            <pre>{aiResult}</pre>
          </div>
        )}
        </div>

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