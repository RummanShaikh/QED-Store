import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import Header from './components/Header';
import Footer from './components/Footer';
import './styles.css';

const App = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector('.footer');
      if (window.scrollY > 100) {
        footer.classList.remove('hidden');
      } else {
        footer.classList.add('hidden');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateCart = (id, quantity) => {
    setCart(cart.map((item) => (item.id === id ? { ...item, quantity } : item)));
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  return (
    <Router>
      <Header cartCount={cart.length} />
      {loading && <div className="loading-spinner">Loading...</div>}
      <Routes>
        <Route path="/" element={<ProductList addToCart={addToCart} setLoading={setLoading} />} />
        <Route path="/product/:id" element={<ProductDetails addToCart={addToCart} setLoading={setLoading} />} />
        <Route path="/cart" element={<Cart cart={cart} updateCart={updateCart} removeFromCart={removeFromCart} />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;