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
    dataSource: 'mock',
    lastUpdated: new Date('2025-01-15'),
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
    dataSource: 'mock',
    lastUpdated: new Date('2025-01-15'),
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
    dataSource: 'mock',
    lastUpdated: new Date('2025-01-15'),
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
  },
  'India': {
    country: 'India',
    countryCode: 'IN',
    malariaRisk: true,
    yellowFeverRequired: false,
    dataSource: 'mock',
    lastUpdated: new Date('2025-01-15'),
    vaccinations: [
      {
        id: 'hep-a',
        name: 'Hepatitis A',
        required: false,
        recommended: true,
        description: 'Recommended for all travelers to India',
        doses: 2,
        doseSchedule: ['Initial dose', '6-12 months after first dose'],
      },
      {
        id: 'typhoid',
        name: 'Typhoid',
        required: false,
        recommended: true,
        description: 'Strongly recommended due to high risk of contaminated food/water',
        doses: 1,
      },
      {
        id: 'cholera',
        name: 'Cholera',
        required: false,
        recommended: false,
        description: 'Consider if visiting areas with active cholera transmission',
        doses: 2,
      },
      {
        id: 'japanese-encephalitis',
        name: 'Japanese Encephalitis',
        required: false,
        recommended: true,
        description: 'Recommended for travelers spending extended time in rural areas',
        doses: 2,
        doseSchedule: ['Initial dose', '28 days after first dose'],
      }
    ],
    healthPrecautions: [
      {
        id: 'water-safety',
        type: 'warning',
        title: 'Water and Food Safety',
        description: 'Only drink bottled or boiled water. Avoid street food, raw vegetables, and unpasteurized dairy.',
        severity: 'high'
      },
      {
        id: 'air-quality',
        type: 'warning',
        title: 'Air Quality',
        description: 'Major cities may have poor air quality, especially in winter. Consider masks if you have respiratory issues.',
        severity: 'medium'
      },
      {
        id: 'malaria-prevention',
        type: 'medication',
        title: 'Malaria Prevention',
        description: 'Antimalarial medication recommended for most regions. Use insect repellent and mosquito nets.',
        severity: 'high'
      }
    ]
  },
  'Kenya': {
    country: 'Kenya',
    countryCode: 'KE',
    malariaRisk: true,
    yellowFeverRequired: true,
    dataSource: 'mock',
    lastUpdated: new Date('2025-01-15'),
    vaccinations: [
      {
        id: 'yellow-fever',
        name: 'Yellow Fever',
        required: true,
        recommended: true,
        description: 'Required for entry and recommended for all areas',
        doses: 1,
      },
      {
        id: 'hep-a',
        name: 'Hepatitis A',
        required: false,
        recommended: true,
        description: 'Recommended for all travelers',
        doses: 2,
        doseSchedule: ['Initial dose', '6-12 months after first dose'],
      },
      {
        id: 'typhoid',
        name: 'Typhoid',
        required: false,
        recommended: true,
        description: 'Recommended for most travelers',
        doses: 1,
      },
      {
        id: 'meningitis',
        name: 'Meningococcal Meningitis',
        required: false,
        recommended: true,
        description: 'Recommended during dry season (December-June)',
        doses: 1,
      }
    ],
    healthPrecautions: [
      {
        id: 'malaria-prevention',
        type: 'medication',
        title: 'Malaria Prevention',
        description: 'Antimalarial medication required for most areas except Nairobi. Take prophylaxis and use mosquito nets.',
        severity: 'high'
      },
      {
        id: 'safari-safety',
        type: 'advice',
        title: 'Safari Safety',
        description: 'Maintain safe distance from wildlife. Follow guide instructions at all times.',
        severity: 'medium'
      }
    ]
  },
  'France': {
    country: 'France',
    countryCode: 'FR',
    malariaRisk: false,
    yellowFeverRequired: false,
    dataSource: 'mock',
    lastUpdated: new Date('2025-01-15'),
    vaccinations: [
      {
        id: 'routine',
        name: 'Routine Vaccinations',
        required: false,
        recommended: true,
        description: 'Ensure routine vaccinations are up to date (MMR, DTaP)',
        doses: 1,
      },
      {
        id: 'hep-b',
        name: 'Hepatitis B',
        required: false,
        recommended: false,
        description: 'Optional for those who might have intimate contact or medical procedures',
        doses: 3,
      }
    ],
    healthPrecautions: [
      {
        id: 'general-safety',
        type: 'advice',
        title: 'General Health',
        description: 'France has excellent healthcare standards. No special health precautions needed.',
        severity: 'low'
      },
      {
        id: 'tick-awareness',
        type: 'advice',
        title: 'Tick-Borne Diseases',
        description: 'Use insect repellent when hiking in forests. Check for ticks after outdoor activities.',
        severity: 'low'
      }
    ]
  },
  'Mexico': {
    country: 'Mexico',
    countryCode: 'MX',
    malariaRisk: true,
    yellowFeverRequired: false,
    dataSource: 'mock',
    lastUpdated: new Date('2025-01-15'),
    vaccinations: [
      {
        id: 'hep-a',
        name: 'Hepatitis A',
        required: false,
        recommended: true,
        description: 'Recommended for all travelers',
        doses: 2,
        doseSchedule: ['Initial dose', '6-12 months after first dose'],
      },
      {
        id: 'typhoid',
        name: 'Typhoid',
        required: false,
        recommended: true,
        description: 'Recommended especially if eating street food or visiting rural areas',
        doses: 1,
      }
    ],
    healthPrecautions: [
      {
        id: 'water-safety',
        type: 'warning',
        title: 'Water Safety',
        description: 'Drink only bottled or purified water. Avoid ice in drinks.',
        severity: 'high'
      },
      {
        id: 'malaria-risk',
        type: 'medication',
        title: 'Malaria Risk (Limited)',
        description: 'Malaria risk exists in some rural areas. Consult doctor about prophylaxis if visiting affected regions.',
        severity: 'medium'
      },
      {
        id: 'altitude',
        type: 'advice',
        title: 'Altitude Sickness',
        description: 'Mexico City is at 7,350 feet. Take it easy first few days if you feel dizzy or short of breath.',
        severity: 'medium'
      }
    ]
  },
  'Australia': {
    country: 'Australia',
    countryCode: 'AU',
    malariaRisk: false,
    yellowFeverRequired: false,
    dataSource: 'mock',
    lastUpdated: new Date('2025-01-15'),
    vaccinations: [
      {
        id: 'routine',
        name: 'Routine Vaccinations',
        required: false,
        recommended: true,
        description: 'Ensure routine vaccinations are up to date',
        doses: 1,
      }
    ],
    healthPrecautions: [
      {
        id: 'sun-protection',
        type: 'warning',
        title: 'Sun Protection',
        description: 'Australia has very high UV levels. Use SPF 50+ sunscreen, wear hat, and seek shade during peak hours.',
        severity: 'high'
      },
      {
        id: 'wildlife-safety',
        type: 'advice',
        title: 'Wildlife Safety',
        description: 'Be aware of venomous snakes, spiders, and marine life. Swim at patrolled beaches only.',
        severity: 'medium'
      }
    ]
  }
};

// Generate fallback data for countries not in our mock database
const generateFallbackData = (countryName: string): CountryHealthInfo => {
  return {
    country: countryName,
    countryCode: 'XX',
    malariaRisk: false,
    yellowFeverRequired: false,
    dataSource: 'fallback',
    lastUpdated: new Date(),
    vaccinations: [
      {
        id: 'routine',
        name: 'Routine Vaccinations',
        required: false,
        recommended: true,
        description: 'Ensure all routine vaccinations are up to date (MMR, DTaP, Polio, etc.)',
        doses: 1,
      },
      {
        id: 'hep-a',
        name: 'Hepatitis A',
        required: false,
        recommended: true,
        description: 'Recommended for most international travelers',
        doses: 2,
        doseSchedule: ['Initial dose', '6-12 months after first dose'],
      },
      {
        id: 'hep-b',
        name: 'Hepatitis B',
        required: false,
        recommended: false,
        description: 'Consider if you might have intimate contact with locals or need medical procedures',
        doses: 3,
        doseSchedule: ['Initial dose', '1 month after first', '6 months after first'],
      }
    ],
    healthPrecautions: [
      {
        id: 'consult-doctor',
        type: 'advice',
        title: 'Consult a Travel Medicine Specialist',
        description: `We don't have specific health data for ${countryName} in our database. Please consult with a healthcare provider or travel medicine specialist for personalized advice.`,
        severity: 'high'
      },
      {
        id: 'general-safety',
        type: 'advice',
        title: 'General Travel Health',
        description: 'Practice good hygiene, drink safe water, and be cautious with food. Consider travel insurance that covers medical emergencies.',
        severity: 'medium'
      },
      {
        id: 'insect-protection',
        type: 'advice',
        title: 'Insect Protection',
        description: 'Use insect repellent and wear protective clothing to prevent mosquito-borne diseases.',
        severity: 'medium'
      }
    ]
  };
};

export const getCountryHealthInfo = async (countryName: string): Promise<CountryHealthInfo> => {
  try {
    // First, try to match exact country name
    if (MOCK_VACCINATION_DATA[countryName]) {
      console.log(`✓ Found specific health data for ${countryName} (Mock Data)`);
      return MOCK_VACCINATION_DATA[countryName];
    }

    // Try to find partial match
    const matchedCountry = Object.keys(MOCK_VACCINATION_DATA).find(key =>
      key.toLowerCase().includes(countryName.toLowerCase()) ||
      countryName.toLowerCase().includes(key.toLowerCase())
    );

    if (matchedCountry) {
      console.log(`✓ Found similar country match: ${matchedCountry} for ${countryName} (Mock Data)`);
      return MOCK_VACCINATION_DATA[matchedCountry];
    }

    // In a real implementation, this would call an external API
    // Example: const response = await axios.get(`https://api.travelhealthpro.org/countries/${countryCode}`);
    // if (response.data) return { ...response.data, dataSource: 'api' };

    // Return fallback data with general recommendations
    console.log(`⚠ No specific data found for ${countryName}, using fallback general recommendations`);
    return generateFallbackData(countryName);
  } catch (error) {
    console.error('Error fetching vaccination data:', error);
    return generateFallbackData(countryName);
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
