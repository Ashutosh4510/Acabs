import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
// import BookingForm from '../components/BookingForm/BookingForm';
import Footer from '../components/Footer/Footer';
import Chatbot from '../components/Chatbot/Chatbot';
import '../styles/animations.css';
import './HomePage.css';

const HomePage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="homepage">
      <Navbar />
      
      {/* Hero Section */}
      <div className="hero-section">
        {/* Geometric Background */}
        <div className="hero-background"></div>
        
        {/* Floating Elements */}
        <div className="floating-element-1 float-animation"></div>
        <div className="floating-element-2 float-animation"></div>

        <div className="hero-container">
          {/* Left Content */}
          <div className={`hero-content ${isLoaded ? 'slide-left' : ''}`}>
            <div className="hero-badge-container">
              <span className="hero-badge">
                AI-Powered Transportation
              </span>
            </div>
            
            <h1 className="hero-title">
              Your Ride,
              <br />
              <span className="hero-title-accent">Delivered</span>
            </h1>
            
            <p className="hero-description">
              Experience the future of transportation with our AI-powered platform.
              Fast, reliable, and always available.
            </p>
            
            {/* Stats */}
            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-number">50K+</div>
                <div className="stat-label">Happy Riders</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">24/7</div>
                <div className="stat-label">Available</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">5★</div>
                <div className="stat-label">Rating</div>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="hero-buttons">
              <button
                className="hero-btn primary shine-effect"
                onClick={() => navigate('/booking')}
              >
                Book Now
              </button>
              <button
                className="hero-btn secondary shine-effect"
                onClick={() => document.getElementById('fleet-section').scrollIntoView({ behavior: 'smooth' })}
              >
                View Fleet
              </button>
            </div>
          </div>
          
          {/* Right Visual */}
          <div className={`hero-visual ${isLoaded ? 'slide-right' : ''}`}>
            <div className="hero-visual-container">
              {/* Car Visualization */}
              <div className="hero-car pulse-animation">
                <div className="car-body">
                  {/* Car Windows */}
                  <div className="car-windows"></div>
                  
                  {/* Car Wheels */}
                  <div className="car-wheel left"></div>
                  <div className="car-wheel right"></div>
                </div>
              </div>
              
              {/* Route Lines */}
              <div className="route-line top"></div>
              <div className="route-line bottom"></div>
            </div>
          </div>
        </div>
      </div>



      {/* Premium Experience Section */}
      <div id="fleet-section" className="fleet-section">
        <div className="container">
          {/* Background Elements */}
          <div style={{
            position: 'absolute',
            top: '10%',
            left: '5%',
            width: '100px',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.1), transparent)',
            transform: 'rotate(45deg)'
          }}></div>
          <div style={{
            position: 'absolute',
            bottom: '20%',
            right: '10%',
            width: '80px',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.1), transparent)',
            transform: 'rotate(-30deg)'
          }}></div>
          
          <div className="fleet-grid">
            {/* Left Content */}
            <div className={isLoaded ? 'slide-left' : ''} style={{ position: 'relative', zIndex: 1 }}>
              <div style={{
                display: 'inline-block',
                padding: '0.5rem 1.5rem',
                backgroundColor: 'rgba(0,0,0,0.05)',
                borderRadius: '50px',
                fontSize: '0.9rem',
                fontWeight: '600',
                marginBottom: '2rem',
                border: '1px solid rgba(0,0,0,0.1)',
                color: '#000000'
              }}>
                Premium Fleet
              </div>
              
              <h2 style={{
                fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                fontWeight: '900',
                marginBottom: '2rem',
                color: '#000000',
                letterSpacing: '-2px',
                lineHeight: '1.1'
              }}>
                Ride in
                <br />
                <span style={{
                  background: 'linear-gradient(#000 0%, #333 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>Comfort & Style</span>
              </h2>
              
              <p style={{
                fontSize: '1.3rem',
                lineHeight: '1.6',
                color: '#666',
                marginBottom: '3rem',
                maxWidth: '500px'
              }}>
                Experience luxury transportation with our premium fleet.
                Every ride is crafted for your comfort and convenience.
              </p>
              
              {/* Features */}
              <div style={{ marginBottom: '3rem' }}>
                {[
                  'Premium Vehicles',
                  'Professional Drivers', 
                  'Competitive Pricing',
                  '24/7 Availability'
                ].map((feature, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '1rem',
                    animationDelay: `${0.2 + index * 0.1}s`
                  }} className={isLoaded ? 'slide-left' : ''}>
                    <div style={{
                      width: '8px',
                      height: '8px',
                      backgroundColor: '#000',
                      borderRadius: '50%',
                      marginRight: '1rem'
                    }}></div>
                    <span style={{
                      fontSize: '1.1rem',
                      fontWeight: '500',
                      color: '#333'
                    }}>{feature}</span>
                  </div>
                ))}
              </div>
              
              <button
                className="shine-effect"
                onClick={() => navigate('/booking')}
                style={{
                  padding: '1.2rem 2.5rem',
                  backgroundColor: '#000000',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50px',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
              >
                Book Your Ride
              </button>
            </div>
            
            {/* Right Car Visual */}
            <div className={isLoaded ? 'slide-right' : ''} style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              position: 'relative'
            }}>
              <div style={{
                width: '350px',
                height: '200px',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }} className="pulse-animation">
                {/* Modern Car Design */}
                <div style={{
                  width: '280px',
                  height: '110px',
                  backgroundColor: '#000',
                  borderRadius: '20px',
                  position: 'relative',
                  boxShadow: '0 15px 30px rgba(0,0,0,0.2)'
                }}>
                  {/* Car Windows */}
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    left: '35px',
                    right: '35px',
                    height: '45px',
                    backgroundColor: 'white',
                    borderRadius: '12px'
                  }}></div>
                  
                  {/* Car Headlight */}
                  <div style={{
                    position: 'absolute',
                    top: '35px',
                    right: '12px',
                    width: '12px',
                    height: '18px',
                    backgroundColor: 'white',
                    borderRadius: '50%'
                  }}></div>
                  
                  {/* Car Wheels */}
                  <div style={{
                    position: 'absolute',
                    bottom: '-20px',
                    left: '45px',
                    width: '40px',
                    height: '40px',
                    backgroundColor: '#333',
                    borderRadius: '50%',
                    border: '6px solid white',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '16px',
                      height: '16px',
                      backgroundColor: '#000',
                      borderRadius: '50%'
                    }}></div>
                  </div>
                  <div style={{
                    position: 'absolute',
                    bottom: '-20px',
                    right: '45px',
                    width: '40px',
                    height: '40px',
                    backgroundColor: '#333',
                    borderRadius: '50%',
                    border: '6px solid white',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '16px',
                      height: '16px',
                      backgroundColor: '#000',
                      borderRadius: '50%'
                    }}></div>
                  </div>
                </div>
                
                {/* Speed Lines */}
                <div style={{
                  position: 'absolute',
                  left: '-50px',
                  top: '50%',
                  transform: 'translateY(-50%)'
                }}>
                  {[0, 1, 2].map(i => (
                    <div key={i} style={{
                      width: '25px',
                      height: '2px',
                      backgroundColor: 'rgba(0,0,0,0.4)',
                      marginBottom: '5px',
                      borderRadius: '1px',
                      opacity: 1 - (i * 0.3)
                    }}></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Stats Section */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '3rem',
            marginTop: '6rem',
            padding: '3rem 0',
            borderTop: '1px solid rgba(0,0,0,0.1)'
          }}>
            {[
              { number: '50K+', label: 'Happy Customers' },
              { number: '24/7', label: 'Service Available' },
              { number: '5.0', label: 'Average Rating' },
              { number: '100+', label: 'Cities Covered' }
            ].map((stat, index) => (
              <div key={index} style={{
                textAlign: 'center',
                animationDelay: `${1 + index * 0.1}s`
              }} className={isLoaded ? 'fade-scale' : ''}>
                <div style={{
                  fontSize: '3rem',
                  fontWeight: '900',
                  color: '#000000',
                  marginBottom: '0.5rem',
                  letterSpacing: '-1px'
                }}>
                  {stat.number}
                </div>
                <div style={{
                  fontSize: '1rem',
                  color: '#666',
                  fontWeight: '500'
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Coverage Map Section */}
      <div className="coverage-section">
        <div className="container">
          {/* Background Grid */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}></div>
          
          <div style={{
            textAlign: 'center',
            marginBottom: '6rem',
            position: 'relative',
            zIndex: 1
          }}>
            <div style={{
              display: 'inline-block',
              padding: '0.5rem 1.5rem',
              backgroundColor: 'rgba(255,255,255,0.1)',
              borderRadius: '50px',
              fontSize: '0.9rem',
              fontWeight: '600',
              marginBottom: '2rem',
              border: '1px solid rgba(255,255,255,0.2)',
              color: 'white'
            }}>
              Global Coverage
            </div>
            
            <h2 style={{
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              fontWeight: '900',
              marginBottom: '2rem',
              letterSpacing: '-2px',
              lineHeight: '1.1',
              color: 'white'
            }}>
              Available
              <br />
              <span style={{
                background: 'linear-gradient(135deg, #fff 0%, #ccc 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>Everywhere</span>
            </h2>
            
            <p style={{
              fontSize: '1.3rem',
              lineHeight: '1.6',
              opacity: 0.8,
              maxWidth: '600px',
              margin: '0 auto',
              color: 'rgba(255,255,255,0.7)'
            }}>
              Our network spans across major cities worldwide.
              Find us wherever your journey takes you.
            </p>
          </div>
          
          {/* Map Visualization */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '6rem',
            alignItems: 'center',
            position: 'relative',
            zIndex: 1
          }}>
            {/* Map Visual */}
            <div className={isLoaded ? 'slide-left' : ''} style={{
              position: 'relative',
              height: '500px',
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '20px',
              border: '1px solid rgba(255,255,255,0.1)',
              overflow: 'hidden'
            }}>
              {/* Map Grid */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                `,
                backgroundSize: '30px 30px'
              }}></div>
              
              {/* Location Pins */}
              {[
                { top: '20%', left: '25%', size: '12px' },
                { top: '35%', left: '60%', size: '10px' },
                { top: '55%', left: '30%', size: '14px' },
                { top: '70%', left: '70%', size: '8px' },
                { top: '40%', left: '80%', size: '10px' },
                { top: '25%', left: '75%', size: '12px' }
              ].map((pin, index) => (
                <div key={index} style={{
                  position: 'absolute',
                  top: pin.top,
                  left: pin.left,
                  width: pin.size,
                  height: pin.size,
                  backgroundColor: 'white',
                  borderRadius: '50%',
                  boxShadow: '0 0 20px rgba(255,255,255,0.5)',
                  animation: `pulse 2s infinite ${index * 0.3}s`
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '4px',
                    height: '4px',
                    backgroundColor: '#000',
                    borderRadius: '50%'
                  }}></div>
                </div>
              ))}
              
              {/* Route Lines */}
              <svg style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none'
              }}>
                <path d="M 25% 20% Q 45% 10% 60% 35%" 
                      stroke="rgba(255,255,255,0.3)" 
                      strokeWidth="2" 
                      fill="none" 
                      strokeDasharray="5,5">
                  <animate attributeName="stroke-dashoffset" 
                           values="0;10" 
                           dur="2s" 
                           repeatCount="indefinite" />
                </path>
                <path d="M 60% 35% Q 50% 50% 30% 55%" 
                      stroke="rgba(255,255,255,0.3)" 
                      strokeWidth="2" 
                      fill="none" 
                      strokeDasharray="5,5">
                  <animate attributeName="stroke-dashoffset" 
                           values="0;10" 
                           dur="2.5s" 
                           repeatCount="indefinite" />
                </path>
                <path d="M 30% 55% Q 50% 65% 70% 70%" 
                      stroke="rgba(255,255,255,0.3)" 
                      strokeWidth="2" 
                      fill="none" 
                      strokeDasharray="5,5">
                  <animate attributeName="stroke-dashoffset" 
                           values="0;10" 
                           dur="3s" 
                           repeatCount="indefinite" />
                </path>
              </svg>
            </div>
            
            {/* Coverage Stats */}
            <div className={isLoaded ? 'slide-right' : ''}>
              <div style={{
                display: 'grid',
                gap: '3rem'
              }}>
                {[
                  { 
                    icon: '🌍', 
                    title: '100+ Cities', 
                    desc: 'Global presence across major metropolitan areas' 
                  },
                  { 
                    icon: '⚡', 
                    title: 'Real-time Tracking', 
                    desc: 'Live GPS tracking for all your rides' 
                  },
                  { 
                    icon: '🚗', 
                    title: '5000+ Drivers', 
                    desc: 'Professional drivers ready to serve you' 
                  },
                  { 
                    icon: '📱', 
                    title: 'Smart Routing', 
                    desc: 'AI-powered route optimization for faster trips' 
                  }
                ].map((item, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '1.5rem',
                    animationDelay: `${0.5 + index * 0.1}s`
                  }} className={isLoaded ? 'slide-right' : ''}>
                    <div style={{
                      width: '60px',
                      height: '60px',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      borderRadius: '15px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem',
                      border: '1px solid rgba(255,255,255,0.2)',
                      flexShrink: 0
                    }}>
                      {/* Replace emoji with CSS icon */}
                      {index === 0 && (
                        <div style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          border: '3px solid white',
                          position: 'relative'
                        }}>
                          <div style={{
                            position: 'absolute',
                            top: '2px',
                            left: '2px',
                            right: '2px',
                            bottom: '2px',
                            borderRadius: '50%',
                            border: '1px solid rgba(255,255,255,0.5)'
                          }}></div>
                        </div>
                      )}
                      {index === 1 && (
                        <div style={{
                          width: '0',
                          height: '0',
                          borderLeft: '8px solid transparent',
                          borderRight: '8px solid transparent',
                          borderBottom: '16px solid white',
                          position: 'relative'
                        }}>
                          <div style={{
                            position: 'absolute',
                            top: '4px',
                            left: '-4px',
                            width: '0',
                            height: '0',
                            borderLeft: '4px solid transparent',
                            borderRight: '4px solid transparent',
                            borderBottom: '8px solid #000'
                          }}></div>
                        </div>
                      )}
                      {index === 2 && (
                        <div style={{
                          width: '28px',
                          height: '16px',
                          backgroundColor: 'white',
                          borderRadius: '4px',
                          position: 'relative'
                        }}>
                          <div style={{
                            position: 'absolute',
                            top: '2px',
                            left: '4px',
                            right: '4px',
                            height: '6px',
                            backgroundColor: '#000',
                            borderRadius: '2px'
                          }}></div>
                          <div style={{
                            position: 'absolute',
                            bottom: '-4px',
                            left: '4px',
                            width: '6px',
                            height: '6px',
                            backgroundColor: '#333',
                            borderRadius: '50%'
                          }}></div>
                          <div style={{
                            position: 'absolute',
                            bottom: '-4px',
                            right: '4px',
                            width: '6px',
                            height: '6px',
                            backgroundColor: '#333',
                            borderRadius: '50%'
                          }}></div>
                        </div>
                      )}
                      {index === 3 && (
                        <div style={{
                          width: '20px',
                          height: '28px',
                          backgroundColor: 'white',
                          borderRadius: '4px',
                          position: 'relative'
                        }}>
                          <div style={{
                            position: 'absolute',
                            top: '4px',
                            left: '2px',
                            right: '2px',
                            height: '12px',
                            backgroundColor: '#000',
                            borderRadius: '2px'
                          }}></div>
                          <div style={{
                            position: 'absolute',
                            bottom: '2px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '8px',
                            height: '2px',
                            backgroundColor: '#000',
                            borderRadius: '1px'
                          }}></div>
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 style={{
                        fontSize: '1.3rem',
                        fontWeight: '700',
                        marginBottom: '0.5rem',
                        color: 'white'
                      }}>
                        {item.title}
                      </h3>
                      <p style={{
                        fontSize: '1rem',
                        opacity: 0.8,
                        lineHeight: '1.5',
                        color: 'rgba(255,255,255,0.7)'
                      }}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div style={{ marginTop: '3rem' }}>
                <button
                  className="shine-effect"
                  onClick={() => navigate('/coverage')}
                  style={{
                    padding: '1.2rem 2.5rem',
                    backgroundColor: 'white',
                    color: '#000000',
                    border: 'none',
                    borderRadius: '50px',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s'
                  }}
                >
                  Start Your Journey
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <Chatbot />
    </div>
  );
};

export default HomePage;