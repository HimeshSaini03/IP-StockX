import React from 'react';
import Navbar from '../components/Navbar';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <Navbar />
      <div className="home-container">
        <h1 className="home-title">Welcome to StockPredix</h1>
        <p className="home-subtitle">Unlock the Power of Stock Market Insights</p>
        <button className="home-btn">Get Started</button>
      </div>
    </div>
  );
};

export default Home;