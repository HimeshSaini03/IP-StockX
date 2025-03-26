import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import '../styles/Market.css';

const Market = () => {
  const [marketData, setMarketData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/market')
      .then(res => setMarketData(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="market-page">
      <Navbar />
      <div className="market-container">
        <h1 className="market-title">Market Data (NSE - Demo)</h1>
        <div className="market-table-wrapper">
          <table className="market-table">
            <thead>
              <tr>
                <th>Stock</th>
                <th>Price</th>
                <th>Change</th>
              </tr>
            </thead>
            <tbody>
              {marketData.map((stock, index) => (
                <tr key={stock.name} className="market-row" style={{ animationDelay: `${index * 0.1}s` }}>
                  <td>{stock.name}</td>
                  <td>{stock.price}</td>
                  <td className={stock.change.startsWith('+') ? 'positive' : 'negative'}>
                    {stock.change}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Market;