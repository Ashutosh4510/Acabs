import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const BookRide = () => {
  const [formData, setFormData] = useState({
    pickup: { address: '', lat: 0, lng: 0 },
    destination: { address: '', lat: 0, lng: 0 },
    vehicleType: 'economy'
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { token } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/rides/book`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage('Ride booked successfully!');
      setFormData({
        pickup: { address: '', lat: 0, lng: 0 },
        destination: { address: '', lat: 0, lng: 0 },
        vehicleType: 'economy'
      });
    } catch (error) {
      setMessage(error.response?.data?.message || 'Booking failed');
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: '500px', margin: '20px auto', padding: '20px' }}>
      <h3>Book a Ride</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Pickup Address"
          value={formData.pickup.address}
          onChange={(e) => setFormData({
            ...formData,
            pickup: { ...formData.pickup, address: e.target.value, lat: Math.random() * 90, lng: Math.random() * 180 }
          })}
          required
          style={{ width: '100%', padding: '10px', margin: '10px 0' }}
        />
        <input
          type="text"
          placeholder="Destination Address"
          value={formData.destination.address}
          onChange={(e) => setFormData({
            ...formData,
            destination: { ...formData.destination, address: e.target.value, lat: Math.random() * 90, lng: Math.random() * 180 }
          })}
          required
          style={{ width: '100%', padding: '10px', margin: '10px 0' }}
        />
        <select
          value={formData.vehicleType}
          onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
          style={{ width: '100%', padding: '10px', margin: '10px 0' }}
        >
          <option value="economy">Economy</option>
          <option value="premium">Premium</option>
          <option value="luxury">Luxury</option>
        </select>
        <button
          type="submit"
          disabled={loading}
          style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none' }}
        >
          {loading ? 'Booking...' : 'Book Ride'}
        </button>
      </form>
      {message && <p style={{ color: message.includes('success') ? 'green' : 'red' }}>{message}</p>}
    </div>
  );
};

export default BookRide;