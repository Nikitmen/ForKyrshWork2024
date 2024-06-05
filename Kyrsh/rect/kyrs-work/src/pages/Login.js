import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';
import './Auth.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost/login.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();

    if (data.status === 'success') {
      setMessage('Авторизация успешна!');
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/profile');
    } else {
      setMessage(`Ошибка: ${data.message}`);
    }
  };

  return (
    <div>
      <Header />
      <div className="auth-container">
        <h2>Войти в профиль</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="text"
            placeholder="Логин"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="auth-input"
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="auth-input"
          />
          <button type="submit" className="auth-button">Войти</button>
        </form>
        {message && <p className="auth-message">{message}</p>}
        <p className="auth-switch">
          У вас нет аккаунта? <Link to="/register">Зарегистрируйтесь</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
