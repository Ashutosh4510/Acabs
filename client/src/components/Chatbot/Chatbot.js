import React from 'react';

const Chatbot = () => {
  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      width: '60px',
      height: '60px',
      backgroundColor: 'white',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
      cursor: 'pointer',
      zIndex: 1000
    }}>
      <span style={{ fontSize: '24px' }}>💬</span>
    </div>
  );
};

export default Chatbot;