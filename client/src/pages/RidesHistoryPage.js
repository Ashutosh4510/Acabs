import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Chatbot from '../components/Chatbot/Chatbot';
// import { useAuth } from '../context/AuthContext';
import { useRides } from '../context/RidesContext';
const heroImage = process.env.PUBLIC_URL + '/myrides-hero.png';

const RidesHistoryPage = () => {
  const [filter, setFilter] = useState('all');
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { rides, updateRideStatus } = useRides();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoaded(true);
    const checkMobile = () => setIsMobile(window.innerWidth <= 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const filteredRides = rides.filter(ride => {
    if (filter === 'all') return true;
    return ride.status === filter;
  });

  const getFilterCount = (status) => {
    if (status === 'all') return rides.length;
    return rides.filter(ride => ride.status === status).length;
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return '#4CAF50';
      case 'cancelled': return '#F44336';
      case 'in-progress': return '#2196F3';
      case 'requested': return '#FF9800';
      default: return '#9E9E9E';
    }
  };

  const handleCancelRide = async (rideId) => {
    if (window.confirm('Are you sure you want to cancel this ride?')) {
      updateRideStatus(rideId, 'cancelled');
    }
  };

  const canCancelRide = (status) => {
    return status === 'requested' || status === 'in-progress';
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #000 0%, #1a1a1a 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      color: 'white'
    }}>
      <Navbar />

      {/* Hero Banner Section */}
      <div style={{
        height: '400px',
        backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.7) 100%), url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
        overflow: 'hidden',
        marginBottom: '2rem',
        border: '1px solid rgba(255,255,255,0.1)',
        opacity: isLoaded ? 1 : 0,
        transform: isLoaded ? 'translateY(0)' : 'translateY(-30px)',
        transition: 'all 0.8s ease-out'
      }}>
        {/* Overlay for better text readability */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.4) 100%)',
          zIndex: 1
        }}></div>

        {/* Hero Content */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          zIndex: 2,
          width: '100%',
          maxWidth: '600px',
          padding: '0 1rem',
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.8s ease-out 0.3s'
        }}>
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: '700',
            color: 'white',
            margin: '0 0 0.5rem 0',
            letterSpacing: '-0.02em'
          }}>My Rides</h1>
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            color: 'rgba(255,255,255,0.7)',
            margin: 0,
            fontWeight: '400'
          }}>Track your journey history</p>
        </div>
      </div>

      {/* Main Container */}
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '0 1rem 2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem'
      }}>
        
        {/* Filter Tabs */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          backgroundColor: 'rgba(255,255,255,0.05)',
          padding: '0.5rem',
          borderRadius: '12px',
          border: '1px solid rgba(255,255,255,0.1)',
          backdropFilter: 'blur(10px)',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignSelf: 'center',
          maxWidth: '600px',
          width: '100%',
          opacity: isLoaded ? 1 : 0,
          transform: isLoaded ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.6s ease-out 0.5s'
        }}>
          {[
            { key: 'all', label: 'All', icon: '🚗' },
            { key: 'completed', label: 'Completed', icon: '✅' },
            { key: 'in-progress', label: 'Active', icon: '🔄' },
            { key: 'cancelled', label: 'Cancelled', icon: '❌' }
          ].map(({ key, label, icon }) => (
            <button key={key} onClick={() => setFilter(key)} style={{
              padding: '0.75rem 1rem',
              border: 'none',
              borderRadius: '8px',
              backgroundColor: filter === key ? 'white' : 'transparent',
              color: filter === key ? '#000' : 'rgba(255,255,255,0.7)',
              cursor: 'pointer',
              fontSize: '0.85rem',
              fontWeight: '500',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              boxShadow: filter === key ? '0 2px 8px rgba(0,0,0,0.1)' : 'none',
              whiteSpace: 'nowrap',
              minWidth: 'fit-content',
              flex: '1 1 auto'
            }}>
              <span>{icon}</span>
              <span>{label}</span>
              <span>({getFilterCount(key)})</span>
            </button>
          ))}
        </div>

        {/* Content Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: !isMobile ? '1fr 300px' : '1fr',
          gap: '2rem',
          alignItems: 'start',
          opacity: isLoaded ? 1 : 0,
          transition: 'all 0.6s ease-out 0.7s'
        }}>
          
          {/* Main Content */}
          <div style={{ 
            width: '100%',
            minWidth: 0,
            overflow: 'hidden'
          }}>
            {/* Rides List or Empty State */}
            {filteredRides.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '3rem 2rem',
                backgroundColor: 'rgba(255,255,255,0.05)',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
                backdropFilter: 'blur(10px)',
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? 'scale(1)' : 'scale(0.8)',
                transition: 'all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.9s'
              }}>
                <div style={{
                  marginBottom: '1.5rem',
                  display: 'flex',
                  justifyContent: 'center'
                }}>
                  <div style={{
                    fontSize: '3rem',
                    opacity: 0.6
                  }}>🚗</div>
                </div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: 'white',
                  marginBottom: '0.75rem'
                }}>No rides found</h3>
                <p style={{
                  fontSize: '0.95rem',
                  color: 'rgba(255,255,255,0.7)',
                  marginBottom: '1.5rem',
                  maxWidth: '300px',
                  margin: '0 auto 1.5rem'
                }}>Start your journey with Acabs and experience premium ride booking</p>
                <button onClick={() => navigate('/booking')} style={{
                  display: 'inline-block',
                  padding: '0.875rem 1.75rem',
                  backgroundColor: 'white',
                  color: '#000',
                  border: 'none',
                  borderRadius: '12px',
                  fontWeight: '600',
                  fontSize: '0.95rem',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 4px 16px rgba(255,255,255,0.2)',
                  cursor: 'pointer'
                }}>Book Now</button>
              </div>
            ) : (
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '1rem'
              }}>
                {filteredRides.map((ride, index) => (
                  <div key={ride._id} style={{
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    borderRadius: '12px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    padding: '1.25rem',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                    transition: 'all 0.2s ease',
                    backdropFilter: 'blur(10px)',
                    width: '100%',
                    boxSizing: 'border-box',
                    opacity: isLoaded ? 1 : 0,
                    transform: isLoaded ? 'translateX(0)' : 'translateX(-50px)',
                    transitionDelay: `${0.9 + index * 0.1}s`,
                    transitionDuration: '0.6s',
                    transitionTimingFunction: 'ease-out'
                  }}>
                    {/* Ride Header */}
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'flex-start',
                      marginBottom: '1rem',
                      gap: '1rem'
                    }}>
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '0.75rem',
                        flex: '1',
                        minWidth: 0
                      }}>
                        <div style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          backgroundColor: getStatusColor(ride.status),
                          flexShrink: 0
                        }}></div>
                        <span style={{
                          fontSize: '0.85rem',
                          fontWeight: '500',
                          color: getStatusColor(ride.status),
                          textTransform: 'capitalize'
                        }}>{ride.status}</span>
                        <span style={{
                          fontSize: '0.8rem',
                          color: 'rgba(255,255,255,0.5)'
                        }}>#{ride._id.slice(-6)}</span>
                      </div>
                      
                      <div style={{
                        fontSize: '1.25rem',
                        fontWeight: '700',
                        color: 'white',
                        flexShrink: 0
                      }}>${ride.fare}</div>
                    </div>
                    
                    {/* Route Information */}
                    <div style={{ marginBottom: '1rem' }}>
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'flex-start', 
                        gap: '0.75rem', 
                        marginBottom: '0.5rem' 
                      }}>
                        <div style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          backgroundColor: '#10B981',
                          marginTop: '0.5rem',
                          flexShrink: 0
                        }}></div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ 
                            fontSize: '0.75rem', 
                            color: 'rgba(255,255,255,0.5)', 
                            marginBottom: '0.25rem' 
                          }}>FROM</div>
                          <div style={{ 
                            fontSize: '0.95rem', 
                            fontWeight: '500', 
                            color: 'white',
                            wordBreak: 'break-word'
                          }}>
                            {ride.pickup?.address || ride.pickup}
                          </div>
                        </div>
                      </div>
                      
                      <div style={{ 
                        marginLeft: '0.75rem', 
                        marginBottom: '0.5rem' 
                      }}>
                        <div style={{
                          width: '1px',
                          height: '15px',
                          backgroundColor: 'rgba(255,255,255,0.3)'
                        }}></div>
                      </div>
                      
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'flex-start', 
                        gap: '0.75rem' 
                      }}>
                        <div style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          backgroundColor: '#EF4444',
                          marginTop: '0.5rem',
                          flexShrink: 0
                        }}></div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ 
                            fontSize: '0.75rem', 
                            color: 'rgba(255,255,255,0.5)', 
                            marginBottom: '0.25rem' 
                          }}>TO</div>
                          <div style={{ 
                            fontSize: '0.95rem', 
                            fontWeight: '500', 
                            color: 'white',
                            wordBreak: 'break-word'
                          }}>
                            {ride.destination?.address || ride.destination}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Ride Details */}
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: '0.8rem', 
                      color: 'rgba(255,255,255,0.7)',
                      marginBottom: '1rem'
                    }}>
                      <span>{new Date(ride.createdAt || ride.date).toLocaleDateString()}</span>
                      <span>{ride.vehicleType}</span>
                      <span>{ride.duration}</span>
                    </div>
                    
                    {/* Action Buttons */}
                    <div style={{ 
                      display: 'flex', 
                      gap: '0.5rem',
                      justifyContent: 'flex-end'
                    }}>
                      {canCancelRide(ride.status) && (
                        <button
                          onClick={() => handleCancelRide(ride._id)}
                          style={{
                            padding: '0.5rem 1rem',
                            backgroundColor: 'rgba(239,68,68,0.1)',
                            border: '1px solid rgba(239,68,68,0.3)',
                            borderRadius: '8px',
                            color: '#EF4444',
                            fontSize: '0.8rem',
                            fontWeight: '500',
                            cursor: 'pointer'
                          }}
                        >Cancel</button>
                      )}
                      {ride.status === 'completed' && (
                        <button
                          onClick={() => {
                            navigate(`/booking?pickup=${encodeURIComponent(ride.pickup?.address || ride.pickup)}&destination=${encodeURIComponent(ride.destination?.address || ride.destination)}`);
                          }}
                          style={{
                            padding: '0.5rem 1rem',
                            backgroundColor: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            color: '#000',
                            fontSize: '0.8rem',
                            fontWeight: '500',
                            cursor: 'pointer'
                          }}
                        >Book Again</button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          {!isMobile && (
            <div style={{ 
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem'
            }}>
              {/* Quick Booking Card */}
              <div style={{
                backgroundColor: 'rgba(255,255,255,0.05)',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.1)',
                padding: '1.5rem',
                boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
                backdropFilter: 'blur(10px)',
                opacity: isLoaded ? 1 : 0,
                transition: 'opacity 0.6s ease-out 1.1s'
              }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem',
                  flexShrink: 0
                }}>
                  <span style={{ fontSize: '1.25rem' }}>🚗</span>
                </div>
                
                <h3 style={{
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  color: 'white',
                  marginBottom: '0.5rem'
                }}>Get a ride in minutes</h3>
                
                <p style={{
                  fontSize: '0.85rem',
                  color: 'rgba(255,255,255,0.7)',
                  lineHeight: '1.4',
                  marginBottom: '1.25rem'
                }}>
                  Book your next ride quickly and easily. Choose from economy, premium, or luxury vehicles.
                </p>
                
                <button onClick={() => navigate('/booking')} style={{
                  display: 'block',
                  width: '100%',
                  padding: '0.875rem',
                  backgroundColor: 'white',
                  color: '#000',
                  border: 'none',
                  borderRadius: '12px',
                  fontWeight: '600',
                  fontSize: '0.9rem',
                  textAlign: 'center',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 4px 16px rgba(255,255,255,0.2)',
                  boxSizing: 'border-box',
                  cursor: 'pointer'
                }}>Request a Ride</button>
              </div>

              {/* Stats Card */}
              {rides.length > 0 && (
                <div style={{
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  borderRadius: '16px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  padding: '1.5rem',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
                  backdropFilter: 'blur(10px)',
                  opacity: isLoaded ? 1 : 0,
                  transition: 'opacity 0.6s ease-out 1.3s'
                }}>
                  <h4 style={{
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: 'white',
                    marginBottom: '1rem'
                  }}>Your Stats</h4>
                  
                  <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '0.75rem' 
                  }}>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <span style={{ 
                        color: 'rgba(255,255,255,0.7)', 
                        fontSize: '0.85rem' 
                      }}>Total Rides</span>
                      <span style={{ 
                        fontWeight: '600', 
                        color: 'white',
                        fontSize: '0.9rem'
                      }}>{rides.length}</span>
                    </div>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <span style={{ 
                        color: 'rgba(255,255,255,0.7)', 
                        fontSize: '0.85rem' 
                      }}>Total Spent</span>
                      <span style={{ 
                        fontWeight: '600', 
                        color: 'white',
                        fontSize: '0.9rem'
                      }}>
                        ${rides.reduce((sum, ride) => sum + (ride.fare || 0), 0)}
                      </span>
                    </div>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <span style={{ 
                        color: 'rgba(255,255,255,0.7)', 
                        fontSize: '0.85rem' 
                      }}>Completed</span>
                      <span style={{ 
                        fontWeight: '600', 
                        color: '#4CAF50',
                        fontSize: '0.9rem'
                      }}>
                        {rides.filter(ride => ride.status === 'completed').length}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      <Chatbot />
    </div>
  );
};

export default RidesHistoryPage;