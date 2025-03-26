const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const marketRoutes = require('./routes/market');
const authRoutes = require('./routes/auth');
const paymentRoutes = require('./routes/payment');
require('dotenv').config(); // Yeh line top pe honi chahiye

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, )
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/api/market', marketRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/payment', paymentRoutes);

app.listen(5000, () => console.log('Server chal raha hai on port 5000'));