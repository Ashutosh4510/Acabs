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
      <div className="verification-container">
        <div className={`verification-card ${isLoaded ? 'slide-up' : ''}`}>
          {status === 'verifying' && (
            <>
              <div className="spinner"></div>
              <h2 className="verification-title">Verifying Your Email</h2>
              <p className="verification-text">Please wait while we verify your email address...</p>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="success-icon">✓</div>
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
              <div className="error-icon">✕</div>
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

      <style>
        {`
          .verification-container {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: calc(100vh - 80px);
            padding: 2rem;
          }

          .verification-card {
            max-width: 500px;
            width: 100%;
            background-color: white;
            border-radius: 20px;
            padding: 3rem;
            text-align: center;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
          }

          .spinner {
            width: 60px;
            height: 60px;
            border: 4px solid #f3f3f3;
            border-top: 4px solid #000;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 2rem;
          }

          .success-icon {
            width: 60px;
            height: 60px;
            background-color: #4CAF50;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 2rem;
            font-size: 30px;
            color: white;
            animation: bounceIn 0.6s ease-out;
          }

          .error-icon {
            width: 60px;
            height: 60px;
            background-color: #f44336;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 2rem;
            font-size: 30px;
            color: white;
            animation: shakeIn 0.6s ease-out;
          }

          .verification-title {
            color: #000;
            margin-bottom: 1rem;
            font-size: 1.5rem;
          }

          .verification-text {
            color: #666;
            margin-bottom: 2rem;
            line-height: 1.5;
          }

          .redirect-text {
            color: #666;
            font-size: 0.9rem;
            margin-bottom: 1rem;
          }

          .button-group {
            display: flex;
            gap: 1rem;
            justify-content: center;
            flex-wrap: wrap;
          }

          .verification-btn {
            padding: 12px 24px;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            text-decoration: none;
            display: inline-block;
            min-width: 120px;
          }

          .verification-btn.primary {
            background-color: #000;
            color: white;
          }

          .verification-btn.primary:hover {
            background-color: #333;
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
          }

          .verification-btn.secondary {
            background-color: transparent;
            color: #000;
            border: 2px solid #000;
          }

          .verification-btn.secondary:hover {
            background-color: #000;
            color: white;
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          @keyframes bounceIn {
            0% {
              transform: scale(0.3);
              opacity: 0;
            }
            50% {
              transform: scale(1.05);
            }
            70% {
              transform: scale(0.9);
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }

          @keyframes shakeIn {
            0% {
              transform: scale(0.3) rotate(0deg);
              opacity: 0;
            }
            25% {
              transform: scale(1.05) rotate(-5deg);
            }
            50% {
              transform: scale(0.95) rotate(5deg);
            }
            75% {
              transform: scale(1.02) rotate(-2deg);
            }
            100% {
              transform: scale(1) rotate(0deg);
              opacity: 1;
            }
          }

          /* Mobile Responsive */
          @media (max-width: 768px) {
            .verification-container {
              padding: 1rem;
              min-height: calc(100vh - 70px);
            }

            .verification-card {
              padding: 2rem;
              border-radius: 15px;
              margin: 0 0.5rem;
            }

            .verification-title {
              font-size: 1.3rem;
            }

            .verification-text {
              font-size: 0.95rem;
            }

            .button-group {
              flex-direction: column;
              gap: 0.8rem;
            }

            .verification-btn {
              width: 100%;
              padding: 14px 20px;
              font-size: 15px;
            }
          }

          @media (max-width: 480px) {
            .verification-container {
              padding: 0.5rem;
            }

            .verification-card {
              padding: 1.5rem;
              border-radius: 12px;
            }

            .spinner,
            .success-icon,
            .error-icon {
              width: 50px;
              height: 50px;
              font-size: 24px;
            }

            .verification-title {
              font-size: 1.2rem;
            }

            .verification-text {
              font-size: 0.9rem;
              margin-bottom: 1.5rem;
            }
          }
        `}
      </style>
    </div>
  );
};

export default EmailVerificationPage;
