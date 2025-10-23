import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import BookRide from './BookRide';

const RideHistory = () => {
  const [rides, setRides] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    const fetchRides = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/rides/my-rides', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setRides(response.data);
      } catch (error) {
        console.error('Failed to fetch rides:', error);
      }
    };
    fetchRides();
  }, [token]);

  return (
    <div style={{ marginTop: '30px', padding: '20px', border: '1px solid #ddd', borderRadius: '5px' }}>
      <h3>Ride History</h3>
      {rides.length === 0 ? (
        <p>No rides booked yet.</p>
      ) : (
        rides.map(ride => (
          <div key={ride._id} style={{ padding: '10px', border: '1px solid #eee', margin: '10px 0' }}>
            <p><strong>From:</strong> {ride.pickup.address}</p>
            <p><strong>To:</strong> {ride.destination.address}</p>
            <p><strong>Vehicle:</strong> {ride.vehicleType} | <strong>Fare:</strong> ${ride.fare}</p>
            <p><strong>Status:</strong> {ride.status}</p>
          </div>
        ))
      )}
    </div>
  );
};

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div style={{ maxWidth: '800px', margin: '50px auto', padding: '20px' }}>
      <div className={isLoaded ? 'slide-left' : ''} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Welcome, {user?.name}!</h2>
        <button onClick={logout} style={{ padding: '10px 20px', backgroundColor: '#dc3545', color: 'white', border: 'none' }}>
          Logout
        </button>
      </div>
      <div className={isLoaded ? 'slide-up' : ''} style={{ animationDelay: '0.2s' }}>
        <BookRide />
      </div>
      <div className={isLoaded ? 'fade-scale' : ''} style={{ animationDelay: '0.4s' }}>
        <RideHistory />
      </div>
    </div>
  );
};

export default Dashboard;