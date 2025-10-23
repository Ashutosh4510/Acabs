import React, { useEffect, useRef, useState } from 'react';

const LeafletMap = ({ locations, selectedCity, onLocationSelect }) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markersRef = useRef([]);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    initializeMap();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initializeMap = () => {
    // Check if already loaded
    if (window.L && mapRef.current && !mapInstance.current) {
      createMap();
      return;
    }

    // Load Leaflet CSS
    if (!document.querySelector('link[href*="leaflet"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }

    // Load Leaflet JS
    if (!window.L) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.onload = () => {
        setTimeout(createMap, 100); // Small delay to ensure DOM is ready
      };
      script.onerror = () => {
        console.error('Failed to load Leaflet');
      };
      document.head.appendChild(script);
    }
  };

  const createMap = () => {
    if (!mapRef.current || mapInstance.current) return;

    try {
      // Create map
      mapInstance.current = window.L.map(mapRef.current, {
        center: [40.7128, -74.0060],
        zoom: 2,
        zoomControl: true
      });

      // Add tile layer
      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 18
      }).addTo(mapInstance.current);

      setMapReady(true);
      updateMarkers();
    } catch (error) {
      console.error('Error creating map:', error);
    }
  };

  const updateMarkers = () => {
    if (!mapInstance.current || !window.L || !mapReady) return;

    try {
      // Clear existing markers
      markersRef.current.forEach(marker => {
        mapInstance.current.removeLayer(marker);
      });
      markersRef.current = [];

      // Add new markers
      locations.forEach(location => {
        const marker = window.L.marker([location.lat, location.lng])
          .addTo(mapInstance.current)
          .bindPopup(`
            <div style="text-align: center; padding: 5px;">
              <strong>${location.city}</strong><br>
              ${location.country}<br>
              <small>${location.rides} rides</small>
            </div>
          `)
          .on('click', () => onLocationSelect(location));

        markersRef.current.push(marker);
      });

      // Fit bounds to show all markers
      if (locations.length > 0 && markersRef.current.length > 0) {
        const group = new window.L.featureGroup(markersRef.current);
        mapInstance.current.fitBounds(group.getBounds(), { 
          padding: [20, 20],
          maxZoom: 10 
        });
      }
    } catch (error) {
      console.error('Error updating markers:', error);
    }
  };

  // Update markers when locations change
  useEffect(() => {
    if (mapReady) {
      updateMarkers();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locations, mapReady]);

  // Zoom to selected city
  useEffect(() => {
    if (selectedCity && mapInstance.current && mapReady) {
      try {
        mapInstance.current.setView([selectedCity.lat, selectedCity.lng], 10);
        
        // Find and open popup for selected city
        const selectedMarker = markersRef.current.find(marker => {
          const pos = marker.getLatLng();
          return Math.abs(pos.lat - selectedCity.lat) < 0.001 && 
                 Math.abs(pos.lng - selectedCity.lng) < 0.001;
        });
        
        if (selectedMarker) {
          selectedMarker.openPopup();
        }
      } catch (error) {
        console.error('Error zooming to city:', error);
      }
    }
  }, [selectedCity, mapReady]);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      {!mapReady && (
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
      <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default LeafletMap;