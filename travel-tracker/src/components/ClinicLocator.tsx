import { useState } from 'react';
import type { TravelClinic, Location } from '../types';
import { searchTravelHealthFacilities } from '../services/placesService';

interface ClinicLocatorProps {
  userLocation: Location | null;
}

export const ClinicLocator = ({ userLocation }: ClinicLocatorProps) => {
  const [searchRadius, setSearchRadius] = useState(10); // km
  const [clinics, setClinics] = useState<TravelClinic[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!userLocation) {
      alert('Unable to determine your location. Please enable location services.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Use comprehensive search for travel health facilities
      const results = await searchTravelHealthFacilities(userLocation, searchRadius);
      setClinics(results);
    } catch (err) {
      console.error('Error searching for clinics:', err);
      setError(err instanceof Error ? err.message : 'Failed to search for clinics');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}
    >
      <h2 style={{ marginTop: 0, color: '#333' }}>Find Travel Clinics Nearby</h2>

      <div style={{ marginBottom: '20px' }}>
        <div style={{ marginBottom: '12px' }}>
          <label
            style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '14px',
              fontWeight: 'bold',
            }}
          >
            Search Radius: {searchRadius} km
          </label>
          <input
            type="range"
            min="1"
            max="50"
            value={searchRadius}
            onChange={(e) => setSearchRadius(parseInt(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>

        {userLocation && (
          <p
            style={{
              fontSize: '14px',
              color: '#666',
              marginBottom: '12px',
            }}
          >
            📍 Searching near: {userLocation.name}, {userLocation.country}
          </p>
        )}

        <button
          onClick={handleSearch}
          disabled={isLoading || !userLocation}
          style={{
            padding: '12px 24px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: isLoading || !userLocation ? 'not-allowed' : 'pointer',
            opacity: isLoading || !userLocation ? 0.6 : 1,
            fontSize: '16px',
            width: '100%',
            transform: 'scale(1)',
            transition: 'transform 0.15s ease, box-shadow 0.15s ease',
          }}
          onMouseEnter={(e) => {
            if (isLoading || !userLocation) return;
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          {isLoading ? 'Searching...' : 'Find Clinics'}
        </button>
      </div>

      {clinics.length > 0 && (
        <div>
          <h3 style={{ color: '#1976d2', marginBottom: '16px' }}>
            Found {clinics.length} clinic{clinics.length !== 1 ? 's' : ''}
          </h3>
          {clinics.map((clinic) => (
            <div
              key={clinic.id}
              style={{
                border: '2px solid #ddd',
                borderRadius: '8px',
                padding: '16px',
                marginBottom: '12px',
                backgroundColor: '#fafafa',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                }}
              >
                <div style={{ flex: 1 }}>
                  <h4
                    style={{
                      margin: '0 0 8px 0',
                      color: '#333',
                    }}
                  >
                    {clinic.name}
                  </h4>
                  <div
                    style={{
                      fontSize: '14px',
                      color: '#666',
                      lineHeight: '1.6',
                    }}
                  >
                    <p style={{ margin: '4px 0' }}>📍 {clinic.address}</p>
                    {clinic.distance && (
                      <p style={{ margin: '4px 0' }}>
                        🚶 {clinic.distance.toFixed(1)} km away
                      </p>
                    )}
                    {clinic.phone && (
                      <p style={{ margin: '4px 0' }}>📞 {clinic.phone}</p>
                    )}
                    {clinic.rating && (
                      <p style={{ margin: '4px 0' }}>
                        ⭐ {clinic.rating.toFixed(1)} / 5.0
                      </p>
                    )}
                  </div>
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                  }}
                >
                  {clinic.website && (
                    <a
                      href={clinic.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        padding: '8px 16px',
                        backgroundColor: '#2196f3',
                        color: 'white',
                        textDecoration: 'none',
                        borderRadius: '6px',
                        textAlign: 'center',
                        fontSize: '14px',
                        display: 'inline-block',
                        transform: 'scale(1)',
                        transition:
                          'transform 0.15s ease, box-shadow 0.15s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                        e.currentTarget.style.boxShadow =
                          '0 4px 10px rgba(0,0,0,0.12)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      Website
                    </a>
                  )}
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${clinic.lat},${clinic.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      padding: '8px 16px',
                      backgroundColor: '#4caf50',
                      color: 'white',
                      textDecoration: 'none',
                      borderRadius: '6px',
                      textAlign: 'center',
                      fontSize: '14px',
                      display: 'inline-block',
                      transform: 'scale(1)',
                      transition:
                        'transform 0.15s ease, box-shadow 0.15s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)';
                      e.currentTarget.style.boxShadow =
                        '0 4px 10px rgba(0,0,0,0.12)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    Directions
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {error && (
        <div
          style={{
            padding: '16px',
            backgroundColor: '#ffebee',
            border: '1px solid #f44336',
            borderRadius: '8px',
            color: '#c62828',
            marginTop: '12px',
          }}
        >
          <p style={{ margin: 0 }}>
            ❌ {error}
          </p>
        </div>
      )}

      {!userLocation && (
        <div
          style={{
            padding: '16px',
            backgroundColor: '#fff3cd',
            border: '1px solid #ffc107',
            borderRadius: '8px',
            color: '#856404',
          }}
        >
          <p style={{ margin: 0 }}>
            ⚠️ Location services are required to find nearby clinics. Please
            enable location access.
          </p>
        </div>
      )}

      {clinics.length === 0 && !isLoading && !error && userLocation && (
        <div
          style={{
            marginTop: '20px',
            padding: '12px',
            backgroundColor: '#e3f2fd',
            borderRadius: '8px',
            fontSize: '13px',
            color: '#1565c0',
          }}
        >
          💡 <strong>Tip:</strong> Click "Find Clinics" to search for travel clinics and vaccination centers near you using Google Places API.
        </div>
      )}
    </div>
  );
};
