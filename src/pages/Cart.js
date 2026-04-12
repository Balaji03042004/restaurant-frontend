import React from "react";

function Cart({ cart }) {
  return (
    <div>
      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        cart.map((item, index) => (
          <div key={index}>
            <h3>{item.name}</h3>
            <p>{item.address}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Cart;