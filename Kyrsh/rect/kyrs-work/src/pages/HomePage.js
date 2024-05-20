// HomePage.js
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
// import { Link } from 'react-router-dom';
import ProductList from '../components/ProductList';
import './HomePage.css';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetch('http://localhost/index.php?action=getCategories')
      .then(response => response.json())
      .then(data => setCategories(data));

    fetch(`http://localhost/index.php${selectedCategory ? `?category=${selectedCategory}` : ''}`)
      .then(response => response.json())
      .then(data => setProducts(data));
  }, [selectedCategory]);

  const popularProducts = products.filter(product => product.is_popular);
  const regularProducts = products.filter(product => !product.is_popular);

  return (
    <div className="homepage">
      <Header />
      <div className="categories">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.slug)}
            className={`category-card ${selectedCategory === category.slug ? 'active' : ''}`}
          >
            {category.name}
          </button>
        ))}
      </div>
      <div className="content">
        <div className="main-content">
          <h2>Товары</h2>
          <ProductList products={regularProducts} />
        </div>
        <aside className="sidebar">
          <h2>Популярные товары</h2>
          <ProductList products={popularProducts} />
        </aside>
      </div>
    </div>
  );
}

export default HomePage;
