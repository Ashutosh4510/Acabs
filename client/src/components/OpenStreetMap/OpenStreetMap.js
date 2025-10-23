import React, { useEffect, useRef, useState } from 'react';

const OpenStreetMap = ({ locations, selectedCity, onLocationSelect }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    loadMap();
  }, []);

  const loadMap = async () => {
    try {
      // Load Leaflet CSS
      if (!document.querySelector('link[href*="leaflet"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(link);
      }

      // Load Leaflet JS
      if (!window.L) {
        await new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
          script.onload = resolve;
          script.onerror = reject;
          document.head.appendChild(script);
        });
      }
      
      initializeMap();
    } catch (err) {
      console.error('Failed to load map:', err);
      setError(true);
    }
  };

  const initializeMap = () => {
    if (mapInstanceRef.current || !mapRef.current) return;

    try {
      const map = window.L.map(mapRef.current).setView([40.7128, -74.0060], 2);
      
      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      mapInstanceRef.current = map;
      setMapLoaded(true);
      updateMarkers();
    } catch (err) {
      console.error('Failed to initialize map:', err);
      setError(true);
    }
  };

  const updateMarkers = () => {
    if (!mapInstanceRef.current || !window.L || !locations) return;

    try {
      // Clear existing markers
      markersRef.current.forEach(marker => {
        mapInstanceRef.current.removeLayer(marker);
      });
      markersRef.current = [];

      // Add new markers
      locations.forEach(location => {
        const marker = window.L.marker([location.lat, location.lng])
          .addTo(mapInstanceRef.current)
          .bindPopup(`
            <div style="text-align: center; padding: 0.5rem;">
              <h4 style="margin: 0 0 0.5rem 0; color: #000;">${location.city}</h4>
              <p style="margin: 0; color: #666;">${location.country}</p>
              <p style="margin: 0.5rem 0 0 0; color: #000; font-weight: bold;">${location.rides} rides</p>
            </div>
          `)
          .on('click', () => onLocationSelect(location));

        markersRef.current.push(marker);
      });

      // Fit map to show all markers
      if (locations.length > 0) {
        const group = new window.L.featureGroup(markersRef.current);
        mapInstanceRef.current.fitBounds(group.getBounds().pad(0.1));
      }
    } catch (err) {
      console.error('Failed to update markers:', err);
    }
  };

  useEffect(() => {
    if (mapLoaded) {
      updateMarkers();
    }
  }, [locations, mapLoaded]);

  useEffect(() => {
    if (selectedCity && mapInstanceRef.current && window.L) {
      try {
        mapInstanceRef.current.setView([selectedCity.lat, selectedCity.lng], 10);
      } catch (err) {
        console.error('Failed to set map view:', err);
      }
    }
  }, [selectedCity]);

  if (error) {
    return (
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8f9fa',
        color: '#666',
        fontSize: '1rem'
      }}>
        Map temporarily unavailable
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      {!mapLoaded && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          color: '#666'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '3px solid #f3f3f3',
            borderTop: '3px solid #000',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem'
          }}></div>
          Loading map...
        </div>
      )}
      <div 
        ref={mapRef} 
        style={{ 
          width: '100%', 
          height: '100%',
          borderRadius: '20px',
          overflow: 'hidden'
        }} 
      />
    </div>
  );
};

export default OpenStreetMap;