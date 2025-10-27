import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import '../styles/responsive.css';
import '../styles/animations.css';


const SignupPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', formData);
      setSuccess(response.data.message);
      // Auto-login after successful registration
      const loginResponse = await axios.post('http://localhost:5000/api/auth/login', {
        email: formData.email,
        password: formData.password
      });
      login(loginResponse.data.user, loginResponse.data.token);
      navigate('/');
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed');
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
              }}>🚀</div>
              <h3 style={{
                fontSize: '2.5rem',
                fontWeight: '700',
                marginBottom: '1rem',
                background: 'linear-gradient(135deg, #fff 0%, #e0e0e0 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>Join Acabs Today</h3>
              <p style={{
                fontSize: '1.3rem',
                opacity: 0.9,
                fontWeight: '400',
                maxWidth: '300px',
                lineHeight: '1.5'
              }}>Begin your premium ride experience</p>
            </div>
          </div>
          
          {/* Welcome Text Overlay */}
          <div style={{
            position: 'absolute',
            bottom: '8%',
            left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
            color: 'white'
          }}>
            <h2 style={{
              fontSize: '2.4rem',
              fontWeight: '600',
              margin: '0 0 0.5rem 0',
              letterSpacing: '-0.5px'
            }}>Join Our Community</h2>
            <p style={{
              fontSize: '1.2rem',
              margin: 0,
              opacity: 0.9,
              fontWeight: '400'
            }}>Start your journey today</p>
          </div>
        </div>
        
        {/* Right Side - Form */}
        <div className="auth-right">
          <div className="auth-form">
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">Join ACABS for seamless rides</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="form-input"
            />
          </div>
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
          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input
              type="tel"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
              className="form-input"
            />
          </div>
          <div className="form-group" style={{ marginBottom: '2rem' }}>
            <label className="form-label">Password</label>
            <input
              type="password"
              placeholder="Create a strong password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              className="form-input"
            />
          </div>
          <button type="submit" className="auth-button">
            Create Account
          </button>
        </form>
        {error && <div className="message error">{error}</div>}
        {success && <div className="message success">{success}</div>}
        <div className="auth-link">
          <p>
            Already have an account? {' '}
            <a href="/login">Sign in here</a>
          </p>
        </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;