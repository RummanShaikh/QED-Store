import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../Api';
import '../styles.css'; // Ensure you import the CSS file

const ProductList = ({ addToCart, setLoading }) => {
  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    setLoading(true);
    fetchProducts()
      .then(({ data }) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error))
      .finally(() => setLoading(false));
  }, [setLoading]);

  const filteredProducts = products.filter((product) =>
    category ? product.category === category : true
  );

  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sort === 'price-asc') return a.price - b.price;
    if (sort === 'price-desc') return b.price - a.price;
    if (sort === 'rating') return b.rating.rate - a.rating.rate;
    return 0;
  });

  return (
    <div className='product-list'>
      <select className="custom-select" onChange={(e) => setSort(e.target.value)}>
        <option value="">Sort By</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="rating">Rating</option>
      </select>
      <select className="custom-select" onChange={(e) => setCategory(e.target.value)}>
        <option value="">All Categories</option>
        <option value="electronics">Electronics</option>
        <option value="jewelery">Jewelery</option>
        <option value="men's clothing">Men's Clothing</option>
        <option value="women's clothing">Women's Clothing</option>
      </select>
      <div className='product-list'>
        {sortedProducts.map((product) => (
          <Link to={`/product/${product.id}`} key={product.id} className='product-card'>
            <img src={product.image} alt={product.title} />
            <h2>{product.title.substring(0, 20)}{product.title.length > 20 ? '...' : ''}</h2>
            <p>${product.price}</p>
            <p>Rating: {product.rating.rate}</p>
            <button onClick={(e) => { e.preventDefault(); addToCart(product); }}>Add to Cart</button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductList;