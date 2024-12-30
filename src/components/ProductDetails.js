import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../Api';
import '../styles.css'; // Ensure you import the CSS file

const ProductDetails = ({ addToCart, setLoading }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchProductById(id)
      .then(({ data }) => setProduct(data))
      .catch((error) => console.error('Error fetching product details:', error))
      .finally(() => setLoading(false));
  }, [id, setLoading]);

  if (!product) return null;

  return (
    <div className='product-details'>
      <img src={product.image} alt={product.title} />
      <div className='details'>
        <h1>{product.title}</h1>
        <p>{product.description}</p>
        <p>Category: {product.category}</p>
        <p className="price">Price: ${product.price}</p>
        <p className="rating">Rating: {product.rating.rate}</p>
        <button className="add-to-cart" onClick={() => addToCart(product)}>Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductDetails;