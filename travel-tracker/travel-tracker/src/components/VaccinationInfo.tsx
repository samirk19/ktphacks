import type { Vaccination } from '../types';

interface VaccinationInfoProps {
  vaccinations: Vaccination[];
  country: string;
  dataSource?: 'mock' | 'api' | 'fallback';
  lastUpdated?: Date;
}

const DataSourceBadge = ({ source, lastUpdated }: { source: 'mock' | 'api' | 'fallback', lastUpdated?: Date }) => {
  const getSourceStyle = () => {
    switch (source) {
      case 'api':
        return { bg: '#4caf50', label: '✓ Live Data', color: 'white' };
      case 'mock':
        return { bg: '#ff9800', label: '⚠ Sample Data', color: 'white' };
      case 'fallback':
        return { bg: '#f44336', label: '⚠ General Recommendations Only', color: 'white' };
    }
  };

  const style = getSourceStyle();
  const dateStr = lastUpdated ? new Date(lastUpdated).toLocaleDateString() : 'Unknown';

  return (
    <div style={{
      display: 'inline-flex',
      flexDirection: 'column',
      gap: '4px',
      alignItems: 'flex-start',
      marginBottom: '12px'
    }}>
      <span style={{
        backgroundColor: style.bg,
        color: style.color,
        padding: '6px 12px',
        borderRadius: '6px',
        fontSize: '13px',
        fontWeight: 'bold',
      }}>
        {style.label}
      </span>
      <span style={{ fontSize: '11px', color: '#666' }}>
        Last updated: {dateStr}
      </span>
      {source === 'mock' && (
        <span style={{ fontSize: '11px', color: '#ff6f00', fontStyle: 'italic', maxWidth: '400px' }}>
          This is sample data for demonstration. Consult a healthcare provider for actual travel health advice.
        </span>
      )}
      {source === 'fallback' && (
        <span style={{ fontSize: '11px', color: '#c62828', fontStyle: 'italic', maxWidth: '400px' }}>
          Country-specific data not available. Showing general travel health recommendations only.
        </span>
      )}
    </div>
  );
};

export const VaccinationInfo = ({ vaccinations, country, dataSource = 'mock', lastUpdated }: VaccinationInfoProps) => {
  const requiredVaccines = vaccinations.filter(v => v.required);
  const recommendedVaccines = vaccinations.filter(v => v.recommended && !v.required);

  return (
    <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
      <h2 style={{ marginTop: 0, color: '#333' }}>Vaccinations for {country}</h2>
      <DataSourceBadge source={dataSource} lastUpdated={lastUpdated} />

      {requiredVaccines.length > 0 && (
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ color: '#d32f2f', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '20px' }}>⚠️</span>
            Required Vaccinations
          </h3>
          {requiredVaccines.map(vaccine => (
            <VaccineCard key={vaccine.id} vaccine={vaccine} type="required" />
          ))}
        </div>
      )}

      {recommendedVaccines.length > 0 && (
        <div>
          <h3 style={{ color: '#1976d2', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '20px' }}>💉</span>
            Recommended Vaccinations
          </h3>
          {recommendedVaccines.map(vaccine => (
            <VaccineCard key={vaccine.id} vaccine={vaccine} type="recommended" />
          ))}
        </div>
      )}

      {vaccinations.length === 0 && (
        <p style={{ color: '#666', fontStyle: 'italic' }}>
          No specific vaccination requirements found for this destination.
          Please consult with a healthcare provider for personalized advice.
        </p>
      )}
    </div>
  );
};

interface VaccineCardProps {
  vaccine: Vaccination;
  type: 'required' | 'recommended';
}

const VaccineCard = ({ vaccine, type }: VaccineCardProps) => {
  const borderColor = type === 'required' ? '#d32f2f' : '#1976d2';

  return (
    <div
      style={{
        border: `2px solid ${borderColor}`,
        borderRadius: '8px',
        padding: '16px',
        marginBottom: '12px',
        backgroundColor: type === 'required' ? '#ffebee' : '#e3f2fd',
      }}
    >
      <h4 style={{ margin: '0 0 8px 0', color: '#333' }}>{vaccine.name}</h4>
      <p style={{ margin: '0 0 8px 0', color: '#666', fontSize: '14px' }}>
        {vaccine.description}
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', fontSize: '14px' }}>
        <div>
          <strong>Doses:</strong> {vaccine.doses}
        </div>
      </div>

      {vaccine.doseSchedule && vaccine.doseSchedule.length > 0 && (
        <div style={{ marginTop: '12px' }}>
          <strong style={{ fontSize: '14px' }}>Dose Schedule:</strong>
          <ul style={{ margin: '4px 0 0 0', paddingLeft: '20px' }}>
            {vaccine.doseSchedule.map((schedule, index) => (
              <li key={index} style={{ fontSize: '14px', color: '#666' }}>{schedule}</li>
            ))}
          </ul>
        </div>
      )}

      {vaccine.sideEffects && vaccine.sideEffects.length > 0 && (
        <div style={{ marginTop: '12px' }}>
          <strong style={{ fontSize: '14px' }}>Possible Side Effects:</strong>
          <ul style={{ margin: '4px 0 0 0', paddingLeft: '20px' }}>
            {vaccine.sideEffects.map((effect, index) => (
              <li key={index} style={{ fontSize: '14px', color: '#666' }}>{effect}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
