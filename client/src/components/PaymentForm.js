import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import '../styles/Pricing.css';

const PaymentForm = ({ plan, onClose }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      const { data } = await axios.post('http://localhost:5000/api/payment/create-payment-intent', {
        amount: plan.amount
      });

      const { clientSecret } = data;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: { name: 'User Name' }
        }
      });

      if (result.error) {
        setError(result.error.message);
        setProcessing(false);
      } else if (result.paymentIntent.status === 'succeeded') {
        setSuccess(true);
        setProcessing(false);
        setError(null);
        setTimeout(() => {
          onClose();
          navigate('/');
        }, 2000);
      }
    } catch (error) {
      setError('Payment failed. Please try again.');
      setProcessing(false);
    }
  };

  return (
    <div className="payment-modal">
      <div className="payment-modal-content">
        <h2>Pay for {plan.name} - {plan.price}</h2>
        <form onSubmit={handleSubmit} className="payment-form">
          <CardElement className="card-element" options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#2c3e50',
                '::placeholder': { color: '#7f8c8d' }
              },
              invalid: { color: '#c0392b' }
            }
          }} />
          <button type="submit" className="pricing-btn" disabled={!stripe || processing}>
            {processing ? 'Processing...' : success ? 'Subscribed!' : 'Confirm Payment'}
          </button>
          {error && <p className="payment-error">{error}</p>}
          {success && <p className="payment-success">Payment successful! Redirecting...</p>}
        </form>
        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default PaymentForm;