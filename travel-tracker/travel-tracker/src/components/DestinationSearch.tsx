import { useState, useEffect } from 'react';
import type { Location } from '../types';
import { geocodeLocation } from '../utils/geolocation';
import { getAllCountries } from '../services/vaccinationService';

interface DestinationSearchProps {
  onDestinationSelect: (location: Location) => void;
  disabled?: boolean;
}

export const DestinationSearch = ({ onDestinationSelect, disabled }: DestinationSearchProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (searchQuery.length > 1) {
      const countries = getAllCountries();
      const filtered = countries.filter(country =>
        country.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  const handleSearch = async (destination: string) => {
    setIsLoading(true);
    try {
      const location = await geocodeLocation(destination);
      if (location) {
        onDestinationSelect(location);
        setSearchQuery(destination);
        setShowSuggestions(false);
      } else {
        alert('Location not found. Please try again.');
      }
    } catch (error) {
      console.error('Error searching for destination:', error);
      alert('Error searching for destination. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      handleSearch(searchQuery);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSearch(suggestion);
  };

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px' }}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter destination (e.g., Thailand, Brazil)"
          disabled={disabled || isLoading}
          style={{
            flex: 1,
            padding: '12px',
            fontSize: '16px',
            border: '2px solid #ddd',
            borderRadius: '8px',
            outline: 'none',
          }}
          onFocus={() => setShowSuggestions(true)}
        />
        <button
          type="submit"
          disabled={disabled || isLoading || !searchQuery.trim()}
          style={{
            padding: '12px 24px',
            fontSize: '16px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: disabled || isLoading || !searchQuery.trim() ? 'not-allowed' : 'pointer',
            opacity: disabled || isLoading || !searchQuery.trim() ? 0.6 : 1,
            transform: 'scale(1)',
            transition: 'transform 0.15s ease, box-shadow 0.15s ease',
          }}
          onMouseEnter={(e) => {
            if (disabled || isLoading || !searchQuery.trim()) return;
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            backgroundColor: 'white',
            border: '2px solid #ddd',
            borderTop: 'none',
            borderRadius: '0 0 8px 8px',
            maxHeight: '200px',
            overflowY: 'auto',
            zIndex: 1000,
            marginTop: '-8px',
          }}
        >
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              style={{
                padding: '12px',
                cursor: 'pointer',
                borderBottom: index < suggestions.length - 1 ? '1px solid #eee' : 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f5f5f5';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
              }}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
