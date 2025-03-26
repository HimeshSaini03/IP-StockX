const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  // Demo data for NSE stocks
  const marketData = [
    { name: 'Reliance', price: '₹2450.50', change: '+2.3%' },
    { name: 'TCS', price: '₹3900.75', change: '-0.8%' },
    { name: 'HDFC Bank', price: '₹1650.20', change: '+1.5%' },
    { name: 'Infosys', price: '₹1750.30', change: '+0.9%' },
    { name: 'SBI', price: '₹750.10', change: '-1.2%' }
  ];
  
  res.json(marketData);
});

module.exports = router;