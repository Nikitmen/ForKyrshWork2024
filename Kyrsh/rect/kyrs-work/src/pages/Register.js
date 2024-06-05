import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';
import './Auth.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost/register.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        password,
        firstName,
        middleName,
        email,
        gender,
        address,
      }),
    });
    const data = await response.json();

    if (data.status === 'success') {
      setMessage('Регистрация Успешна! Пересылка на страницу входа...');
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    } else {
      setMessage(`Error: ${data.message}`);
    }
  };

  return (
    <div>
      <Header />
      <div className="auth-container">
        <h2>Регистрация</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="text"
            placeholder="Ваш логин"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="auth-input"
            required
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="auth-input"
            required
          />
          <input
            type="text"
            placeholder="Имя"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="auth-input"
            required
          />
          <input
            type="text"
            placeholder="Отчество (По наличию)"
            value={middleName}
            onChange={(e) => setMiddleName(e.target.value)}
            className="auth-input"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="auth-input"
            required
          />
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="auth-input"
            required
          >
            <option value="">Пол</option>
            <option value="male">М</option>
            <option value="female">Ж</option>
          </select>
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="auth-input"
            required
          />
          <button type="submit" className="auth-button">Регистрация</button>
        </form>
        {message && <p className="auth-message">{message}</p>}
        <p className="auth-switch">
          У вас есть аккаунт? <Link to="/login">Войдите в него!</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
