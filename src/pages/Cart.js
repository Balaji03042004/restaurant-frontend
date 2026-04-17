import React from "react";

function Cart({ cart, removeFromCart }) {
  return (
    <div className="page">
      <h2>🛒 Cart</h2>

      {cart.length === 0 ? (
        <p>No items</p>
      ) : (
        cart.map((item, i) => (
          <div className="card cart-item" key={i}>
            <div>
              <h4>{item.name}</h4>
              <p>₹{item.price}</p>
            </div>

            <button onClick={() => removeFromCart(i)}>Remove</button>
          </div>
        ))
      )}
    </div>
  );
}

export default Cart;