import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';

const ConfirmationPage = () => {
  const location = useLocation();
  const { ride } = location.state || {};
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!ride) {
    return (
      <div>
        <Navbar />
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <h2>No booking information found</h2>
          <Link to="/">Go Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <Navbar />
      
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
        <div className={isLoaded ? 'slide-up' : ''} style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '2rem',
          textAlign: 'center',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <div className={isLoaded ? 'fade-scale' : ''} style={{ fontSize: '4rem', marginBottom: '1rem', animationDelay: '0.2s' }}>✅</div>
          
          <h1 className={isLoaded ? 'slide-left' : ''} style={{ color: '#28a745', marginBottom: '1rem' }}>
            Booking Confirmed!
          </h1>
          
          <p className={isLoaded ? 'slide-right' : ''} style={{ fontSize: '18px', color: '#666', marginBottom: '2rem' }}>
            Your ride has been successfully booked
          </p>

          <div className={isLoaded ? 'fade-scale' : ''} style={{
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            padding: '1.5rem',
            marginBottom: '2rem',
            textAlign: 'left',
            animationDelay: '0.4s'
          }}>
            <h3 style={{ marginBottom: '1rem', color: '#333' }}>Ride Details</h3>
            
            <div style={{ marginBottom: '1rem' }}>
              <strong>From:</strong> {ride.pickup.address}
            </div>
            
            <div style={{ marginBottom: '1rem' }}>
              <strong>To:</strong> {ride.destination.address}
            </div>
            
            <div style={{ marginBottom: '1rem' }}>
              <strong>Vehicle Type:</strong> {ride.vehicleType}
            </div>
            
            <div style={{ marginBottom: '1rem' }}>
              <strong>Fare:</strong> ${ride.fare}
            </div>
            
            <div style={{ marginBottom: '1rem' }}>
              <strong>Distance:</strong> {ride.distance} km
            </div>
            
            <div style={{ marginBottom: '1rem' }}>
              <strong>Estimated Duration:</strong> {ride.duration} minutes
            </div>
            
            <div style={{ marginBottom: '1rem' }}>
              <strong>Booking ID:</strong> {ride._id}
            </div>
          </div>

          <div className={isLoaded ? 'fade-scale' : ''} style={{
            backgroundColor: '#e7f3ff',
            border: '1px solid #007bff',
            borderRadius: '8px',
            padding: '1rem',
            marginBottom: '2rem',
            animationDelay: '0.6s'
          }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#007bff' }}>Driver Information</h4>
            <p style={{ margin: '0', fontSize: '14px' }}>
              🚗 <strong>Driver:</strong> John Doe<br/>
              📱 <strong>Phone:</strong> +1 (555) 123-4567<br/>
              🔢 <strong>Vehicle Number:</strong> ABC-1234<br/>
              🕐 <strong>Estimated Arrival:</strong> 5 minutes
            </p>
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link
              to="/rides-history"
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#007bff',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '6px',
                fontWeight: 'bold'
              }}
            >
              View My Rides
            </Link>
            
            <Link
              to="/"
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#28a745',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '6px',
                fontWeight: 'bold'
              }}
            >
              Book Another Ride
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;