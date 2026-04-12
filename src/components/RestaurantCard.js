
function RestaurantCard({ restaurant, addToCart }) {
  return (
    <div>
      <h3>{restaurant.name}</h3>
      <p>{restaurant.address}</p>
      <button onClick={() => addToCart(restaurant)}>
        Add to Cart
      </button>
    </div>
  );
}

export default RestaurantCard;