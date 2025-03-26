import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Added
import '../styles/Navbar.css';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const navigate = useNavigate(); // Added

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login'); // Redirect to Login page
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <img src="/logo.png" alt="Logo" className="logo-img" />
        <h1>StockPredix</h1>
      </div>
      <ul className="nav-links">
        <li><a href="/" className="nav-link">Home</a></li>
        <li><a href="/market" className="nav-link">Market</a></li>
        <li><a href="/pricing" className="nav-link">Pricing</a></li>
        {isLoggedIn ? (
          <li>
            <button onClick={handleLogout} className="nav-link logout-btn">Logout</button>
          </li>
        ) : (
          <li><a href="/login" className="nav-link login-btn">Login/Signup</a></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;