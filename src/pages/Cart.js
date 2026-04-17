import React from "react";

function Cart({ cart }) {
  return (
    <div style={{ padding: "20px" }}>
  <h2>🛒 Your Cart</h2>

  {cart.length === 0 ? (
    <p>No items in cart</p>
  ) : (
    <div className="grid">
      {cart.map((item, index) => (
        <div key={index} className="card">
          <div style={{ padding: "10px" }}>
            <h3>{item.name}</h3>
            <p>{item.address}</p>
          </div>
        </div>
      ))}
    </div>
  )}
</div>
  );
}

export default Cart;