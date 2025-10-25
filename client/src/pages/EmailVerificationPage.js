import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar/Navbar';
import '../styles/responsive.css';
import '../styles/animations.css';

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
    <div className="verification-page">
      <Navbar />
      <div className="verification-container">
        <div className={`verification-card ${isLoaded ? 'slide-up' : ''}`}>
          {status === 'verifying' && (
            <>
              <div className="verification-icon spinner"></div>
              <h2 className="verification-title">Verifying Your Email</h2>
              <p className="verification-text">Please wait while we verify your email address...</p>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="verification-icon success">✓</div>
              <h2 className="verification-title">Email Verified!</h2>
              <p className="verification-text">{message}</p>
              <p className="redirect-text">Redirecting to login page in 3 seconds...</p>
              <button
                onClick={() => navigate('/login')}
                className="verification-btn primary"
              >
                Go to Login
              </button>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="verification-icon error">✕</div>
              <h2 className="verification-title">Verification Failed</h2>
              <p className="verification-text">{message}</p>
              <div className="button-group">
                <button
                  onClick={() => navigate('/signup')}
                  className="verification-btn primary"
                >
                  Sign Up Again
                </button>
                <button
                  onClick={() => navigate('/login')}
                  className="verification-btn secondary"
                >
                  Go to Login
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationPage;
