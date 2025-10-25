import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo" onClick={closeMenu}>
        <div className="logo-icon">
          <div className="car-icon">
            <div className="car-window"></div>
            <div className="car-wheel-left"></div>
            <div className="car-wheel-right"></div>
          </div>
        </div>
        <span className="logo-text">ACABS</span>
      </Link>
      
      <button className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </button>
      
      <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
        <Link to="/" className="nav-link" onClick={closeMenu}>Home</Link>
        <Link to="/coverage" className="nav-link" onClick={closeMenu}>Coverage</Link>
        {user ? (
          <>
            <Link to="/booking" className="nav-link" onClick={closeMenu}>Book Ride</Link>
            <Link to="/rides-history" className="nav-link" onClick={closeMenu}>My Rides</Link>
            <span className="welcome-text">Welcome, {user.name}</span>
            <Link to="/profile" className="profile-link" onClick={closeMenu}>
              <div className="profile-icon">
                <div className="profile-head"></div>
                <div className="profile-body"></div>
              </div>
            </Link>
            <button onClick={handleLogout} className="btn-logout shine-effect">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn-login" onClick={closeMenu}>Login</Link>
            <Link to="/signup" className="btn-signup shine-effect" onClick={closeMenu}>Sign Up</Link>
          </>
        )}
      </div>
      
      {isMenuOpen && <div className="navbar-overlay" onClick={closeMenu}></div>}
    </nav>
  );
};

export default Navbar;