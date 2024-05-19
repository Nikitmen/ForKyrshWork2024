import React from 'react';
import './ProductCard.css';

const formatDate = (dateString) => {
  const options = { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' };
  return new Date(dateString).toLocaleString('ru-RU', options);
};

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">{product.price} руб.</p>
        <p className="product-date">{formatDate(product.created_at)}</p>
      </div>
    </div>
  );
};

export default ProductCard;
