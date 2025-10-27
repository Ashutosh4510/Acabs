import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import '../styles/responsive.css';
import '../styles/animations.css';


const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
      const response = await axios.post(`${apiUrl}/auth/login`, formData);
      login(response.data.user, response.data.token);
      navigate('/');
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <Navbar />
      <div className="auth-container">
        {/* Left Side - Illustration */}
        <div className="auth-left">
          <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem'
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '8rem',
                marginBottom: '2rem',
                opacity: 0.8,
                background: 'linear-gradient(135deg, #fff 0%, #ccc 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.3))'
              }}>🚗</div>
              <h3 style={{
                fontSize: '2.5rem',
                fontWeight: '700',
                marginBottom: '1rem',
                background: 'linear-gradient(135deg, #fff 0%, #e0e0e0 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>Welcome to Acabs</h3>
              <p style={{
                fontSize: '1.3rem',
                opacity: 0.9,
                fontWeight: '400',
                maxWidth: '300px',
                lineHeight: '1.5'
              }}>Your premium ride experience starts here</p>
            </div>
          </div>
          
          {/* Welcome Text Overlay */}
          <div style={{
            position: 'absolute',
            bottom: '10%',
            left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
            color: 'white'
          }}>
            <h2 style={{
              fontSize: '2.2rem',
              fontWeight: '600',
              margin: '0 0 0.5rem 0',
              letterSpacing: '-0.5px'
            }}>Welcome Back</h2>
            <p style={{
              fontSize: '1.1rem',
              margin: 0,
              opacity: 0.7,
              fontWeight: '400'
            }}>Continue your journey with us</p>
          </div>
        </div>
        
        {/* Right Side - Form */}
        <div className="auth-right">
          <div className="auth-form">
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Sign in to your account</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="form-input"
            />
          </div>
          <div className="form-group" style={{ marginBottom: '2rem' }}>
            <label className="form-label">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              className="form-input"
            />
          </div>
          <button 
            type="submit" 
            disabled={isLoading}
            className="auth-button"
          >
            {isLoading && <div className="spinner"></div>}
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        {error && <div className="message error">{error}</div>}
        <div className="auth-link">
          <p>
            Don't have an account? {' '}
            <a href="/signup">Sign up here</a>
          </p>
        </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default LoginPage;