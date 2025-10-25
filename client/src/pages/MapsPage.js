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
      <div style={{
        background: 'linear-gradient(135deg, #000 0%, #1a1a1a 100%)',
        color: 'white',
        padding: '6rem 2rem 4rem',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 className={isLoaded ? 'slide-left' : ''} style={{
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            fontWeight: '900',
            marginBottom: '1.5rem',
            letterSpacing: '-2px'
          }}>
            Service Coverage
          </h1>
          <p className={isLoaded ? 'slide-right' : ''} style={{
            fontSize: '1.3rem',
            opacity: 0.8,
            maxWidth: '600px',
            margin: '0 auto 2rem'
          }}>
            Discover where our premium cab services are available worldwide
          </p>
          
          {/* Search Bar */}
          <div className={isLoaded ? 'slide-up' : ''} style={{
            maxWidth: '500px',
            margin: '0 auto',
            position: 'relative'
          }}>
            <input
              type="text"
              placeholder="Search cities or countries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '1rem 1.5rem',
                fontSize: '1.1rem',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '50px',
                backgroundColor: 'rgba(255,255,255,0.1)',
                color: 'white',
                outline: 'none'
              }}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        flex: 1,
        background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
        padding: '4rem 2rem'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 400px',
            gap: '3rem',
            alignItems: 'start'
          }}>
            
            {/* Map Container */}
            <div className={isLoaded ? 'slide-left' : ''} style={{
              backgroundColor: 'white',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              border: '1px solid rgba(0,0,0,0.1)',
              height: '600px',
              position: 'relative'
            }}>
              <LeafletMap 
                locations={displayLocations}
                selectedCity={selectedCity}
                onLocationSelect={handlePlaceSelect}
              />
            </div>
            
            {/* Cities List */}
            <div className={isLoaded ? 'slide-right' : ''} style={{
              backgroundColor: 'white',
              borderRadius: '20px',
              padding: '2rem',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              border: '1px solid rgba(0,0,0,0.1)',
              height: '600px',
              overflowY: 'auto'
            }}>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                marginBottom: '1.5rem',
                color: '#000'
              }}>
                {searchQuery ? `Search Results (${displayLocations.length})` : 'Available Cities (5)'}
              </h3>
              
              {isSearching && (
                <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
                  <div style={{
                    width: '30px',
                    height: '30px',
                    border: '3px solid #f3f3f3',
                    borderTop: '3px solid #000',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                    margin: '0 auto 1rem'
                  }}></div>
                  Searching places...
                </div>
              )}
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {displayLocations.map((location) => (
                  <div
                    key={location.id}
                    onClick={() => handlePlaceSelect(location)}
                    style={{
                      padding: '1rem',
                      border: selectedCity?.id === location.id ? '2px solid #000' : '1px solid rgba(0,0,0,0.1)',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      backgroundColor: selectedCity?.id === location.id ? 'rgba(0,0,0,0.05)' : 'transparent'
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '0.5rem'
                    }}>
                      <div style={{
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        color: '#000'
                      }}>
                        {location.city}
                      </div>
                      <div style={{
                        width: '8px',
                        height: '8px',
                        backgroundColor: location.active ? '#28a745' : '#ffc107',
                        borderRadius: '50%'
                      }}></div>
                    </div>
                    <div style={{
                      fontSize: '0.9rem',
                      color: '#666',
                      marginBottom: '0.3rem'
                    }}>
                      {location.country}
                    </div>
                    <div style={{
                      fontSize: '0.8rem',
                      color: '#999'
                    }}>
                      {location.rides} rides completed
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Stats Section */}
          <div style={{
            marginTop: '4rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem'
          }}>
            {[
              { label: 'Places Found', value: displayLocations.length },
              { label: 'Search Results', value: searchQuery ? displayLocations.length : 0 },
              { label: 'Active Services', value: displayLocations.filter(l => l.active).length },
              { label: 'Total Rides', value: '50K+' }
            ].map((stat, index) => (
              <div key={index} className={isLoaded ? 'fade-scale' : ''} style={{
                backgroundColor: 'white',
                padding: '2rem',
                borderRadius: '15px',
                textAlign: 'center',
                boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                border: '1px solid rgba(0,0,0,0.1)',
                animationDelay: `${1 + index * 0.1}s`
              }}>
                <div style={{
                  fontSize: '2.5rem',
                  fontWeight: '900',
                  color: '#000',
                  marginBottom: '0.5rem'
                }}>
                  {stat.value}
                </div>
                <div style={{
                  fontSize: '1rem',
                  color: '#666',
                  fontWeight: '500'
                }}>
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