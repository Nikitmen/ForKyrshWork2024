import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';
import './Profile.css';

const Profile = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    if (!user) {
        navigate('/login');
        return null;
    }

    return (
        <div>
            <Header />
            <div className="pr">
                <div className="profile-container">
                    <h2>Ваш профиль</h2>
                    <p><strong>Здравствуйте, {user.first_name} {user.middle_name}!</strong></p>
                    <p><strong>Ваш логин:</strong> {user.username}</p>
                    <p><strong>Ваш email:</strong> {user.email}</p>
                    <p><strong>Ваш адрес:</strong> {user.address}</p>
                    <button onClick={handleLogout} className="logout-button">Выйти</button>
                    <Link to="/add-product" className="add-product-link">Добавить товар</Link>
                </div>
            </div>
        </div>
    );
};

export default Profile;
