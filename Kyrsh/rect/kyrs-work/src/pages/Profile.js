import React from 'react';
import { useNavigate } from 'react-router-dom';
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
                    <p><strong>Здраствуйте,</strong> {user.username}</p>
                    <button onClick={handleLogout} className="logout-button">Выйти</button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
