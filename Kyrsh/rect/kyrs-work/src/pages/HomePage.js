import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import ProductList from '../components/ProductList';
import './HomePage.css';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const fetchProducts = (category = '') => {
    const categoryParam = category ? `?category=${category}` : '';
    fetch(`http://localhost/index.php${categoryParam}`)
      .then(response => response.json())
      .then(data => {
        if (category) {
          setProducts(data.products);
          setPopularProducts([]);
        } else {
          setPopularProducts(data.popular_products);
          setProducts(data.products);
        }
      })
      .catch(error => console.error('Error fetching products:', error));
  };

  useEffect(() => {
    fetch('http://localhost/index.php?action=getCategories')
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error('Error fetching categories:', error));

    fetchProducts();
  }, []);

  const handleHomeClick = () => {
    setSelectedCategory('');
    fetchProducts();
  };

  return (
    <div>
      <Header onHomeClick={handleHomeClick} />
      <div className="homepage">
        <div className="categories">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => {
                setSelectedCategory(category.slug);
                fetchProducts(category.slug);
              }}
              className={`category-card ${selectedCategory === category.slug ? 'active' : ''}`}
            >
              <span className="category-name">{category.name}</span>
            </button>
          ))}
        </div>
        <div className="content">
          <div className="main-content">
            <aside className="sidebar">
              {popularProducts.length > 0 && (
                <>
                  <h2>Популярные товары</h2>
                  <ProductList products={popularProducts} />
                </>
              )}
            </aside>
            <h2>Все товары</h2>
            <ProductList products={products} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;