import React from 'react';
import '../styles/Pricing.css';

const PricingCard = ({ plan, index, onSelect }) => {
  return (
    <div className="pricing-card" style={{ animationDelay: `${index * 0.2}s` }}>
      <h2>{plan.name}</h2>
      <p className="price">{plan.price}</p>
      <ul>
        {plan.features.map(feature => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
      <button className="pricing-btn" onClick={onSelect}>Choose Plan</button>
    </div>
  );
};

export default PricingCard;