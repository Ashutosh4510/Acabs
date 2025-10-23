import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      backgroundColor: '#000000',
      color: 'white',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <Link to="/" style={{
        color: 'white',
        textDecoration: 'none',
        fontSize: '1.4rem',
        fontWeight: '800',
        letterSpacing: '-0.5px',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        <div style={{
          width: '28px',
          height: '28px',
          backgroundColor: 'rgba(255,255,255,0.1)',
          borderRadius: '6px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid rgba(255,255,255,0.2)',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{
            width: '18px',
            height: '11px',
            backgroundColor: 'white',
            borderRadius: '3px',
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              top: '2px',
              left: '3px',
              right: '3px',
              height: '4px',
              backgroundColor: 'rgba(255,255,255,0.1)',
              borderRadius: '1px'
            }}></div>
            <div style={{
              position: 'absolute',
              bottom: '-3px',
              left: '3px',
              width: '4px',
              height: '4px',
              backgroundColor: 'white',
              borderRadius: '50%'
            }}></div>
            <div style={{
              position: 'absolute',
              bottom: '-3px',
              right: '3px',
              width: '4px',
              height: '4px',
              backgroundColor: 'white',
              borderRadius: '50%'
            }}></div>
          </div>
        </div>
        <span style={{
          fontFamily: '"Azonix", sans-serif',
          fontWeight: '400',
          letterSpacing: '2px'
        }}>ACABS</span>
      </Link>
      
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        <Link to="/" style={{
          color: 'white',
          textDecoration: 'none',
          padding: '0.5rem 1rem',
          borderRadius: '6px',
          transition: 'background-color 0.3s'
        }}>Home</Link>
        <Link to="/coverage" style={{
          color: 'white',
          textDecoration: 'none',
          padding: '0.5rem 1rem',
          borderRadius: '6px',
          transition: 'background-color 0.3s'
        }}>Coverage</Link>
        {user ? (
          <>
            <Link to="/booking" style={{
              color: 'white',
              textDecoration: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              transition: 'background-color 0.3s'
            }}>Book Ride</Link>
            <Link to="/rides-history" style={{
              color: 'white',
              textDecoration: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              transition: 'background-color 0.3s'
            }}>My Rides</Link>
            <span style={{
              color: '#f8f9fa',
              fontSize: '0.9rem',
              fontWeight: '500'
            }}>Welcome, {user.name}</span>
            <Link to="/profile" style={{
              width: '35px',
              height: '35px',
              backgroundColor: 'rgba(255,255,255,0.1)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none',
              border: '1px solid rgba(255,255,255,0.2)',
              transition: 'all 0.3s',
              backdropFilter: 'blur(10px)'
            }}>
              <div style={{
                width: '20px',
                height: '20px',
                backgroundColor: 'white',
                borderRadius: '50%',
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '3px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '8px',
                  height: '8px',
                  backgroundColor: 'black',
                  borderRadius: '50%'
                }}></div>
                <div style={{
                  position: 'absolute',
                  bottom: '2px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '12px',
                  height: '8px',
                  backgroundColor: 'black',
                  borderRadius: '6px 6px 0 0'
                }}></div>
              </div>
            </Link>
            <button onClick={handleLogout} className="shine-effect" style={{
              padding: '0.7rem 1.5rem',
              backgroundColor: 'white',
              color: 'black',
              border: 'none',
              borderRadius: '25px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s',
              fontSize: '0.9rem'
            }}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{
              color: 'white',
              textDecoration: 'none',
              padding: '0.7rem 1.5rem',
              border: '2px solid white',
              borderRadius: '25px',
              fontWeight: '600',
              transition: 'all 0.3s',
              fontSize: '0.9rem'
            }}>Login</Link>
            <Link to="/signup" className="shine-effect" style={{
              color: 'black',
              textDecoration: 'none',
              padding: '0.7rem 1.5rem',
              backgroundColor: 'white',
              borderRadius: '25px',
              fontWeight: '600',
              transition: 'all 0.3s',
              fontSize: '0.9rem',
              display: 'inline-block'
            }}>Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;