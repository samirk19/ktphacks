export interface Location {
  lat: number;
  lng: number;
  name: string;
  country: string;
}

export interface FlightPath {
  from: Location;
  to: Location;
  color?: string;
}

export interface Vaccination {
  id: string;
  name: string;
  required: boolean;
  recommended: boolean;
  description: string;
  doses: number;
  doseSchedule?: string[];
  sideEffects?: string[];
}

export interface HealthPrecaution {
  id: string;
  type: 'medication' | 'advice' | 'warning';
  title: string;
  description: string;
  severity?: 'low' | 'medium' | 'high';
}

export interface VaccinationRecord {
  id: string;
  vaccineName: string;
  dateAdministered: Date;
  nextDoseDate?: Date;
  lotNumber?: string;
  location?: string;
  notes?: string;
}

export interface VaccinationReminder {
  id: string;
  vaccinationRecordId: string;
  vaccineName: string;
  scheduledDate: Date;
  completed: boolean;
  doseNumber: number;
  totalDoses: number;
}

export interface TravelClinic {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  phone?: string;
  website?: string;
  rating?: number;
  distance?: number;
}

export interface CountryHealthInfo {
  country: string;
  countryCode: string;
  vaccinations: Vaccination[];
  healthPrecautions: HealthPrecaution[];
  malariaRisk: boolean;
  yellowFeverRequired: boolean;
  covidRequirements?: string;
  dataSource: 'mock' | 'api' | 'fallback'; // Indicates if data is from mock data, real API, or fallback
  lastUpdated?: Date; // When the data was last updated
}
