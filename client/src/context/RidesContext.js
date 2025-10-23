import React, { createContext, useContext, useState } from 'react';

const RidesContext = createContext();

export const useRides = () => {
  const context = useContext(RidesContext);
  if (!context) {
    throw new Error('useRides must be used within a RidesProvider');
  }
  return context;
};

export const RidesProvider = ({ children }) => {
  const [rides, setRides] = useState([
    { 
      _id: '1', 
      pickup: { address: 'Downtown Plaza' }, 
      destination: { address: 'Airport Terminal' }, 
      status: 'completed', 
      fare: 35, 
      date: '2024-01-15', 
      createdAt: '2024-01-15T10:30:00Z',
      vehicleType: 'premium', 
      duration: '25 min',
      distance: 12.5,
      driverName: 'John Smith',
      driverRating: 4.8,
      paymentMethod: 'Credit Card'
    },
    { 
      _id: '2', 
      pickup: { address: 'Home' }, 
      destination: { address: 'Office Complex' }, 
      status: 'in-progress', 
      fare: 18, 
      date: '2024-01-12', 
      createdAt: '2024-01-12T08:15:00Z',
      vehicleType: 'economy', 
      duration: '15 min',
      distance: 8.2,
      driverName: 'Sarah Johnson',
      driverRating: 4.9,
      paymentMethod: 'Digital Wallet'
    },
    { 
      _id: '3', 
      pickup: { address: 'Mall Center' }, 
      destination: { address: 'University' }, 
      status: 'requested', 
      fare: 15, 
      date: '2024-01-10', 
      createdAt: '2024-01-10T14:20:00Z',
      vehicleType: 'economy', 
      duration: '12 min',
      distance: 6.8,
      paymentMethod: 'Cash'
    },
    { 
      _id: '4', 
      pickup: { address: 'Hotel' }, 
      destination: { address: 'Conference Center' }, 
      status: 'completed', 
      fare: 22, 
      date: '2024-01-08', 
      createdAt: '2024-01-08T16:45:00Z',
      vehicleType: 'luxury', 
      duration: '18 min',
      distance: 9.3,
      driverName: 'Mike Wilson',
      driverRating: 4.7,
      paymentMethod: 'Credit Card'
    }
  ]);

  const addRide = (rideData) => {
    const newRide = {
      _id: Date.now().toString(),
      pickup: { address: rideData.pickup },
      destination: { address: rideData.destination },
      status: 'requested',
      fare: rideData.fare,
      date: new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString(),
      vehicleType: rideData.vehicleType,
      duration: rideData.duration || 'Calculating...',
      distance: Math.round((Math.random() * 15 + 3) * 10) / 10, // Random distance 3-18 km
      paymentMethod: 'Credit Card',
      estimatedArrival: new Date(Date.now() + (parseInt(rideData.duration) || 15) * 60000).toISOString()
    };
    setRides(prev => [newRide, ...prev]);
    return newRide;
  };

  const updateRideStatus = (rideId, status) => {
    setRides(prev => 
      prev.map(ride => 
        ride._id === rideId 
          ? { ...ride, status, fare: status === 'cancelled' ? 0 : ride.fare }
          : ride
      )
    );
  };

  return (
    <RidesContext.Provider value={{ rides, setRides, addRide, updateRideStatus }}>
      {children}
    </RidesContext.Provider>
  );
};