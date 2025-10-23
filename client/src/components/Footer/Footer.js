import React from 'react';

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: '#000000',
      color: 'white',
      textAlign: 'center',
      padding: '3rem 0',
      marginTop: 'auto',
      borderTop: '1px solid #333'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ marginBottom: '2rem' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '0.5rem'
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
              backdropFilter: 'blur(10px)',
              marginRight: '0.5rem'
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
              letterSpacing: '2px',
              fontSize: '1.4rem',
              color: 'white'
            }}>ACABS</span>
          </div>
          <p style={{
            margin: 0,
            color: '#ccc',
            fontSize: '1.1rem'
          }}>
            Your premium ride booking experience
          </p>
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '3rem',
          flexWrap: 'wrap',
          marginBottom: '2rem'
        }}>
          <button onClick={() => {}} style={{
            color: '#ccc',
            background: 'none',
            border: 'none',
            fontWeight: '500',
            transition: 'color 0.3s',
            cursor: 'pointer'
          }}>About Us</button>
          <button onClick={() => {}} style={{
            color: '#ccc',
            background: 'none',
            border: 'none',
            fontWeight: '500',
            transition: 'color 0.3s',
            cursor: 'pointer'
          }}>Contact</button>
          <button onClick={() => {}} style={{
            color: '#ccc',
            background: 'none',
            border: 'none',
            fontWeight: '500',
            transition: 'color 0.3s',
            cursor: 'pointer'
          }}>Privacy Policy</button>
          <button onClick={() => {}} style={{
            color: '#ccc',
            background: 'none',
            border: 'none',
            fontWeight: '500',
            transition: 'color 0.3s',
            cursor: 'pointer'
          }}>Terms of Service</button>
        </div>
        <div style={{
          borderTop: '1px solid #888',
          paddingTop: '1.5rem',
          marginTop: '2rem'
        }}>
          <p style={{
            margin: 0,
            fontSize: '0.9rem',
            color: '#888',
            fontWeight: '400'
          }}>
            © 2024 ACABS. All rights reserved. | Made with ❤️ for better transportation
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
