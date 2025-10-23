import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Chatbot from '../components/Chatbot/Chatbot';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useNotifications } from '../context/NotificationContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const ProfilePage = () => {
  const { user } = useAuth();
  const { fontSize, highContrast, changeFontSize, toggleHighContrast } = useTheme();
  const { settings, updateSettings, requestPermission, permission } = useNotifications();
  const [isLoaded, setIsLoaded] = useState(false);

  // Mock data for analytics - in real app, this would come from API
  const rideData = [
    { month: 'Jan', rides: 12, costs: 180, distance: 45 },
    { month: 'Feb', rides: 19, costs: 285, distance: 68 },
    { month: 'Mar', rides: 15, costs: 225, distance: 52 },
    { month: 'Apr', rides: 25, costs: 375, distance: 89 },
    { month: 'May', rides: 22, costs: 330, distance: 76 },
    { month: 'Jun', rides: 28, costs: 420, distance: 95 }
  ];

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #000 0%, #1a1a1a 100%)',
      position: 'relative'
    }}>
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

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem',
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 'calc(100vh - 80px)'
      }}>
        <div className={isLoaded ? 'slide-up' : ''} style={{
          width: '100%',
          maxWidth: '900px',
          backgroundColor: '#2a2a2a',
          borderRadius: '30px',
          padding: '3rem',
          boxShadow: `
            inset 0 1px 0 rgba(255,255,255,0.1),
            0 20px 40px rgba(0,0,0,0.4),
            0 40px 80px rgba(0,0,0,0.3),
            inset 0 -1px 0 rgba(0,0,0,0.2)
          `,
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Ambient light effect */}
          <div style={{
            position: 'absolute',
            top: '-50%',
            left: '-50%',
            width: '200%',
            height: '200%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)',
            pointerEvents: 'none'
          }}></div>

          {/* Profile Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '3rem',
            position: 'relative',
            zIndex: 2
          }}>
            {/* Profile Picture */}
            <div style={{
              width: '120px',
              height: '120px',
              backgroundColor: '#3a3a3a',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `
                inset 0 2px 4px rgba(0,0,0,0.3),
                inset 0 -2px 4px rgba(255,255,255,0.1),
                0 8px 16px rgba(0,0,0,0.4)
              `,
              marginRight: '2rem',
              position: 'relative'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                backgroundColor: '#4a4a4a',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '3px solid rgba(255,255,255,0.2)'
              }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  backgroundColor: 'white',
                  borderRadius: '50%',
                  position: 'relative'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '10px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '20px',
                    height: '20px',
                    backgroundColor: '#2a2a2a',
                    borderRadius: '50%'
                  }}></div>
                  <div style={{
                    position: 'absolute',
                    bottom: '6px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '30px',
                    height: '20px',
                    backgroundColor: '#2a2a2a',
                    borderRadius: '15px 15px 0 0'
                  }}></div>
                </div>
              </div>
            </div>

            {/* User Info */}
            <div>
              <h1 style={{
                fontSize: '2.5rem',
                fontWeight: '800',
                color: 'white',
                margin: '0 0 0.5rem 0',
                fontFamily: 'system-ui, -apple-system, sans-serif'
              }}>{user?.name || 'LIAM CHEN'}</h1>
              <p style={{
                fontSize: '1.1rem',
                color: 'rgba(255,255,255,0.7)',
                margin: 0,
                fontFamily: 'system-ui, -apple-system, sans-serif'
              }}>{user?.email || 'liam.chen@email.com'}</p>
            </div>
          </div>

          {/* Analytics Section */}
          <div style={{
            marginBottom: '3rem',
            position: 'relative',
            zIndex: 2
          }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: 'white',
              margin: '0 0 2rem 0',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}>RIDE ANALYTICS</h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem'
            }}>
              {/* Rides Chart */}
              <div style={{
                backgroundColor: '#3a3a3a',
                borderRadius: '20px',
                padding: '2rem',
                boxShadow: `
                  inset 0 2px 4px rgba(0,0,0,0.3),
                  inset 0 -2px 4px rgba(255,255,255,0.1)
                `
              }}>
                <h3 style={{
                  fontSize: '1.2rem',
                  fontWeight: '600',
                  color: 'white',
                  margin: '0 0 1rem 0',
                  fontFamily: 'system-ui, -apple-system, sans-serif'
                }}>Monthly Rides</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={rideData}>
                    <defs>
                      <linearGradient id="ridesGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00ff88" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#00ff88" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="month" stroke="rgba(255,255,255,0.7)" />
                    <YAxis stroke="rgba(255,255,255,0.7)" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#2a2a2a',
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '10px',
                        color: 'white'
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="rides"
                      stroke="#00ff88"
                      strokeWidth={3}
                      fill="url(#ridesGradient)"
                      animationDuration={2000}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Costs Chart */}
              <div style={{
                backgroundColor: '#3a3a3a',
                borderRadius: '20px',
                padding: '2rem',
                boxShadow: `
                  inset 0 2px 4px rgba(0,0,0,0.3),
                  inset 0 -2px 4px rgba(255,255,255,0.1)
                `
              }}>
                <h3 style={{
                  fontSize: '1.2rem',
                  fontWeight: '600',
                  color: 'white',
                  margin: '0 0 1rem 0',
                  fontFamily: 'system-ui, -apple-system, sans-serif'
                }}>Monthly Costs ($)</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={rideData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="month" stroke="rgba(255,255,255,0.7)" />
                    <YAxis stroke="rgba(255,255,255,0.7)" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#2a2a2a',
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '10px',
                        color: 'white'
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="costs"
                      stroke="#ff6b6b"
                      strokeWidth={3}
                      dot={{ fill: '#ff6b6b', strokeWidth: 2, r: 6 }}
                      activeDot={{ r: 8, stroke: '#ff6b6b', strokeWidth: 2, fill: '#fff' }}
                      animationDuration={2000}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Distance Chart */}
              <div style={{
                backgroundColor: '#3a3a3a',
                borderRadius: '20px',
                padding: '2rem',
                boxShadow: `
                  inset 0 2px 4px rgba(0,0,0,0.3),
                  inset 0 -2px 4px rgba(255,255,255,0.1)
                `
              }}>
                <h3 style={{
                  fontSize: '1.2rem',
                  fontWeight: '600',
                  color: 'white',
                  margin: '0 0 1rem 0',
                  fontFamily: 'system-ui, -apple-system, sans-serif'
                }}>Monthly Distance (km)</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={rideData}>
                    <defs>
                      <linearGradient id="distanceGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4ecdc4" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#4ecdc4" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="month" stroke="rgba(255,255,255,0.7)" />
                    <YAxis stroke="rgba(255,255,255,0.7)" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#2a2a2a',
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '10px',
                        color: 'white'
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="distance"
                      stroke="#4ecdc4"
                      strokeWidth={3}
                      fill="url(#distanceGradient)"
                      animationDuration={2000}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Settings Section */}
          <div style={{
            marginBottom: '3rem',
            position: 'relative',
            zIndex: 2
          }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: 'white',
              margin: '0 0 2rem 0',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}>SETTINGS</h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem'
            }}>
              {/* Accessibility Settings */}
              <div style={{
                backgroundColor: '#3a3a3a',
                borderRadius: '20px',
                padding: '2rem',
                boxShadow: `
                  inset 0 2px 4px rgba(0,0,0,0.3),
                  inset 0 -2px 4px rgba(255,255,255,0.1)
                `
              }}>
                <h3 style={{
                  fontSize: '1.2rem',
                  fontWeight: '600',
                  color: 'white',
                  margin: '0 0 1.5rem 0',
                  fontFamily: 'system-ui, -apple-system, sans-serif'
                }}>Accessibility</h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: 'white', fontSize: '0.9rem' }}>Font Size</span>
                    <select
                      value={fontSize}
                      onChange={(e) => changeFontSize(e.target.value)}
                      style={{
                        padding: '0.5rem',
                        borderRadius: '8px',
                        border: '1px solid rgba(255,255,255,0.2)',
                        backgroundColor: '#4a4a4a',
                        color: 'white',
                        fontSize: '0.8rem'
                      }}
                    >
                      <option value="small">Small</option>
                      <option value="normal">Normal</option>
                      <option value="large">Large</option>
                      <option value="xlarge">Extra Large</option>
                    </select>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: 'white', fontSize: '0.9rem' }}>High Contrast</span>
                    <button
                      onClick={toggleHighContrast}
                      style={{
                        padding: '0.5rem 1rem',
                        borderRadius: '20px',
                        border: '1px solid rgba(255,255,255,0.2)',
                        backgroundColor: highContrast ? '#00ff88' : '#4a4a4a',
                        color: highContrast ? 'black' : 'white',
                        cursor: 'pointer',
                        fontSize: '0.8rem'
                      }}
                    >
                      {highContrast ? 'ON' : 'OFF'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Notification Settings */}
              <div style={{
                backgroundColor: '#3a3a3a',
                borderRadius: '20px',
                padding: '2rem',
                boxShadow: `
                  inset 0 2px 4px rgba(0,0,0,0.3),
                  inset 0 -2px 4px rgba(255,255,255,0.1)
                `
              }}>
                <h3 style={{
                  fontSize: '1.2rem',
                  fontWeight: '600',
                  color: 'white',
                  margin: '0 0 1.5rem 0',
                  fontFamily: 'system-ui, -apple-system, sans-serif'
                }}>Notifications</h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {permission === 'default' && (
                    <button
                      onClick={requestPermission}
                      style={{
                        padding: '0.8rem 1rem',
                        borderRadius: '10px',
                        border: '1px solid rgba(255,255,255,0.2)',
                        backgroundColor: '#00ff88',
                        color: 'black',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        fontWeight: '600'
                      }}
                    >
                      Enable Notifications
                    </button>
                  )}

                  {permission === 'granted' && (
                    <>
                      {Object.entries(settings).map(([key, value]) => (
                        <div key={key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ color: 'white', fontSize: '0.9rem', textTransform: 'capitalize' }}>
                            {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                          </span>
                          <button
                            onClick={() => updateSettings({ [key]: !value })}
                            style={{
                              padding: '0.3rem 0.8rem',
                              borderRadius: '15px',
                              border: '1px solid rgba(255,255,255,0.2)',
                              backgroundColor: value ? '#00ff88' : '#4a4a4a',
                              color: value ? 'black' : 'white',
                              cursor: 'pointer',
                              fontSize: '0.7rem'
                            }}
                          >
                            {value ? 'ON' : 'OFF'}
                          </button>
                        </div>
                      ))}
                    </>
                  )}

                  {permission === 'denied' && (
                    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem' }}>
                      Notifications are blocked. Please enable them in your browser settings.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div style={{
            position: 'relative',
            zIndex: 2
          }}>
            {/* Account Details */}
            <div>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: 'white',
                margin: '0 0 2rem 0',
                fontFamily: 'system-ui, -apple-system, sans-serif'
              }}>ACCOUNT DETAILS</h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {/* Mobile */}
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: 'rgba(255,255,255,0.8)',
                    marginBottom: '0.5rem',
                    fontFamily: 'system-ui, -apple-system, sans-serif'
                  }}>Mobile</label>
                  <div style={{
                    padding: '1rem 1.5rem',
                    backgroundColor: '#3a3a3a',
                    borderRadius: '15px',
                    color: 'white',
                    fontSize: '1rem',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    boxShadow: `
                      inset 0 2px 4px rgba(0,0,0,0.3),
                      inset 0 -2px 4px rgba(255,255,255,0.1)
                    `
                  }}>
                    {user?.phone || 'Phone not provided'}
                  </div>
                </div>

                {/* Payment */}
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: 'rgba(255,255,255,0.8)',
                    marginBottom: '0.5rem',
                    fontFamily: 'system-ui, -apple-system, sans-serif'
                  }}>Payment</label>
                  <div style={{
                    padding: '1rem 1.5rem',
                    backgroundColor: '#3a3a3a',
                    borderRadius: '15px',
                    color: 'white',
                    fontSize: '1rem',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    boxShadow: `
                      inset 0 2px 4px rgba(0,0,0,0.3),
                      inset 0 -2px 4px rgba(255,255,255,0.1)
                    `
                  }}>
                    Mastercard ending in 9876
                  </div>
                </div>
              </div>
            </div>


          </div>

          {/* Bottom Section */}
          <div style={{
            marginTop: '3rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            zIndex: 2
          }}>
            {/* Footer Text */}
            <div style={{
              color: 'rgba(255,255,255,0.6)',
              fontSize: '0.9rem',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}>
              PAYMENT METHODS 2023
            </div>
          </div>
        </div>
      </div>
      <Chatbot />
    </div>
  );
};

export default ProfilePage;
