import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';


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
      <div style={{ 
        display: 'flex',
        minHeight: 'calc(100vh - 80px)'
      }}>
        {/* Left Side - Illustration */}
        <div className={isLoaded ? 'slide-left' : ''} style={{
          flex: '1',
          background: 'linear-gradient(135deg, #000 0%, #1a1a1a 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          minHeight: '500px'
        }}>
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
        <div style={{
          flex: '1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          backgroundColor: 'white'
        }}>
          <div className={isLoaded ? 'slide-right' : ''} style={{ 
            maxWidth: '400px', 
            width: '100%'
          }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 className={isLoaded ? 'slide-left' : ''} style={{ 
            fontSize: '2.5rem', 
            fontWeight: '700', 
            color: '#000',
            marginBottom: '0.5rem',
            letterSpacing: '-1px'
          }}>Welcome Back</h1>
          <p className={isLoaded ? 'slide-right' : ''} style={{ 
            color: '#666', 
            fontSize: '1.1rem',
            margin: 0
          }}>Sign in to your account</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              fontWeight: '600', 
              color: '#000',
              fontSize: '0.95rem'
            }}>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              style={{
                width: '100%',
                padding: '16px 20px',
                border: '2px solid #e0e0e0',
                borderRadius: '12px',
                fontSize: '16px',
                backgroundColor: '#fafafa',
                transition: 'all 0.3s',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.border = '2px solid #000'}
              onBlur={(e) => e.target.style.border = '2px solid #e0e0e0'}
            />
          </div>
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              fontWeight: '600', 
              color: '#000',
              fontSize: '0.95rem'
            }}>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              style={{
                width: '100%',
                padding: '16px 20px',
                border: '2px solid #e0e0e0',
                borderRadius: '12px',
                fontSize: '16px',
                backgroundColor: '#fafafa',
                transition: 'all 0.3s',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.border = '2px solid #000'}
              onBlur={(e) => e.target.style.border = '2px solid #e0e0e0'}
            />
          </div>
          <button 
            type="submit" 
            disabled={isLoading}
            style={{ 
              width: '100%', 
              padding: '18px', 
              backgroundColor: isLoading ? '#666' : '#000', 
              color: 'white', 
              border: 'none',
              borderRadius: '12px',
              fontSize: '18px',
              fontWeight: '600',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s',
              letterSpacing: '0.5px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}
            onMouseOver={(e) => {
              if (!isLoading) e.target.style.backgroundColor = '#333';
            }}
            onMouseOut={(e) => {
              if (!isLoading) e.target.style.backgroundColor = '#000';
            }}
          >
            {isLoading && (
              <div style={{
                width: '20px',
                height: '20px',
                border: '2px solid transparent',
                borderTop: '2px solid white',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }}></div>
            )}
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        {error && <div style={{ 
          marginTop: '1rem',
          padding: '1rem',
          backgroundColor: '#fee',
          border: '1px solid #fcc',
          borderRadius: '8px',
          color: '#c33',
          fontSize: '0.9rem'
        }}>{error}</div>}
        <div style={{ 
          textAlign: 'center', 
          marginTop: '2rem',
          paddingTop: '2rem',
          borderTop: '1px solid #f0f0f0'
        }}>
          <p style={{ color: '#666', margin: 0 }}>
            Don't have an account? {' '}
            <a href="/signup" style={{ 
              color: '#000', 
              textDecoration: 'none',
              fontWeight: '600'
            }}>Sign up here</a>
          </p>
        </div>
          </div>
        </div>
      </div>
      
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default LoginPage;