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
- Find nearby travel vaccination clinics using Google Places API
- Intelligent search across multiple categories:
  - Travel clinics
  - Vaccination centers
  - Travel medicine facilities
  - Immunization clinics
- Adjustable search radius (1-50 km)
- Clinic information including:
  - Name and address
  - Phone numbers
  - Ratings
  - Distance from your location
- Direct links to Google Maps directions
- Automatic deduplication of results

## Technology Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **3D Visualization**: Globe.GL + Three.js
- **Places API**: Google Places API (New)
- **Geocoding**: OpenStreetMap Nominatim API
- **Date Handling**: date-fns
- **Storage**: Browser LocalStorage
- **Styling**: CSS with responsive design

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Google Places API key (for clinic locator feature)

### Installation

1. **Clone the repository**:
```bash
git clone <repository-url>
cd travel-tracker
```

2. **Install dependencies**:
```bash
npm install
```

3. **Set up environment variables**:

Create a `.env` file in the root directory:
```bash
cp .env .env.local  # Or create a new .env file
```

Add your Google Places API key to the `.env` file:
```
VITE_GOOGLE_PLACES_API_KEY=your_google_places_api_key_here
```

**How to get a Google Places API Key**:
- Go to [Google Cloud Console](https://console.cloud.google.com/)
- Create a new project or select an existing one
- Enable the **Places API (New)**
- Go to "Credentials" and create an API key
- (Optional but recommended) Restrict the API key to your domain and limit it to Places API only

4. **Start the development server**:
```bash
npm run dev
```

5. **Open your browser and navigate to**:
```
http://localhost:5173
```

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Testing the Application

1. **Allow location access** when prompted by your browser (required for clinic locator)
2. **Test the clinic locator**:
   - Navigate to the "Find Clinics" tab
   - Adjust the search radius as needed
   - Click "Find Clinics" to search for travel health facilities near you
3. **Search for destinations** to view vaccination requirements
4. **Add vaccination records** and set reminders in the "My Records" tab

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

### API Integration Status

**Currently Integrated**:
- ✅ Google Places API (New) - for clinic locator functionality
- ✅ OpenStreetMap Nominatim API - for geocoding

**Future Integration Opportunities**:
- CDC Travelers' Health API - for real-time vaccination requirements
- WHO International Travel and Health - for health advisories
- TravelHealthPro API - for comprehensive travel health data

## Browser Compatibility

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Privacy & Data Storage

- All vaccination records are stored locally in your browser's LocalStorage
- Geolocation data is only used for display and clinic search purposes
- Google Places API calls are made directly from the browser
- Your Google API key is stored in environment variables (not exposed to users)
- Clear your browser data to remove all stored records

### Important Security Notes

- **Never commit your `.env` file** to version control
- The `.env` file is already included in `.gitignore`
- Keep your Google Places API key secure
- Consider restricting your API key to specific domains in production

## Future Enhancements

- [ ] Integration with real CDC/WHO APIs for vaccination data
- [ ] User authentication and cloud storage
- [ ] PDF export for vaccination records
- [ ] Image upload for vaccination cards
- [ ] Email/SMS reminder notifications
- [ ] Multi-language support
- [ ] Offline PWA functionality
- [ ] Integration with Apple Health / Google Fit
- [ ] Travel itinerary planning
- [ ] Disease outbreak alerts
- [ ] Advanced clinic filtering (by rating, insurance accepted, etc.)
- [ ] Appointment booking integration

## Troubleshooting

### Clinic Locator Not Working

If the clinic locator feature is not working:

1. **Check your API key**: Ensure `VITE_GOOGLE_PLACES_API_KEY` is set in your `.env` file
2. **Verify API is enabled**: Make sure "Places API (New)" is enabled in Google Cloud Console
3. **Check browser console**: Look for error messages that may indicate API issues
4. **Location access**: Ensure you've granted location permissions to the browser
5. **API quota**: Check that you haven't exceeded your Google Places API quota

### Common Issues

- **"Google Places API key is missing"**: Add the API key to your `.env` file
- **No clinics found**: Try increasing the search radius or searching in a different location
- **Location not detected**: Enable location services in your browser settings

## Contributing

This is a demonstration project. For production use, consider:
1. Implementing proper API integrations for vaccination data
2. Adding user authentication
3. Enhancing data validation
4. Implementing proper error boundaries
5. Adding comprehensive testing
6. Optimizing bundle size with code splitting
7. Implementing API key rotation and security best practices

## License

MIT

## Disclaimer

This application provides general travel health information for educational purposes only. Always consult with a qualified healthcare provider or travel medicine specialist before international travel. Vaccination requirements and health recommendations may change frequently.
