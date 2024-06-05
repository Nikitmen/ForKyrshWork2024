import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost/index.php?action=getCategories')
      .then(response => response.json())
      .then(data => setCategories(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost/index.php?action=addProduct', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        description,
        price,
        category_id: category,
        main_image_url: mainImageUrl,
        full_description: fullDescription,
        address
      }),
    });
    const data = await response.json();

    if (data.status === 'success') {
      setMessage('Product added successfully!');
      navigate('/'); // Redirect to home page or products list page
    } else {
      setMessage(`Error: ${data.message}`);
    }
  };

  return (
    <div className="auth-container">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="auth-input"
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="auth-input"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="auth-input"
          required
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="auth-input"
          required
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Main Image URL"
          value={mainImageUrl}
          onChange={(e) => setMainImageUrl(e.target.value)}
          className="auth-input"
        />
        <textarea
          placeholder="Full Description"
          value={fullDescription}
          onChange={(e) => setFullDescription(e.target.value)}
          className="auth-input"
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="auth-input"
        />
        <button type="submit" className="auth-button">Add Product</button>
      </form>
      {message && <p className="auth-message">{message}</p>}
    </div>
  );
};

export default AddProduct;
