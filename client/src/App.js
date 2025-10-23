import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { RidesProvider } from './context/RidesContext';
import { ThemeProvider } from './context/ThemeContext';
import { NotificationProvider } from './context/NotificationContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import EmailVerificationPage from './pages/EmailVerificationPage';
import BookingPage from './pages/BookingPage';
import ConfirmationPage from './pages/ConfirmationPage';
import RidesHistoryPage from './pages/RidesHistoryPage';
import Dashboard from './pages/Dashboard';
import MapsPage from './pages/MapsPage';
import ProfilePage from './pages/ProfilePage';
import './App.css';

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <RidesProvider>
          <NotificationProvider>
            <Router>
              <div className="App">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignupPage />} />
                  <Route path="/verify-email" element={<EmailVerificationPage />} />
                  <Route path="/coverage" element={<MapsPage />} />
                  <Route path="/booking" element={
                    <ProtectedRoute>
                      <BookingPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/confirmation" element={
                    <ProtectedRoute>
                      <ConfirmationPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/rides-history" element={
                    <ProtectedRoute>
                      <RidesHistoryPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/dashboard" element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } />
                  <Route path="/profile" element={
                    <ProtectedRoute>
                      <ProfilePage />
                    </ProtectedRoute>
                  } />
                </Routes>
              </div>
            </Router>
          </NotificationProvider>
        </RidesProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
