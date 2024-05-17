// src/pages/HomePage.js
import React, { useState } from 'react';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import ProductList from '../components/ProductList';
import './HomePage.css';

// const mockProducts = [
//   {
//     id: 1,
//     name: 'Старый диван',
//     description: 'Комфортный диван, немного изношен.',
//     price: 3000,
//     image: 'path/to/image1.jpg',
//     popular: true,
//   },
//   {
//     id: 2,
//     name: 'Деревянный стол',
//     description: 'Стол из массива дуба, практически новый.',
//     price: 5000,
//     image: 'path/to/image2.jpg',
//     popular: false,
//   },
//   {
//     id: 3,
//     name: 'Деревянный стол',
//     description: 'Стол из массива дуба, практически новый.',
//     price: 5000,
//     image: 'path/to/image2.jpg',
//     popular: false,
//   },
//   {
//     id: 5,
//     name: 'Деревянный стол',
//     description: 'Стол из массива дуба, практически новый.',
//     price: 5000,
//     image: 'path/to/image2.jpg',
//     popular: false,
//   },
//   {
//     id: 6,
//     name: 'Деревянный стол',
//     description: 'Стол из массива дуба, практически новый.',
//     price: 5000,
//     image: 'path/to/image2.jpg',
//     popular: false,
//   },
//   {
//     id: 7,
//     name: 'Деревянный стол',
//     description: 'Стол из массива дуба, практически новый.',
//     price: 5000,
//     image: 'path/to/image2.jpg',
//     popular: false,
//   },
//   {
//     id: 8,
//     name: 'Деревянный стол',
//     description: 'Стол из массива дуба, практически новый.',
//     price: 5000,
//     image: 'path/to/image2.jpg',
//     popular: false,
//   },
//   {
//     id: 9,
//     name: 'Деревянный стол',
//     description: 'Стол из массива дуба, практически новый.',
//     price: 5000,
//     image: 'path/to/image2.jpg',
//     popular: false,
//   },
//   {
//     id: 10,
//     name: 'Деревянный стол',
//     description: 'Стол из массива дуба, практически новый.',
//     price: 5000,
//     image: 'path/to/image2.jpg',
//     popular: false,
//   },
//   {
//     id: 11,
//     name: 'Деревянный стол',
//     description: 'Стол из массива дуба, практически новый.',
//     price: 5000,
//     image: 'path/to/image2.jpg',
//     popular: false,
//   },
//   // Добавьте больше продуктов по аналогии
// ];
// const categories = [
//   { id: 1, name: 'Столы' },
//   { id: 2, name: 'Стулья' },
//   { id: 3, name: 'Диваны' },
//   { id: 4, name: 'Кровати' },
//   { id: 5, name: 'Кресла' },
//   { id: 6, name: 'Шкафы' },
//   // Добавьте больше категорий по аналогии
// ];


const HomePage = () => {
  const [products, setProducts] = useState(mockProducts);
  const [searchQuery, setSearchQuery] = useState('');

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
        {categories.map(category => (
          <Link key={category.id} to={`/category/${category.id}`} className="category-card">
            <div className="category-name">{category.name}</div>
          </Link>
        ))}
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

export default HomePage