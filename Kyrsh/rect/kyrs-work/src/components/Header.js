import React from 'react';
import { Link, useNavigate } from 'react-router-dom'
import './Header.css';

const Header = ({ onHomeClick  }) => {

  const navigate = useNavigate();

  const handleLogoClick = () => {
    if (onHomeClick) onHomeClick();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <div className="logo-link">
            <h1 onClick={handleLogoClick}>Подержанная Мебель</h1>
          </div>
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

