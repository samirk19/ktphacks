# Travel Vaccination Tracker

A comprehensive web application for planning international travel and managing vaccination requirements. Features an interactive 3D globe, personalized health recommendations, vaccination record storage, and clinic locator.

## Features

### 1. Interactive 3D Globe
- Beautiful rotating globe visualization powered by Globe.GL and Three.js
- Visual flight path arcs from your location to destination
- Animated transitions and interactive controls
- Real-time location markers

### 2. Destination Search
- Autocomplete search for countries
- Geocoding integration for accurate location data
- Instant health information lookup

### 3. Vaccination Requirements
- Country-specific vaccination recommendations
- Distinction between required and recommended vaccines
- Detailed information including:
  - Dose schedules
  - Multi-dose series information
  - Side effects
  - Administration guidelines

### 4. Health Precautions
- Medication recommendations (e.g., malaria prophylaxis)
- Disease warnings (e.g., Zika, Yellow Fever)
- Food and water safety advice
- Severity-based prioritization

### 5. Vaccination Reminders
- Automated reminders for multi-dose vaccine series
- Overdue, upcoming, and completed status tracking
- Date-based notifications
- Integration with vaccination records

### 6. Digital Vaccination Records
- CRUD operations for managing your vaccination history
- Store important details:
  - Vaccine name and date
  - Lot numbers
  - Clinic location
  - Personal notes
- Export functionality (JSON format)
- Automatic reminder creation for follow-up doses

### 7. Travel Clinic Locator
- Find nearby travel vaccination clinics
- Adjustable search radius
- Clinic information including:
  - Name and address
  - Phone numbers
  - Ratings
  - Distance from your location
- Direct links to Google Maps directions

## Technology Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **3D Visualization**: Globe.GL + Three.js
- **Geocoding**: OpenStreetMap Nominatim API
- **Date Handling**: date-fns
- **Storage**: Browser LocalStorage
- **Styling**: CSS with responsive design

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to:
```
http://localhost:5173
```

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Usage

1. **Allow Location Access**: When prompted, allow the app to access your location for accurate origin data

2. **Search for Destination**:
   - Enter a country name in the search bar
   - Select from autocomplete suggestions
   - Click "Search"

3. **View Vaccination Info**:
   - See required and recommended vaccinations
   - Review health precautions and medications
   - Note dose schedules for multi-dose vaccines

4. **Manage Your Records**:
   - Switch to "My Records" tab
   - Click "Add Record" to log vaccinations
   - Export your records as JSON

5. **Set Reminders**:
   - When adding records with next dose dates, reminders are automatically created
   - View all reminders in the "Reminders" tab
   - Mark doses as completed

6. **Find Clinics**:
   - Switch to "Find Clinics" tab
   - Adjust search radius
   - View nearby travel vaccination clinics
   - Get directions via Google Maps

## Data Sources

Currently, the app uses curated mock data based on CDC and WHO travel health guidelines for demonstration purposes. The data includes:
- Thailand
- Brazil
- Japan

### Future API Integration

The application is structured to easily integrate with real-time APIs:
- CDC Travelers' Health API
- WHO International Travel and Health
- TravelHealthPro API
- Google Maps Places API (for clinic locator)

## Browser Compatibility

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Privacy & Data Storage

- All vaccination records are stored locally in your browser's LocalStorage
- No data is sent to external servers
- Geolocation data is only used for display purposes
- Clear your browser data to remove all stored records

## Future Enhancements

- [ ] Integration with real CDC/WHO APIs
- [ ] User authentication and cloud storage
- [ ] PDF export for vaccination records
- [ ] Image upload for vaccination cards
- [ ] Email/SMS reminder notifications
- [ ] Multi-language support
- [ ] Offline PWA functionality
- [ ] Integration with Apple Health / Google Fit
- [ ] Travel itinerary planning
- [ ] Disease outbreak alerts

## Contributing

This is a demonstration project. For production use, consider:
1. Implementing proper API integrations
2. Adding user authentication
3. Enhancing data validation
4. Implementing proper error boundaries
5. Adding comprehensive testing
6. Optimizing bundle size with code splitting

## License

MIT

## Disclaimer

This application provides general travel health information for educational purposes only. Always consult with a qualified healthcare provider or travel medicine specialist before international travel. Vaccination requirements and health recommendations may change frequently.
