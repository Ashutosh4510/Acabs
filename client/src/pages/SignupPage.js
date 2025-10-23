import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';


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
        <div style={{
          flex: '1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          backgroundColor: 'white'
        }}>
          <div className={isLoaded ? 'slide-right' : ''} style={{ 
            maxWidth: '450px', 
            width: '100%'
          }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 className={isLoaded ? 'slide-left' : ''} style={{ 
            fontSize: '2.5rem', 
            fontWeight: '700', 
            color: '#000',
            marginBottom: '0.5rem',
            letterSpacing: '-1px'
          }}>Create Account</h1>
          <p className={isLoaded ? 'slide-right' : ''} style={{ 
            color: '#666', 
            fontSize: '1.1rem',
            margin: 0
          }}>Join CabAI for seamless rides</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              fontWeight: '600', 
              color: '#000',
              fontSize: '0.95rem'
            }}>Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              fontWeight: '600', 
              color: '#000',
              fontSize: '0.95rem'
            }}>Phone Number</label>
            <input
              type="tel"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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
              placeholder="Create a strong password"
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
            style={{ 
              width: '100%', 
              padding: '18px', 
              backgroundColor: '#000', 
              color: 'white', 
              border: 'none',
              borderRadius: '12px',
              fontSize: '18px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s',
              letterSpacing: '0.5px'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#333'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#000'}
          >
            Create Account
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
        {success && <div style={{
          marginTop: '1rem',
          padding: '1rem',
          backgroundColor: '#efe',
          border: '1px solid #cfc',
          borderRadius: '8px',
          color: '#363',
          fontSize: '0.9rem'
        }}>{success}</div>}
        <div style={{
          textAlign: 'center',
          marginTop: '2rem',
          paddingTop: '2rem',
          borderTop: '1px solid #f0f0f0'
        }}>
          <p style={{ color: '#666', margin: 0 }}>
            Already have an account? {' '}
            <a href="/login" style={{
              color: '#000',
              textDecoration: 'none',
              fontWeight: '600'
            }}>Sign in here</a>
          </p>
        </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;