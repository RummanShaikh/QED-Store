import React, { useState, useEffect } from 'react';
import '../styles.css'; // Ensure you import the CSS file

const Cart = ({ cart, updateCart, removeFromCart }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Adjust the delay as needed

    return () => clearTimeout(timer);
  }, []);

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  if (loading) {
    return <div className="loading-spinner">Loading...</div>;
  }

  return (
    <div className='cart-container'>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className='cart-items'>
          <h2>Your Cart</h2>
          {cart.map((item) => (
            <div key={item.id} className='cart-item'>
              <img src={item.image} alt={item.title} />
              <h3>{item.title}</h3>
              <p>${item.price}</p>
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => updateCart(item.id, parseInt(e.target.value, 10))}
              />
              <button className="delete-button" onClick={() => removeFromCart(item.id)}>
                <i className="fas fa-trash-alt"></i>
              </button>
            </div>
          ))}
          <h2>Total Price: ${totalPrice.toFixed(2)}</h2>
        </div>
      )}
    </div>
  );
};

export default Cart;