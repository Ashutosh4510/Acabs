import React from 'react';

const MapComponent = ({ pickup, destination }) => {
  return (
    <div style={{
      width: '100%',
      height: '350px',
      backgroundColor: '#fafafa',
      border: '2px solid #f0f0f0',
      borderRadius: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      marginBottom: '2rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(45deg, #f0f0f0 25%, transparent 25%), linear-gradient(-45deg, #f0f0f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f0f0f0 75%), linear-gradient(-45deg, transparent 75%, #f0f0f0 75%)',
        backgroundSize: '20px 20px',
        backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
        opacity: 0.3
      }}></div>
      <div style={{ textAlign: 'center', color: '#666', position: 'relative', zIndex: 1 }}>
        <h4 style={{ 
          fontSize: '1.5rem', 
          fontWeight: '700', 
          marginBottom: '1rem',
          color: '#000'
        }}>Route Preview</h4>
        <div style={{ 
          backgroundColor: 'white', 
          padding: '1.5rem', 
          borderRadius: '12px', 
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          marginBottom: '1rem',
          border: '1px solid #f0f0f0'
        }}>
          <p style={{ 
            margin: '0 0 0.75rem 0', 
            fontSize: '1rem',
            color: '#000',
            fontWeight: '600'
          }}>
            📍 <strong>From:</strong> {pickup}
          </p>
          <div style={{ 
            height: '2px', 
            background: 'linear-gradient(to right, #000, #ccc)',
            margin: '0.75rem 0',
            borderRadius: '1px'
          }}></div>
          <p style={{ 
            margin: 0, 
            fontSize: '1rem',
            color: '#000',
            fontWeight: '600'
          }}>
            🏁 <strong>To:</strong> {destination}
          </p>
        </div>
        <p style={{ 
          fontSize: '0.9rem', 
          marginTop: '1rem',
          color: '#888',
          fontStyle: 'italic'
        }}>
          🗺️ Interactive map integration coming soon<br/>
          <span style={{ fontSize: '0.8rem' }}>(Google Maps / Leaflet)</span>
        </p>
      </div>
    </div>
  );
};

export default MapComponent;