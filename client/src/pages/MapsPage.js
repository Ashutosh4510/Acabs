import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import Chatbot from '../components/Chatbot/Chatbot';
import LeafletMap from '../components/LeafletMap/LeafletMap';
import './MapsPage.css';
import '../styles/animations.css';

const MapsPage = () => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const searchPlaces = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      setSelectedCity(null);
      return;
    }

    setIsSearching(true);
    
    try {
      // Use Nominatim API for real place search
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=10&addressdetails=1`
      );
      const data = await response.json();
      
      const results = data.map((place, index) => ({
        id: index + 1,
        place_id: place.place_id,
        city: place.display_name.split(',')[0],
        country: place.address?.country || 'Unknown',
        lat: parseFloat(place.lat),
        lng: parseFloat(place.lon),
        description: place.display_name,
        active: true,
        rides: `${Math.floor(Math.random() * 20) + 1}K+`
      }));
      
      setSearchResults(results);
      
      // Auto-select first result for immediate map focus
      if (results.length > 0) {
        setSelectedCity(results[0]);
      }
      
    } catch (error) {
      console.error('Search failed:', error);
      setSearchResults([]);
    }
    
    setIsSearching(false);
  };

  const handlePlaceSelect = (place) => {
    setSelectedCity(place);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchPlaces(searchQuery);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // Default locations to show when no search
  const defaultLocations = [
    { id: 1, city: 'New York', country: 'USA', lat: 40.7128, lng: -74.0060, active: true, rides: '15K+' },
    { id: 2, city: 'Los Angeles', country: 'USA', lat: 34.0522, lng: -118.2437, active: true, rides: '12K+' },
    { id: 3, city: 'London', country: 'UK', lat: 51.5074, lng: -0.1278, active: true, rides: '8K+' },
    { id: 4, city: 'Paris', country: 'France', lat: 48.8566, lng: 2.3522, active: true, rides: '6K+' },
    { id: 5, city: 'Tokyo', country: 'Japan', lat: 35.6762, lng: 139.6503, active: true, rides: '10K+' }
  ];
  
  const displayLocations = searchQuery ? searchResults : defaultLocations;

  return (
    <div className="maps-page">
      <Navbar />
      
      {/* Header Section */}
      <div className="maps-header">
        <div className="maps-container">
          <h1 className="maps-title">
            Service Coverage
          </h1>
          <p className="maps-subtitle">
            Discover where our premium cab services are available worldwide
          </p>
          
          {/* Search Bar */}
          <div className="maps-search">
            <input
              type="text"
              placeholder="Search cities or countries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="maps-content">
        <div>
          <div className="maps-grid">
            
            {/* Map Container */}
            <div className="map-container">
              <LeafletMap 
                locations={displayLocations}
                selectedCity={selectedCity}
                onLocationSelect={handlePlaceSelect}
              />
            </div>
            
            {/* Cities List */}
            <div className="cities-panel">
              <h3 className="cities-title">
                {searchQuery ? `Search Results (${displayLocations.length})` : 'Available Cities (5)'}
              </h3>
              
              {isSearching && (
                <div className="search-loading">
                  <div className="loading-spinner"></div>
                  Searching places...
                </div>
              )}
              
              <div className="cities-list">
                {displayLocations.map((location) => (
                  <div
                    key={location.id}
                    onClick={() => handlePlaceSelect(location)}
                    className={`city-item ${selectedCity?.id === location.id ? 'selected' : ''}`}
                  >
                    <div className="city-header">
                      <div className="city-name">
                        {location.city}
                      </div>
                      <div className={`city-status ${location.active ? 'active' : 'inactive'}`}></div>
                    </div>
                    <div className="city-country">
                      {location.country}
                    </div>
                    <div className="city-rides">
                      {location.rides} rides completed
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Stats Section */}
          <div className="maps-stats">
            {[
              { label: 'Places Found', value: displayLocations.length },
              { label: 'Search Results', value: searchQuery ? displayLocations.length : 0 },
              { label: 'Active Services', value: displayLocations.filter(l => l.active).length },
              { label: 'Total Rides', value: '50K+' }
            ].map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-value">
                  {stat.value}
                </div>
                <div className="stat-label">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <Footer />
      <Chatbot />
    </div>
  );
};

export default MapsPage;