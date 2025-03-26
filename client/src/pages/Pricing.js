import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Navbar from '../components/Navbar';
import PricingCard from '../components/PricingCard';
import PaymentForm from '../components/PaymentForm';
import '../styles/Pricing.css';

const stripePromise = loadStripe('pk_test_51Pt6Ok03QU1XLEB5A21VRdKhUOVXh77avUezhqnxC2No9Xi3n0WNyQkB3i7tpoNQQoTzubqIb4bAi8rglogbI0yL00Mfx4aYIg');

const Pricing = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    { name: 'Basic', price: '₹499/month', amount: 49900, features: ['1 Stock Prediction/Day', 'Basic Market Data'] },
    { name: 'Intermediate', price: '₹999/month', amount: 99900, features: ['5 Predictions/Day', 'Real-time Updates'] },
    { name: 'Advanced', price: '₹1999/month', amount: 199900, features: ['Unlimited Predictions', 'Premium Support'] }
  ];

  return (
    <div className="pricing-page">
      <Navbar />
      <div className="pricing-container">
        <h1 className="pricing-title">Choose Your Plan</h1>
        <div className="pricing-cards">
          {plans.map((plan, index) => (
            <PricingCard
              key={plan.name}
              plan={plan}
              index={index}
              onSelect={() => setSelectedPlan(plan)}
            />
          ))}
        </div>
        {selectedPlan && (
          <Elements stripe={stripePromise}>
            <PaymentForm plan={selectedPlan} onClose={() => setSelectedPlan(null)} />
          </Elements>
        )}
      </div>
    </div>
  );
};

export default Pricing;