import { useState } from 'react';
import type { TravelClinic, Location } from '../types';

interface ClinicLocatorProps {
  userLocation: Location | null;
}

export const ClinicLocator = ({ userLocation }: ClinicLocatorProps) => {
  const [searchRadius, setSearchRadius] = useState(10); // km
  const [clinics, setClinics] = useState<TravelClinic[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock data for demonstration
  const MOCK_CLINICS: TravelClinic[] = [
    {
      id: '1',
      name: 'City Travel Health Clinic',
      address: '123 Main Street',
      lat: userLocation?.lat || 40.7128,
      lng: userLocation?.lng || -74.0060,
      phone: '(555) 123-4567',
      website: 'https://example.com/clinic1',
      rating: 4.5,
      distance: 2.3,
    },
    {
      id: '2',
      name: 'International Vaccination Center',
      address: '456 Health Avenue',
      lat: (userLocation?.lat || 40.7128) + 0.01,
      lng: (userLocation?.lng || -74.0060) + 0.01,
      phone: '(555) 234-5678',
      website: 'https://example.com/clinic2',
      rating: 4.8,
      distance: 5.7,
    },
    {
      id: '3',
      name: 'Global Health Travel Services',
      address: '789 Wellness Boulevard',
      lat: (userLocation?.lat || 40.7128) - 0.01,
      lng: (userLocation?.lng || -74.0060) - 0.01,
      phone: '(555) 345-6789',
      rating: 4.2,
      distance: 8.1,
    },
  ];

  const handleSearch = async () => {
    if (!userLocation) {
      alert('Unable to determine your location. Please enable location services.');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Filter clinics by radius
      const filtered = MOCK_CLINICS.filter(clinic =>
        (clinic.distance || 0) <= searchRadius
      );
      setClinics(filtered);
      setIsLoading(false);
    }, 1000);

    // In a real implementation, you would call Google Maps Places API:
    // const service = new google.maps.places.PlacesService(map);
    // service.nearbySearch({
    //   location: new google.maps.LatLng(userLocation.lat, userLocation.lng),
    //   radius: searchRadius * 1000,
    //   type: 'doctor',
    //   keyword: 'travel vaccination clinic'
    // }, callback);
  };

  return (
    <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
      <h2 style={{ marginTop: 0, color: '#333' }}>Find Travel Clinics Nearby</h2>

      <div style={{ marginBottom: '20px' }}>
        <div style={{ marginBottom: '12px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>
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
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '12px' }}>
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
          {clinics.map(clinic => (
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
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: '0 0 8px 0', color: '#333' }}>{clinic.name}</h4>
                  <div style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>
                    <p style={{ margin: '4px 0' }}>
                      📍 {clinic.address}
                    </p>
                    {clinic.distance && (
                      <p style={{ margin: '4px 0' }}>
                        🚶 {clinic.distance.toFixed(1)} km away
                      </p>
                    )}
                    {clinic.phone && (
                      <p style={{ margin: '4px 0' }}>
                        📞 {clinic.phone}
                      </p>
                    )}
                    {clinic.rating && (
                      <p style={{ margin: '4px 0' }}>
                        ⭐ {clinic.rating.toFixed(1)} / 5.0
                      </p>
                    )}
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
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

      {!userLocation && (
        <div style={{
          padding: '16px',
          backgroundColor: '#fff3cd',
          border: '1px solid #ffc107',
          borderRadius: '8px',
          color: '#856404',
        }}>
          <p style={{ margin: 0 }}>
            ⚠️ Location services are required to find nearby clinics. Please enable location access.
          </p>
        </div>
      )}

      <div style={{
        marginTop: '20px',
        padding: '12px',
        backgroundColor: '#e3f2fd',
        borderRadius: '8px',
        fontSize: '13px',
        color: '#1565c0',
      }}>
        💡 <strong>Note:</strong> This is a demonstration with mock data. In production, this would integrate with
        Google Maps API or similar services to show real travel clinics in your area.
      </div>
    </div>
  );
};
