const express = require('express');
const router = express.Router();

require('dotenv').config();
console.log('Chal raha hai stripe bhi'); 
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
//post methosd 
router.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'inr',
      payment_method_types: ['card'],
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ message: 'Error creating payment intent', error });
    console.log('Error:')
  }
});

module.exports = router;