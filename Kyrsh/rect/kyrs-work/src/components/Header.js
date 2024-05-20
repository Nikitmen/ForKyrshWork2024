import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = ({ onSearch, cartItemCount }) => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <Link to="/" className="logo-link">
            <h1>Подержанная Мебель</h1>
          </Link>
        </div>
        <div className="header-links">
          <Link to="/profile" className="profile-link">
            <img src="https://marketing.junior-it.ru/img/lessons/0a1d85b4078c7277215d814dde686b78.jpg" alt="Профиль" className="profile-pic" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
