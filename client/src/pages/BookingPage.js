import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar/Navbar';
import MapComponent from '../components/MapComponent/MapComponent';
import Chatbot from '../components/Chatbot/Chatbot';
import { useAuth } from '../context/AuthContext';
import { useRides } from '../context/RidesContext';
import './BookingPage.css';
import '../styles/animations.css';

const BookingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const initialPickup = location.state?.pickup || '';
  const initialDestination = location.state?.destination || '';
  
  const [pickup, setPickup] = useState(initialPickup);
  const [destination, setDestination] = useState(initialDestination);
  const [selectedVehicle, setSelectedVehicle] = useState('economy');
  const [loading, setLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showVehicleSelection, setShowVehicleSelection] = useState(false);
  const { token } = useAuth();
  const { addRide } = useRides();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const vehicleOptions = [
    { type: 'economy', name: 'Mini', price: 12, time: '2 min', desc: 'Affordable rides for everyday trips', capacity: '4 seats' },
    { type: 'premium', name: 'Sedan', price: 18, time: '3 min', desc: 'Comfortable rides with extra space', capacity: '4 seats' },
    { type: 'luxury', name: 'Luxury', price: 25, time: '5 min', desc: 'Premium experience with top vehicles', capacity: '4 seats' }
  ];

  const renderCarIcon = (type, isSelected) => {
    const iconColor = isSelected ? 'white' : '#000';
    const bgColor = isSelected ? '#000' : '#f5f5f5';
    
    return (
      <div style={{
        width: '70px',
        height: '45px',
        backgroundColor: bgColor,
        borderRadius: '12px',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.3s'
      }}>
        <div style={{
          width: '50px',
          height: '28px',
          backgroundColor: iconColor,
          borderRadius: '8px',
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute',
            top: '4px',
            left: '8px',
            right: '8px',
            height: '10px',
            backgroundColor: bgColor,
            borderRadius: '3px'
          }}></div>
          
          <div style={{
            position: 'absolute',
            bottom: '-6px',
            left: '8px',
            width: '10px',
            height: '10px',
            backgroundColor: iconColor,
            borderRadius: '50%',
            border: `3px solid ${bgColor}`
          }}></div>
          <div style={{
            position: 'absolute',
            bottom: '-6px',
            right: '8px',
            width: '10px',
            height: '10px',
            backgroundColor: iconColor,
            borderRadius: '50%',
            border: `3px solid ${bgColor}`
          }}></div>
        </div>
      </div>
    );
  };

  const handleConfirmBooking = async () => {
    setLoading(true);
    try {
      const bookingData = {
        pickup: {
          address: pickup,
          lat: Math.random() * 90,
          lng: Math.random() * 180
        },
        destination: {
          address: destination,
          lat: Math.random() * 90,
          lng: Math.random() * 180
        },
        vehicleType: selectedVehicle
      };

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/rides/book`,
        bookingData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Add ride to local context
      addRide({
        pickup: pickup,
        destination: destination,
        vehicleType: selectedVehicle,
        fare: vehicleOptions.find(v => v.type === selectedVehicle)?.price || 0,
        duration: vehicleOptions.find(v => v.type === selectedVehicle)?.time || '5 min'
      });

      navigate('/confirmation', { state: { ride: response.data.ride } });
    } catch (error) {
      alert('Booking failed: ' + (error.response?.data?.message || 'Unknown error'));
    }
    setLoading(false);
  };

  const handleContinueToVehicleSelection = () => {
    if (pickup && destination) {
      setShowVehicleSelection(true);
    }
  };

  return (
    <div className="booking-page">
      <div className="booking-background"></div>
      
      <Navbar />
      
      <div className="booking-container">
        {!showVehicleSelection ? (
          <div className="booking-grid">
            {/* Left Side - Booking Guide */}
            <div className="booking-guide">
              <div className="guide-badge">
                Booking Guide
              </div>
              
              <h1 className="guide-title">
                How to Book
                <br />
                <span className="guide-title-accent">Your Ride</span>
              </h1>
              
              <p className="guide-description">
                Follow these simple steps to book your ride quickly and easily.
              </p>

              {/* Booking Steps */}
              <div className="booking-steps">
                {[
                  { step: '01', title: 'Enter Locations', desc: 'Add your pickup and destination addresses' },
                  { step: '02', title: 'Choose Vehicle', desc: 'Select from our range of available vehicles' },
                  { step: '03', title: 'Confirm Booking', desc: 'Review details and confirm your ride' },
                  { step: '04', title: 'Track Driver', desc: 'Monitor your driver\'s arrival in real-time' }
                ].map((item, index) => (
                  <div key={index} className="step-item">
                    <div className="step-number">
                      {item.step}
                    </div>
                    <div className="step-content">
                      <h4>{item.title}</h4>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Booking Tips */}
              <div className="booking-tips">
                <h3 className="tips-title">Booking Tips</h3>
                <div className="tips-list">
                  {[
                    'Be specific with your pickup location',
                    'Check estimated arrival time before booking',
                    'Have your phone ready for driver contact',
                    'Payment is processed after the ride'
                  ].map((tip, index) => (
                    <div key={index} className="tip-item">
                      <div className="tip-bullet"></div>
                      <span className="tip-text">{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side - Booking Form */}
            <div>
              <div className="booking-form-container">
                <div className="form-header">
                  <h2 className="form-title">Where to?</h2>
                  <p className="form-subtitle">Let's get you moving</p>
                </div>

                <form onSubmit={(e) => { e.preventDefault(); handleContinueToVehicleSelection(); }}>
                  {/* Pickup Location */}
                  <div className="location-input-group">
                    <div className="location-dot pickup"></div>
                    <input
                      type="text"
                      placeholder="Pickup location"
                      value={pickup}
                      onChange={(e) => setPickup(e.target.value)}
                      required
                      className="location-input"
                    />
                  </div>

                  {/* Connection Line */}
                  <div className="connection-line"></div>

                  {/* Destination */}
                  <div className="location-input-group" style={{ marginBottom: '2rem' }}>
                    <div className="location-dot destination"></div>
                    <input
                      type="text"
                      placeholder="Destination"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      required
                      className="location-input"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={!pickup || !destination}
                    className={pickup && destination ? 'shine-effect' : ''}
                    style={{
                      width: '100%',
                      padding: '18px',
                      backgroundColor: pickup && destination ? '#000' : '#ccc',
                      color: 'white',
                      border: 'none',
                      borderRadius: '15px',
                      fontSize: '16px',
                      fontWeight: '700',
                      cursor: pickup && destination ? 'pointer' : 'not-allowed',
                      transition: 'all 0.3s',
                      letterSpacing: '0.5px',
                      textTransform: 'uppercase'
                    }}
                    onMouseEnter={(e) => {
                      if (pickup && destination) {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 10px 25px rgba(0,0,0,0.3)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (pickup && destination) {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = 'none';
                      }
                    }}
                  >
                    Find My Ride →
                  </button>
                </form>

                {/* Trust Indicators */}
                <div className="trust-indicators">
                  <div className="trust-item">
                    <div className="trust-value">4.9</div>
                    <div className="trust-label">Rating</div>
                  </div>
                  <div className="trust-item">
                    <div className="trust-value">50K+</div>
                    <div className="trust-label">Rides</div>
                  </div>
                  <div className="trust-item">
                    <div className="trust-value">2min</div>
                    <div className="trust-label">ETA</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            {/* Vehicle Selection Header */}
            <div className="vehicle-selection-header">
              <div className="selection-badge">
                Step 2 of 2
              </div>
              
              <h1 className="selection-title">Choose Your Ride</h1>
              
              <p className="selection-subtitle">Select the perfect vehicle for your journey</p>
              
              {/* Route Display */}
              <div className="route-display">
                <div className="route-point">
                  <div className="route-dot pickup"></div>
                  <span className="route-text">{pickup}</span>
                </div>
                <span className="route-arrow">→</span>
                <div className="route-point">
                  <div className="route-dot destination"></div>
                  <span className="route-text">{destination}</span>
                </div>
              </div>
            </div>
            
            {/* Map */}
            <div style={{ marginBottom: '3rem' }}>
              <MapComponent pickup={pickup} destination={destination} />
            </div>
            
            {/* Vehicle Options */}
            <div className="vehicle-options">
              <h3 className="vehicle-title">Available Vehicles</h3>
              
              {vehicleOptions.map((vehicle, index) => (
                <div
                  key={vehicle.type}
                  onClick={() => setSelectedVehicle(vehicle.type)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1.8rem',
                    border: selectedVehicle === vehicle.type ? '3px solid #000' : '2px solid #e8ecf4',
                    borderRadius: '20px',
                    marginBottom: '1.2rem',
                    cursor: 'pointer',
                    backgroundColor: selectedVehicle === vehicle.type ? 'rgba(0,0,0,0.05)' : 'white',
                    transition: 'all 0.3s',
                    boxShadow: selectedVehicle === vehicle.type ? 
                      '0 15px 35px rgba(0,0,0,0.15)' : '0 5px 15px rgba(0,0,0,0.08)',
                    transform: selectedVehicle === vehicle.type ? 'translateY(-3px)' : 'translateY(0)'
                  }}
                  onMouseEnter={(e) => {
                    if (selectedVehicle !== vehicle.type) {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedVehicle !== vehicle.type) {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.08)';
                    }
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <div style={{
                      padding: '1.2rem',
                      backgroundColor: selectedVehicle === vehicle.type ? '#000' : '#f8f9ff',
                      borderRadius: '18px',
                      transition: 'all 0.3s'
                    }}>
                      {renderCarIcon(vehicle.type, selectedVehicle === vehicle.type)}
                    </div>
                    <div>
                      <h4 style={{ 
                        margin: '0 0 0.5rem 0',
                        fontSize: '1.4rem',
                        fontWeight: '700',
                        color: '#333'
                      }}>{vehicle.name}</h4>
                      <p style={{ 
                        margin: '0 0 0.3rem 0', 
                        color: '#666', 
                        fontSize: '1rem',
                        fontWeight: '500'
                      }}>
                        {vehicle.time} away • {vehicle.capacity}
                      </p>
                      <p style={{ 
                        margin: 0, 
                        color: '#888', 
                        fontSize: '0.9rem'
                      }}>
                        {vehicle.desc}
                      </p>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ 
                      margin: 0, 
                      fontWeight: '800', 
                      fontSize: '2rem',
                      color: '#333'
                    }}>
                      ${vehicle.price}
                    </p>
                    <p style={{ 
                      margin: '0.3rem 0 0 0', 
                      fontSize: '0.85rem',
                      color: '#666',
                      fontWeight: '500'
                    }}>
                      estimated fare
                    </p>
                    {selectedVehicle === vehicle.type && (
                      <div style={{
                        marginTop: '0.5rem',
                        padding: '0.3rem 0.8rem',
                        backgroundColor: '#000',
                        color: 'white',
                        borderRadius: '15px',
                        fontSize: '0.8rem',
                        fontWeight: '600'
                      }}>Selected</div>
                    )}
                  </div>
                </div>
              ))}
              
              <button
                onClick={handleConfirmBooking}
                disabled={loading}
                className={!loading ? 'shine-effect' : ''}
                style={{
                  width: '100%',
                  padding: '1.8rem',
                  backgroundColor: loading ? '#ccc' : '#000',
                  color: 'white',
                  border: 'none',
                  borderRadius: '20px',
                  fontSize: '1.2rem',
                  fontWeight: '700',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  marginTop: '2rem',
                  transition: 'all 0.3s',
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase'
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 15px 35px rgba(0,0,0,0.3)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!loading) {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }
                }}
              >
                {loading ? 'Booking Your Ride...' : `Confirm Booking • $${vehicleOptions.find(v => v.type === selectedVehicle)?.price}`}
              </button>
            </div>
          </div>
        )}
      </div>
      <Chatbot />
    </div>
  );
};

export default BookingPage;