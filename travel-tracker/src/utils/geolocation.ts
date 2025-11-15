import type { Location } from '../types';

export const getCurrentPosition = (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'));
    } else {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    }
  });
};

export const getUserLocation = async (): Promise<Location> => {
  try {
    const position = await getCurrentPosition();
    const { latitude, longitude } = position.coords;

    // Use reverse geocoding to get location name
    const locationName = await reverseGeocode(latitude, longitude);

    return {
      lat: latitude,
      lng: longitude,
      name: locationName.city || 'Current Location',
      country: locationName.country || 'Unknown'
    };
  } catch (error) {
    console.error('Error getting user location:', error);
    // Default to a fallback location (e.g., New York)
    return {
      lat: 40.7128,
      lng: -74.0060,
      name: 'New York',
      country: 'United States'
    };
  }
};

interface ReverseGeocodeResult {
  city?: string;
  country?: string;
}

export const reverseGeocode = async (lat: number, lng: number): Promise<ReverseGeocodeResult> => {
  try {
    // Using OpenStreetMap Nominatim API for reverse geocoding
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
    );
    const data = await response.json();

    return {
      city: data.address?.city || data.address?.town || data.address?.village,
      country: data.address?.country
    };
  } catch (error) {
    console.error('Reverse geocoding error:', error);
    return {};
  }
};

export const geocodeLocation = async (locationName: string): Promise<Location | null> => {
  try {
    // Using OpenStreetMap Nominatim API for geocoding
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(locationName)}&limit=1`
    );
    const data = await response.json();

    if (data && data.length > 0) {
      const result = data[0];
      return {
        lat: parseFloat(result.lat),
        lng: parseFloat(result.lon),
        name: result.display_name.split(',')[0],
        country: result.display_name.split(',').pop()?.trim() || 'Unknown'
      };
    }

    return null;
  } catch (error) {
    console.error('Geocoding error:', error);
    return null;
  }
};

export const calculateDistance = (loc1: Location, loc2: Location): number => {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(loc2.lat - loc1.lat);
  const dLng = toRad(loc2.lng - loc1.lng);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(loc1.lat)) *
    Math.cos(toRad(loc2.lat)) *
    Math.sin(dLng / 2) *
    Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const toRad = (degrees: number): number => {
  return degrees * (Math.PI / 180);
};
