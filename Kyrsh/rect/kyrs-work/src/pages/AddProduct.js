import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import './AddProduct.css';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [mainImageUrl, setMainImageUrl] = useState('');
  const [fullDescription, setFullDescription] = useState('');
  const [address, setAddress] = useState('');
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost/index.php?action=getCategories')
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost/create_new_product.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        description,
        price,
        category_id: category,
        main_image_url: mainImageUrl,
        full_description: fullDescription,
        email,
        address,
      }),
    });
    const data = await response.json();

    if (data.status === 'success') {
      setMessage('Product added successfully!');
      navigate('/');
    } else {
      setMessage(`Error: ${data.message}`);
    }
  };

  return (
    <div>
      <Header />
      <div className="add-product-container">
        <h2>Добавить товар</h2>
        <form onSubmit={handleSubmit} className="add-product-form">
          <input
            type="text"
            placeholder="Название"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <textarea
            placeholder="Описание"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Цена"
            min={0}
            value={price}
            onChange={(e) => {
              if (e.target.value >= 0) {
                setPrice(e.target.value)
              }
            }}
            required
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Выберите категорию</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <input
            type="email"
            placeholder="Ваш Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="URL главного изображения"
            value={mainImageUrl}
            onChange={(e) => setMainImageUrl(e.target.value)}
          />
          <textarea
            placeholder="Полное описание"
            value={fullDescription}
            onChange={(e) => setFullDescription(e.target.value)}
          />
          <input
            type="text"
            placeholder="Адрес"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <button type="submit">Добавить товар</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default AddProduct;
