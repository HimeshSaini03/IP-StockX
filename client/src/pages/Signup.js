import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Added
import axios from 'axios';
import Navbar from '../components/Navbar';
import '../styles/Signup.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Added

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', { email, password });
      localStorage.setItem('token', res.data.token); // Token save karo
      setMessage('Signup successful! Redirecting...');
      navigate('/pricing'); // Direct Pricing pe redirect
    } catch (error) {
      setMessage(error.response?.data.message || 'Error signing up');
    }
  };

  return (
    <div className="signup-page">
      <Navbar />
      <div className="signup-container">
        <h1 className="signup-title">Sign Up</h1>
        <form className="signup-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="signup-input"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="signup-input"
            required
          />
          <button type="submit" className="signup-btn">Sign Up</button>
        </form>
        <p className="signup-message">{message}</p>
        <p className="signup-switch">Already have an account? <a href="/login">Login</a></p>
      </div>
    </div>
  );
};

export default Signup;