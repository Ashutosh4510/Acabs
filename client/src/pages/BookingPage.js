import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar/Navbar';
import MapComponent from '../components/MapComponent/MapComponent';
import Chatbot from '../components/Chatbot/Chatbot';
import { useAuth } from '../context/AuthContext';
import { useRides } from '../context/RidesContext';

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
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #000 0%, #1a1a1a 100%)',
      position: 'relative'
    }}>
      {/* Animated Background Elements */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 50%),
          radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 0%, transparent 50%)
        `,
        animation: 'float 6s ease-in-out infinite'
      }}></div>
      
      <Navbar />
      
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem', position: 'relative', zIndex: 1 }}>
        {!showVehicleSelection ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '3rem',
            alignItems: 'center',
            minHeight: '80vh'
          }}>
            {/* Left Side - Booking Guide */}
            <div className={isLoaded ? 'slide-left' : ''} style={{ color: 'white' }}>
              <div style={{
                display: 'inline-block',
                padding: '0.5rem 1.2rem',
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderRadius: '25px',
                fontSize: '0.9rem',
                fontWeight: '600',
                marginBottom: '2rem',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.2)'
              }}>
                Booking Guide
              </div>
              
              <h1 style={{ 
                fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', 
                fontWeight: '800', 
                marginBottom: '1.5rem',
                letterSpacing: '-1px',
                lineHeight: '1.2'
              }}>
                How to Book
                <br />
                <span style={{
                  background: 'linear-gradient(45deg, #fff, #f0f0f0)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>Your Ride</span>
              </h1>
              
              <p style={{ 
                fontSize: '1.2rem',
                lineHeight: '1.6',
                opacity: 0.9,
                marginBottom: '3rem',
                maxWidth: '400px'
              }}>
                Follow these simple steps to book your ride quickly and easily.
              </p>

              {/* Booking Steps */}
              <div style={{ marginBottom: '3rem' }}>
                {[
                  { step: '01', title: 'Enter Locations', desc: 'Add your pickup and destination addresses' },
                  { step: '02', title: 'Choose Vehicle', desc: 'Select from our range of available vehicles' },
                  { step: '03', title: 'Confirm Booking', desc: 'Review details and confirm your ride' },
                  { step: '04', title: 'Track Driver', desc: 'Monitor your driver\'s arrival in real-time' }
                ].map((item, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '1.5rem',
                    marginBottom: '2rem',
                    padding: '1rem',
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    borderRadius: '15px',
                    border: '1px solid rgba(255,255,255,0.1)'
                  }}>
                    <div style={{
                      minWidth: '40px',
                      height: '40px',
                      backgroundColor: 'rgba(255,255,255,0.2)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.9rem',
                      fontWeight: '700'
                    }}>
                      {item.step}
                    </div>
                    <div>
                      <h4 style={{
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        marginBottom: '0.3rem',
                        margin: 0
                      }}>{item.title}</h4>
                      <p style={{
                        fontSize: '0.9rem',
                        opacity: 0.8,
                        margin: 0,
                        lineHeight: '1.4'
                      }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Booking Tips */}
              <div style={{
                padding: '1.5rem',
                backgroundColor: 'rgba(255,255,255,0.08)',
                borderRadius: '20px',
                border: '1px solid rgba(255,255,255,0.15)'
              }}>
                <h3 style={{
                  fontSize: '1.2rem',
                  fontWeight: '700',
                  marginBottom: '1rem',
                  margin: '0 0 1rem 0'
                }}>Booking Tips</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  {[
                    'Be specific with your pickup location',
                    'Check estimated arrival time before booking',
                    'Have your phone ready for driver contact',
                    'Payment is processed after the ride'
                  ].map((tip, index) => (
                    <div key={index} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.8rem'
                    }}>
                      <div style={{ 
                        minWidth: '6px',
                        height: '6px', 
                        backgroundColor: 'white', 
                        borderRadius: '50%',
                        marginTop: '0.5rem'
                      }}></div>
                      <span style={{ fontSize: '0.9rem', fontWeight: '400', opacity: 0.9, lineHeight: '1.4' }}>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side - Booking Form */}
            <div className={isLoaded ? 'slide-right' : ''}>
              <div style={{
                backgroundColor: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(20px)',
                padding: '2.5rem',
                borderRadius: '25px',
                boxShadow: '0 25px 50px rgba(0,0,0,0.2)',
                border: '1px solid rgba(255,255,255,0.3)'
              }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                  <h2 style={{
                    fontSize: '1.8rem',
                    fontWeight: '700',
                    color: '#333',
                    marginBottom: '0.5rem'
                  }}>Where to?</h2>
                  <p style={{
                    color: '#666',
                    fontSize: '1rem'
                  }}>Let's get you moving</p>
                </div>

                <form onSubmit={(e) => { e.preventDefault(); handleContinueToVehicleSelection(); }}>
                  {/* Pickup Location */}
                  <div style={{ marginBottom: '1.5rem', position: 'relative' }}>
                    <div style={{
                      position: 'absolute',
                      left: '18px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '12px',
                      height: '12px',
                      backgroundColor: '#28a745',
                      borderRadius: '50%',
                      zIndex: 2,
                      boxShadow: '0 0 0 3px rgba(40, 167, 69, 0.2)'
                    }}></div>
                    <input
                      type="text"
                      placeholder="Pickup location"
                      value={pickup}
                      onChange={(e) => setPickup(e.target.value)}
                      required
                      style={{
                        width: '100%',
                        padding: '18px 18px 18px 45px',
                        border: '2px solid #e8ecf4',
                        borderRadius: '15px',
                        fontSize: '16px',
                        backgroundColor: '#f8f9ff',
                        outline: 'none',
                        transition: 'all 0.3s',
                        boxSizing: 'border-box',
                        fontWeight: '500'
                      }}
                      onFocus={(e) => {
                        e.target.style.border = '2px solid #667eea';
                        e.target.style.backgroundColor = '#fff';
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.15)';
                      }}
                      onBlur={(e) => {
                        e.target.style.border = '2px solid #e8ecf4';
                        e.target.style.backgroundColor = '#f8f9ff';
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>

                  {/* Connection Line */}
                  <div style={{
                    width: '2px',
                    height: '25px',
                    backgroundColor: '#ddd',
                    margin: '0 auto 1rem 24px',
                    borderRadius: '1px'
                  }}></div>

                  {/* Destination */}
                  <div style={{ marginBottom: '2rem', position: 'relative' }}>
                    <div style={{
                      position: 'absolute',
                      left: '18px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '12px',
                      height: '12px',
                      backgroundColor: '#dc3545',
                      borderRadius: '50%',
                      zIndex: 2,
                      boxShadow: '0 0 0 3px rgba(220, 53, 69, 0.2)'
                    }}></div>
                    <input
                      type="text"
                      placeholder="Destination"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      required
                      style={{
                        width: '100%',
                        padding: '18px 18px 18px 45px',
                        border: '2px solid #e8ecf4',
                        borderRadius: '15px',
                        fontSize: '16px',
                        backgroundColor: '#f8f9ff',
                        outline: 'none',
                        transition: 'all 0.3s',
                        boxSizing: 'border-box',
                        fontWeight: '500'
                      }}
                      onFocus={(e) => {
                        e.target.style.border = '2px solid #667eea';
                        e.target.style.backgroundColor = '#fff';
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.15)';
                      }}
                      onBlur={(e) => {
                        e.target.style.border = '2px solid #e8ecf4';
                        e.target.style.backgroundColor = '#f8f9ff';
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = 'none';
                      }}
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
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '2rem',
                  marginTop: '2rem',
                  paddingTop: '1.5rem',
                  borderTop: '1px solid #f0f0f0'
                }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#000', marginBottom: '0.3rem' }}>4.9</div>
                    <div style={{ fontSize: '0.8rem', color: '#666', fontWeight: '600' }}>Rating</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#000', marginBottom: '0.3rem' }}>50K+</div>
                    <div style={{ fontSize: '0.8rem', color: '#666', fontWeight: '600' }}>Rides</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#000', marginBottom: '0.3rem' }}>2min</div>
                    <div style={{ fontSize: '0.8rem', color: '#666', fontWeight: '600' }}>ETA</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            {/* Vehicle Selection Header */}
            <div style={{ textAlign: 'center', marginBottom: '3rem', color: 'white' }}>
              <div style={{
                display: 'inline-block',
                padding: '0.5rem 1.2rem',
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderRadius: '25px',
                fontSize: '0.9rem',
                fontWeight: '600',
                marginBottom: '1.5rem',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.2)'
              }}>
                Step 2 of 2
              </div>
              
              <h1 className={isLoaded ? 'slide-left' : ''} style={{ 
                fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', 
                fontWeight: '800', 
                marginBottom: '1rem',
                letterSpacing: '-1px'
              }}>Choose Your Ride</h1>
              
              <p className={isLoaded ? 'slide-right' : ''} style={{ 
                fontSize: '1.2rem',
                opacity: 0.9,
                marginBottom: '2rem'
              }}>Select the perfect vehicle for your journey</p>
              
              {/* Route Display */}
              <div className={isLoaded ? 'slide-up' : ''} style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem 2rem',
                backgroundColor: 'rgba(255,255,255,0.15)',
                borderRadius: '25px',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.2)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: '8px', height: '8px', backgroundColor: '#28a745', borderRadius: '50%' }}></div>
                  <span style={{ fontSize: '0.95rem', fontWeight: '500' }}>{pickup}</span>
                </div>
                <span style={{ opacity: 0.7 }}>→</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: '8px', height: '8px', backgroundColor: '#dc3545', borderRadius: '50%' }}></div>
                  <span style={{ fontSize: '0.95rem', fontWeight: '500' }}>{destination}</span>
                </div>
              </div>
            </div>
            
            {/* Map */}
            <div className={isLoaded ? 'slide-up' : ''} style={{ marginBottom: '3rem' }}>
              <MapComponent pickup={pickup} destination={destination} />
            </div>
            
            {/* Vehicle Options */}
            <div className={isLoaded ? 'fade-scale' : ''} style={{ 
              backgroundColor: 'rgba(255,255,255,0.95)', 
              backdropFilter: 'blur(20px)',
              borderRadius: '25px', 
              padding: '2.5rem',
              boxShadow: '0 25px 50px rgba(0,0,0,0.2)',
              border: '1px solid rgba(255,255,255,0.3)',
              animationDelay: '0.3s'
            }}>
              <h3 style={{ 
                marginBottom: '2rem',
                fontSize: '1.8rem',
                fontWeight: '700',
                color: '#333',
                textAlign: 'center'
              }}>Available Vehicles</h3>
              
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