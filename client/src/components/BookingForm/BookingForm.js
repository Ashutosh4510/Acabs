import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const BookingForm = () => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }
    // Redirect to booking page with form data
    navigate('/booking', { state: { pickup, destination } });
  };

  return (
    <div style={{
      backgroundColor: 'white',
      padding: '3rem',
      borderRadius: '30px',
      boxShadow: '0 40px 100px rgba(0,0,0,0.1)',
      maxWidth: '700px',
      margin: '0 auto',
      border: '1px solid #e0e0e0',
      position: 'relative'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h3 style={{ 
          fontSize: '2rem', 
          fontWeight: '700', 
          color: '#000',
          marginBottom: '0.5rem',
          letterSpacing: '-0.5px'
        }}>Quick Booking</h3>
        <p style={{ 
          color: '#666', 
          fontSize: '1rem',
          margin: 0
        }}>Where would you like to go?</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '2rem' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '0.5rem', 
            fontWeight: '600', 
            color: '#000',
            fontSize: '0.95rem'
          }}>Pickup Location</label>
          <input
            type="text"
            placeholder="Pickup location"
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '18px 24px',
              border: '2px solid #e0e0e0',
              borderRadius: '15px',
              fontSize: '16px',
              backgroundColor: '#f8f9fa',
              transition: 'all 0.3s',
              outline: 'none'
            }}
            onFocus={(e) => e.target.style.border = '2px solid #000'}
            onBlur={(e) => e.target.style.border = '2px solid #e0e0e0'}
          />
        </div>
        <div style={{ marginBottom: '2.5rem' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '0.5rem', 
            fontWeight: '600', 
            color: '#000',
            fontSize: '0.95rem'
          }}>Destination</label>
          <input
            type="text"
            placeholder="Where to?"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '18px 24px',
              border: '2px solid #e0e0e0',
              borderRadius: '15px',
              fontSize: '16px',
              backgroundColor: '#f8f9fa',
              transition: 'all 0.3s',
              outline: 'none'
            }}
            onFocus={(e) => e.target.style.border = '2px solid #000'}
            onBlur={(e) => e.target.style.border = '2px solid #e0e0e0'}
          />
        </div>
        <button
          type="submit"
          className="shine-effect"
          style={{
            width: '100%',
            padding: '20px',
            backgroundColor: '#000',
            color: 'white',
            border: 'none',
            borderRadius: '15px',
            fontSize: '18px',
            fontWeight: '700',
            cursor: 'pointer',
            transition: 'all 0.3s',
            letterSpacing: '0.5px'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#333'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#000'}
        >
          Find My Ride →
        </button>
      </form>
    </div>
  );
};

export default BookingForm;