import type { CountryHealthInfo } from '../types';

// Note: CDC doesn't have a public API, so we'll use a combination of approaches:
// 1. Mock data structure based on CDC guidelines
// 2. Integration points for future API connections
// 3. You can replace this with a real API like TravelHealthPro or HealthMap

const MOCK_VACCINATION_DATA: Record<string, CountryHealthInfo> = {
  'Thailand': {
    country: 'Thailand',
    countryCode: 'TH',
    malariaRisk: true,
    yellowFeverRequired: false,
    vaccinations: [
      {
        id: 'hep-a',
        name: 'Hepatitis A',
        required: false,
        recommended: true,
        description: 'Recommended for most travelers to Thailand',
        doses: 2,
        doseSchedule: ['Initial dose', '6-12 months after first dose'],
      },
      {
        id: 'typhoid',
        name: 'Typhoid',
        required: false,
        recommended: true,
        description: 'Recommended for travelers eating outside major restaurants',
        doses: 1,
      },
      {
        id: 'hep-b',
        name: 'Hepatitis B',
        required: false,
        recommended: true,
        description: 'Recommended for those who might have intimate contact with locals',
        doses: 3,
        doseSchedule: ['Initial dose', '1 month after first', '6 months after first'],
      },
      {
        id: 'japanese-encephalitis',
        name: 'Japanese Encephalitis',
        required: false,
        recommended: true,
        description: 'Recommended if visiting rural areas for extended periods',
        doses: 2,
        doseSchedule: ['Initial dose', '28 days after first dose'],
      },
      {
        id: 'rabies',
        name: 'Rabies',
        required: false,
        recommended: false,
        description: 'Consider for adventure travelers and those working with animals',
        doses: 3,
        doseSchedule: ['Day 0', 'Day 7', 'Day 21 or 28'],
      }
    ],
    healthPrecautions: [
      {
        id: 'malaria-prevention',
        type: 'medication',
        title: 'Malaria Prevention',
        description: 'Take antimalarial medication if visiting rural/forest areas. Consult doctor for prescription.',
        severity: 'high'
      },
      {
        id: 'food-water',
        type: 'advice',
        title: 'Food and Water Safety',
        description: 'Drink bottled water and avoid ice. Eat thoroughly cooked food from reputable establishments.',
        severity: 'medium'
      },
      {
        id: 'insect-protection',
        type: 'advice',
        title: 'Insect Protection',
        description: 'Use insect repellent with DEET. Wear long sleeves and pants in the evening.',
        severity: 'medium'
      }
    ]
  },
  'Brazil': {
    country: 'Brazil',
    countryCode: 'BR',
    malariaRisk: true,
    yellowFeverRequired: true,
    vaccinations: [
      {
        id: 'yellow-fever',
        name: 'Yellow Fever',
        required: true,
        recommended: true,
        description: 'Required for entry and recommended for most areas',
        doses: 1,
      },
      {
        id: 'hep-a',
        name: 'Hepatitis A',
        required: false,
        recommended: true,
        description: 'Recommended for all travelers to Brazil',
        doses: 2,
        doseSchedule: ['Initial dose', '6-12 months after first dose'],
      },
      {
        id: 'typhoid',
        name: 'Typhoid',
        required: false,
        recommended: true,
        description: 'Recommended for travelers to smaller cities or rural areas',
        doses: 1,
      }
    ],
    healthPrecautions: [
      {
        id: 'zika-warning',
        type: 'warning',
        title: 'Zika Virus',
        description: 'Zika virus is present. Pregnant women should avoid travel. Use mosquito protection.',
        severity: 'high'
      },
      {
        id: 'malaria-prevention',
        type: 'medication',
        title: 'Malaria Prevention',
        description: 'Antimalarial medication recommended for Amazon region.',
        severity: 'high'
      }
    ]
  },
  'Japan': {
    country: 'Japan',
    countryCode: 'JP',
    malariaRisk: false,
    yellowFeverRequired: false,
    vaccinations: [
      {
        id: 'routine',
        name: 'Routine Vaccinations',
        required: false,
        recommended: true,
        description: 'Ensure routine vaccinations are up to date',
        doses: 1,
      },
      {
        id: 'hep-a',
        name: 'Hepatitis A',
        required: false,
        recommended: true,
        description: 'Recommended for most travelers',
        doses: 2,
        doseSchedule: ['Initial dose', '6-12 months after first dose'],
      },
      {
        id: 'hep-b',
        name: 'Hepatitis B',
        required: false,
        recommended: false,
        description: 'Recommended for those who might have intimate contact',
        doses: 3,
      }
    ],
    healthPrecautions: [
      {
        id: 'food-safety',
        type: 'advice',
        title: 'Food Safety',
        description: 'Japan has excellent food safety standards. Risk of foodborne illness is low.',
        severity: 'low'
      }
    ]
  }
};

export const getCountryHealthInfo = async (countryName: string): Promise<CountryHealthInfo | null> => {
  try {
    // First, try to match exact country name
    if (MOCK_VACCINATION_DATA[countryName]) {
      return MOCK_VACCINATION_DATA[countryName];
    }

    // Try to find partial match
    const matchedCountry = Object.keys(MOCK_VACCINATION_DATA).find(key =>
      key.toLowerCase().includes(countryName.toLowerCase()) ||
      countryName.toLowerCase().includes(key.toLowerCase())
    );

    if (matchedCountry) {
      return MOCK_VACCINATION_DATA[matchedCountry];
    }

    // In a real implementation, this would call an external API
    // Example: const response = await axios.get(`https://api.travelhealthpro.org/countries/${countryCode}`);

    // Return null if no data found
    return null;
  } catch (error) {
    console.error('Error fetching vaccination data:', error);
    return null;
  }
};

export const searchCountries = (query: string): string[] => {
  const countries = Object.keys(MOCK_VACCINATION_DATA);
  if (!query) return countries;

  return countries.filter(country =>
    country.toLowerCase().includes(query.toLowerCase())
  );
};

// Function to add more countries to the dataset
export const addCountryData = (countryInfo: CountryHealthInfo): void => {
  MOCK_VACCINATION_DATA[countryInfo.country] = countryInfo;
};

// Get all available countries
export const getAllCountries = (): string[] => {
  return Object.keys(MOCK_VACCINATION_DATA);
};
