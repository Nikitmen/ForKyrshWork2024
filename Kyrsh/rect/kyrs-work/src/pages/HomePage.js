// src/pages/HomePage.js
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import ProductList from '../components/ProductList';
import './HomePage.css';


const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Функция для получения данных о продуктах из PHP скрипта
  useEffect(() => {
    fetch('http://localhost/index.php')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const popularProducts = products.filter(product => product.popular);

  return (
    <div className="homepage">
      <Header onSearch={handleSearch} />
      <div className="categories">
        {/* Пример категорий, замените на свои данные */}
        {/* {categories.map(category => (
          <Link key={category.id} to={`/category/${category.id}`} className="category-card">
            <div className="category-name">{category.name}</div>
          </Link>
        ))} */}
      </div>
      <div className="content">
        <div className="main-content">
          <h2>Товары</h2>
          <ProductList products={filteredProducts} />
        </div>
        <aside className="sidebar">
          <h2>Популярные товары</h2>
          <ProductList products={popularProducts.slice(0, 3)} />
        </aside>
      </div>
    </div>
  );
};

export default HomePage;