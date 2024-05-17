import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Здесь можно добавить другие маршруты для личного кабинета, корзины и оформления заказа */}
      </Routes>
    </Router>
  );
}

export default App;
