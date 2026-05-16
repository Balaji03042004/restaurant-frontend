import React from "react";
import "./Cart.css";

function Cart({ cart, removeFromCart }) {
  const totalPrice = cart.reduce((sum, item) => sum + (item.price || 0), 0);

  return (
    <div className="cart-page">
      {/* LEFT SIDE - ITEMS */}
      <div className="cart-left">
        <div className="cart-header">
          <h2>🛒 Cart</h2>
          <p>{cart.length} items added</p>
        </div>

        {cart.length === 0 ? (
          <div className="empty-cart">No items in your cart 🍽️</div>
        ) : (
          cart.map((item, i) => (
            <div className="food-card" key={i}>
              <div className="food-info">
                <h3>{item.name}</h3>
                <p className="price">₹{item.price}</p>
              </div>

              <button
                className="remove-btn"
                onClick={() => removeFromCart(i)}
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>

      {/* RIGHT SIDE - SUMMARY (SWIGGY STYLE STICKY) */}
      <div className="cart-right">
        <div className="summary-card">
          <h3>Bill Details</h3>

          <div className="summary-row">
            <span>Item Total</span>
            <span>₹{totalPrice}</span>
          </div>

          <div className="summary-row">
            <span>Delivery Fee</span>
            <span className="free">FREE</span>
          </div>

          <hr />

          <div className="summary-total">
            <span>To Pay</span>
            <span>₹{totalPrice}</span>
          </div>

          <button className="checkout-btn">
            Proceed to Pay
          </button>

          <p className="note">🚀 Safe & Secure Payments</p>
        </div>
      </div>
    </div>
  );
}

export default Cart;