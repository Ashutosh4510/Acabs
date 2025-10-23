import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar/Navbar';

const EmailVerificationPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('verifying'); // verifying, success, error
  const [message, setMessage] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    const token = searchParams.get('token');

    if (!token) {
      setStatus('error');
      setMessage('Verification token is missing from the URL.');
      return;
    }

    // Verify the email
    const verifyEmail = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/auth/verify-email?token=${token}`);
        setStatus('success');
        setMessage(response.data.message);
        // Redirect to login after 3 seconds
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } catch (error) {
        setStatus('error');
        setMessage(error.response?.data?.message || 'Verification failed. The link may be expired or invalid.');
      }
    };

    verifyEmail();
  }, [searchParams, navigate]);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <Navbar />
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 80px)',
        padding: '2rem'
      }}>
        <div className={isLoaded ? 'slide-up' : ''} style={{
          maxWidth: '500px',
          width: '100%',
          backgroundColor: 'white',
          borderRadius: '20px',
          padding: '3rem',
          textAlign: 'center',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
        }}>
          {status === 'verifying' && (
            <>
              <div style={{
                width: '60px',
                height: '60px',
                border: '4px solid #f3f3f3',
                borderTop: '4px solid #000',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                margin: '0 auto 2rem'
              }}></div>
              <h2 style={{ color: '#000', marginBottom: '1rem' }}>Verifying Your Email</h2>
              <p style={{ color: '#666' }}>Please wait while we verify your email address...</p>
            </>
          )}

          {status === 'success' && (
            <>
              <div style={{
                width: '60px',
                height: '60px',
                backgroundColor: '#4CAF50',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 2rem',
                fontSize: '30px',
                color: 'white'
              }}>✓</div>
              <h2 style={{ color: '#000', marginBottom: '1rem' }}>Email Verified!</h2>
              <p style={{ color: '#666', marginBottom: '2rem' }}>{message}</p>
              <p style={{ color: '#666', fontSize: '0.9rem' }}>Redirecting to login page in 3 seconds...</p>
              <button
                onClick={() => navigate('/login')}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#000',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  cursor: 'pointer',
                  marginTop: '1rem'
                }}
              >
                Go to Login
              </button>
            </>
          )}

          {status === 'error' && (
            <>
              <div style={{
                width: '60px',
                height: '60px',
                backgroundColor: '#f44336',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 2rem',
                fontSize: '30px',
                color: 'white'
              }}>✕</div>
              <h2 style={{ color: '#000', marginBottom: '1rem' }}>Verification Failed</h2>
              <p style={{ color: '#666', marginBottom: '2rem' }}>{message}</p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <button
                  onClick={() => navigate('/signup')}
                  style={{
                    padding: '12px 24px',
                    backgroundColor: '#000',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '16px',
                    cursor: 'pointer'
                  }}
                >
                  Sign Up Again
                </button>
                <button
                  onClick={() => navigate('/login')}
                  style={{
                    padding: '12px 24px',
                    backgroundColor: 'transparent',
                    color: '#000',
                    border: '2px solid #000',
                    borderRadius: '8px',
                    fontSize: '16px',
                    cursor: 'pointer'
                  }}
                >
                  Go to Login
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default EmailVerificationPage;
