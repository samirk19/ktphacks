import type { TravelClinic, Location } from '../types';

const GOOGLE_PLACES_API_KEY = import.meta.env.VITE_GOOGLE_PLACES_API_KEY;
const PLACES_API_BASE_URL = 'https://places.googleapis.com/v1/places:searchNearby';

export interface PlacesSearchParams {
  location: Location;
  radius: number; // in kilometers
}

interface GooglePlace {
  id: string;
  displayName: {
    text: string;
  };
  formattedAddress: string;
  location: {
    latitude: number;
    longitude: number;
  };
  internationalPhoneNumber?: string;
  websiteUri?: string;
  rating?: number;
}

/**
 * Search for travel clinics near a location using Google Places API
 */
export const searchTravelClinics = async (
  params: PlacesSearchParams
): Promise<TravelClinic[]> => {
  console.log('Google Places API Key:', GOOGLE_PLACES_API_KEY ? 'Present' : 'Missing');

  if (!GOOGLE_PLACES_API_KEY) {
    console.error('Google Places API key is not configured');
    throw new Error('Google Places API key is missing. Please add it to your .env file.');
  }

  console.log('Searching for clinics with params:', params);

  try {
    const response = await fetch(PLACES_API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': GOOGLE_PLACES_API_KEY,
        'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.location,places.internationalPhoneNumber,places.websiteUri,places.rating'
      },
      body: JSON.stringify({
        includedTypes: ['hospital', 'wellness_center'],
        maxResultCount: 20,
        locationRestriction: {
          circle: {
            center: {
              latitude: params.location.lat,
              longitude: params.location.lng
            },
            radius: params.radius * 1000 // convert km to meters
          }
        }
      })
    });

    console.log('Response status:', response.status, response.statusText);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Places API error response:', errorData);
      throw new Error(`Places API request failed: ${response.statusText} - ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    console.log('Places API response:', data);
    const places: GooglePlace[] = data.places || [];
    console.log('Found places:', places.length);

    // Filter for travel/vaccination clinics and convert to TravelClinic format
    const clinics: TravelClinic[] = places
      .map((place: GooglePlace) => {
        const distance = calculateDistance(
          params.location,
          { lat: place.location.latitude, lng: place.location.longitude } as Location
        );

        return {
          id: place.id,
          name: place.displayName.text,
          address: place.formattedAddress,
          lat: place.location.latitude,
          lng: place.location.longitude,
          phone: place.internationalPhoneNumber,
          website: place.websiteUri,
          rating: place.rating,
          distance
        };
      })
      .sort((a, b) => (a.distance || 0) - (b.distance || 0)); // Sort by distance

    return clinics;
  } catch (error) {
    console.error('Error searching for clinics:', error);
    throw error;
  }
};

/**
 * Calculate distance between two locations using Haversine formula
 */
const calculateDistance = (loc1: Location, loc2: Location): number => {
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

/**
 * Text search for specific clinic names or types
 */
export const searchClinics = async (
  query: string,
  location: Location,
  radius: number = 50
): Promise<TravelClinic[]> => {
  console.log('searchClinics called with:', { query, location, radius });
  console.log('API Key available:', !!GOOGLE_PLACES_API_KEY);

  if (!GOOGLE_PLACES_API_KEY) {
    throw new Error('Google Places API key is missing');
  }

  try {
    console.log('Making text search request...');
    const response = await fetch('https://places.googleapis.com/v1/places:searchText', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': GOOGLE_PLACES_API_KEY,
        'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.location,places.internationalPhoneNumber,places.websiteUri,places.rating'
      },
      body: JSON.stringify({
        textQuery: query,
        locationBias: {
          circle: {
            center: {
              latitude: location.lat,
              longitude: location.lng
            },
            radius: radius * 1000
          }
        }
      })
    });

    console.log('Text search response status:', response.status);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Text search error:', errorData);
      throw new Error(`Text search failed: ${response.statusText} - ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    console.log('Text search response data:', data);
    const places: GooglePlace[] = data.places || [];
    console.log('Found clinics via text search:', places.length);

    return places.map((place: GooglePlace) => {
      const distance = calculateDistance(
        location,
        { lat: place.location.latitude, lng: place.location.longitude } as Location
      );

      return {
        id: place.id,
        name: place.displayName.text,
        address: place.formattedAddress,
        lat: place.location.latitude,
        lng: place.location.longitude,
        phone: place.internationalPhoneNumber,
        website: place.websiteUri,
        rating: place.rating,
        distance
      };
    });
  } catch (error) {
    console.error('Error in text search:', error);
    throw error;
  }
};

/**
 * Comprehensive search for travel health facilities
 * Searches for travel clinics, vaccination centers, and travel medicine
 */
export const searchTravelHealthFacilities = async (
  location: Location,
  radius: number = 50
): Promise<TravelClinic[]> => {
  console.log('searchTravelHealthFacilities called with:', { location, radius });

  if (!GOOGLE_PLACES_API_KEY) {
    throw new Error('Google Places API key is missing');
  }

  try {
    // Search for multiple types of travel health facilities
    const searchQueries = [
      'travel clinic',
      'vaccination center',
      'travel medicine',
      'immunization clinic'
    ];

    const searchPromises = searchQueries.map(query =>
      searchClinics(query, location, radius).catch(err => {
        console.warn(`Search failed for "${query}":`, err);
        return []; // Return empty array if search fails
      })
    );

    const results = await Promise.all(searchPromises);
    const allClinics = results.flat();

    // Deduplicate by ID
    const uniqueClinics = allClinics.filter((clinic, index, self) =>
      index === self.findIndex((c) => c.id === clinic.id)
    );

    // Sort by distance
    return uniqueClinics.sort((a, b) => (a.distance || 0) - (b.distance || 0));
  } catch (error) {
    console.error('Error searching for travel health facilities:', error);
    throw error;
  }
};
