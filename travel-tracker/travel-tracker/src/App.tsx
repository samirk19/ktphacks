import { useState, useEffect } from 'react';
import './App.css';
import { Globe } from './components/Globe';
import { DestinationSearch } from './components/DestinationSearch';
import { VaccinationInfo } from './components/VaccinationInfo';
import { HealthPrecautions } from './components/HealthPrecautions';
import { VaccinationReminders } from './components/VaccinationReminders';
import { VaccinationRecords } from './components/VaccinationRecords';
import { ClinicLocator } from './components/ClinicLocator';
import type { Location, FlightPath, VaccinationRecord, VaccinationReminder, CountryHealthInfo } from './types';
import { getUserLocation } from './utils/geolocation';
import { getCountryHealthInfo } from './services/vaccinationService';
import {
  loadVaccinationRecords,
  saveVaccinationRecords,
  loadVaccinationReminders,
  saveVaccinationReminders,
  exportVaccinationRecordsToJSON,
} from './utils/storage';

type TabType = 'vaccinations' | 'precautions' | 'reminders' | 'records' | 'clinics';

function App() {
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [destination, setDestination] = useState<Location | null>(null);
  const [flightPaths, setFlightPaths] = useState<FlightPath[]>([]);
  const [healthInfo, setHealthInfo] = useState<CountryHealthInfo | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('vaccinations');
  const [vaccinationRecords, setVaccinationRecords] = useState<VaccinationRecord[]>([]);
  const [vaccinationReminders, setVaccinationReminders] = useState<VaccinationReminder[]>([]);

  // Load user location on mount
  useEffect(() => {
    const loadUserLocation = async () => {
      try {
        const location = await getUserLocation();
        setUserLocation(location);
      } catch (error) {
        console.error('Error getting user location:', error);
      } finally {
        setIsLoadingLocation(false);
      }
    };

    loadUserLocation();
  }, []);

  // Load saved data from localStorage
  useEffect(() => {
    const records = loadVaccinationRecords();
    const reminders = loadVaccinationReminders();
    setVaccinationRecords(records);
    setVaccinationReminders(reminders);
  }, []);

  const handleDestinationSelect = async (location: Location) => {
    setDestination(location);

    // Create flight path
    if (userLocation) {
      const path: FlightPath = {
        from: userLocation,
        to: location,
        color: '#ff6b6b',
      };
      setFlightPaths([path]);
    }

    // Fetch vaccination and health info
    const info = await getCountryHealthInfo(location.country);
    setHealthInfo(info);

    // Auto-switch to vaccinations tab when destination is selected
    setActiveTab('vaccinations');
  };

  const handleAddRecord = (record: Omit<VaccinationRecord, 'id'>) => {
    const newRecord: VaccinationRecord = {
      ...record,
      id: Date.now().toString(),
    };

    const updatedRecords = [...vaccinationRecords, newRecord];
    setVaccinationRecords(updatedRecords);
    saveVaccinationRecords(updatedRecords);

    // If there's a next dose date, create a reminder
    if (newRecord.nextDoseDate) {
      const reminder: VaccinationReminder = {
        id: `reminder-${Date.now()}`,
        vaccinationRecordId: newRecord.id,
        vaccineName: newRecord.vaccineName,
        scheduledDate: newRecord.nextDoseDate,
        completed: false,
        doseNumber: 2, // Assuming second dose
        totalDoses: 2,
      };

      const updatedReminders = [...vaccinationReminders, reminder];
      setVaccinationReminders(updatedReminders);
      saveVaccinationReminders(updatedReminders);
    }
  };

  const handleDeleteRecord = (id: string) => {
    const updatedRecords = vaccinationRecords.filter(r => r.id !== id);
    setVaccinationRecords(updatedRecords);
    saveVaccinationRecords(updatedRecords);

    // Also delete associated reminders
    const updatedReminders = vaccinationReminders.filter(r => r.vaccinationRecordId !== id);
    setVaccinationReminders(updatedReminders);
    saveVaccinationReminders(updatedReminders);
  };

  const handleCompleteReminder = (id: string) => {
    const updatedReminders = vaccinationReminders.map(r =>
      r.id === id ? { ...r, completed: true } : r
    );
    setVaccinationReminders(updatedReminders);
    saveVaccinationReminders(updatedReminders);
  };

  const handleDeleteReminder = (id: string) => {
    const updatedReminders = vaccinationReminders.filter(r => r.id !== id);
    setVaccinationReminders(updatedReminders);
    saveVaccinationReminders(updatedReminders);
  };

  const handleExportRecords = () => {
    const json = exportVaccinationRecordsToJSON(vaccinationRecords);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vaccination-records-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Travel Vaccination Tracker</h1>
        <p>Plan your trip and stay healthy with personalized vaccination recommendations</p>
      </header>

      <div className="main-content">
        <div className="search-section">
          <DestinationSearch
            onDestinationSelect={handleDestinationSelect}
            disabled={isLoadingLocation}
          />
        </div>

        <div className="globe-section">
          <h2 style={{ marginTop: 0 }}>Interactive Travel Globe</h2>
          {isLoadingLocation ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <p>Loading your location...</p>
            </div>
          ) : (
            <div className="globe-container">
              <Globe
                flightPaths={flightPaths}
                userLocation={userLocation}
                destination={destination}
              />
            </div>
          )}
          {userLocation && (
            <p style={{ textAlign: 'center', marginTop: '16px', color: '#666' }}>
              Your location: {userLocation.name}, {userLocation.country}
            </p>
          )}
          {destination && (
            <p style={{ textAlign: 'center', marginTop: '8px', color: '#4CAF50', fontWeight: 'bold' }}>
              Destination: {destination.name}, {destination.country}
            </p>
          )}
        </div>

        <div className="info-section" style={{ gridColumn: '1 / -1' }}>
          <div className="tabs">
            <button
              className={`tab-button ${activeTab === 'vaccinations' ? 'active' : ''}`}
              onClick={() => setActiveTab('vaccinations')}
            >
              Vaccinations
            </button>
            <button
              className={`tab-button ${activeTab === 'precautions' ? 'active' : ''}`}
              onClick={() => setActiveTab('precautions')}
            >
              Health Precautions
            </button>
            <button
              className={`tab-button ${activeTab === 'reminders' ? 'active' : ''}`}
              onClick={() => setActiveTab('reminders')}
            >
              Reminders ({vaccinationReminders.filter(r => !r.completed).length})
            </button>
            <button
              className={`tab-button ${activeTab === 'records' ? 'active' : ''}`}
              onClick={() => setActiveTab('records')}
            >
              My Records ({vaccinationRecords.length})
            </button>
            <button
              className={`tab-button ${activeTab === 'clinics' ? 'active' : ''}`}
              onClick={() => setActiveTab('clinics')}
            >
              Find Clinics
            </button>
          </div>

          {activeTab === 'vaccinations' && (
            healthInfo ? (
              <VaccinationInfo
                vaccinations={healthInfo.vaccinations}
                country={healthInfo.country}
                dataSource={healthInfo.dataSource}
                lastUpdated={healthInfo.lastUpdated}
              />
            ) : (
              <div style={{ padding: '40px', textAlign: 'center', backgroundColor: 'white', borderRadius: '12px' }}>
                <p style={{ fontSize: '18px', color: '#666' }}>
                  Select a destination to view vaccination requirements
                </p>
              </div>
            )
          )}

          {activeTab === 'precautions' && (
            healthInfo ? (
              <HealthPrecautions
                precautions={healthInfo.healthPrecautions}
                country={healthInfo.country}
                dataSource={healthInfo.dataSource}
                lastUpdated={healthInfo.lastUpdated}
              />
            ) : (
              <div style={{ padding: '40px', textAlign: 'center', backgroundColor: 'white', borderRadius: '12px' }}>
                <p style={{ fontSize: '18px', color: '#666' }}>
                  Select a destination to view health precautions
                </p>
              </div>
            )
          )}

          {activeTab === 'reminders' && (
            <VaccinationReminders
              reminders={vaccinationReminders}
              onCompleteReminder={handleCompleteReminder}
              onDeleteReminder={handleDeleteReminder}
            />
          )}

          {activeTab === 'records' && (
            <VaccinationRecords
              records={vaccinationRecords}
              onAddRecord={handleAddRecord}
              onDeleteRecord={handleDeleteRecord}
              onExport={handleExportRecords}
            />
          )}

          {activeTab === 'clinics' && (
            <ClinicLocator userLocation={userLocation} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
