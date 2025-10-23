import React from 'react';

const RideCard = ({ ride }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#28a745';
      case 'in-progress': return '#007bff';
      case 'cancelled': return '#dc3545';
      default: return '#ffc107';
    }
  };

  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '1rem',
      marginBottom: '1rem',
      backgroundColor: 'white'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <p style={{ margin: '0 0 0.5rem 0', fontWeight: 'bold' }}>
            {ride.pickup.address} → {ride.destination.address}
          </p>
          <p style={{ margin: '0 0 0.5rem 0', color: '#666', fontSize: '14px' }}>
            {formatDate(ride.createdAt)}
          </p>
          <p style={{ margin: '0', fontSize: '14px' }}>
            <span style={{ textTransform: 'capitalize' }}>{ride.vehicleType}</span> • 
            <span style={{ fontWeight: 'bold' }}> ${ride.fare}</span>
          </p>
        </div>
        <span style={{
          padding: '0.25rem 0.5rem',
          borderRadius: '4px',
          fontSize: '12px',
          fontWeight: 'bold',
          color: 'white',
          backgroundColor: getStatusColor(ride.status),
          textTransform: 'capitalize'
        }}>
          {ride.status}
        </span>
      </div>
    </div>
  );
};

export default RideCard;