import type { Vaccination } from '../types';

interface VaccinationInfoProps {
  vaccinations: Vaccination[];
  country: string;
}

export const VaccinationInfo = ({ vaccinations, country }: VaccinationInfoProps) => {
  const requiredVaccines = vaccinations.filter(v => v.required);
  const recommendedVaccines = vaccinations.filter(v => v.recommended && !v.required);

  return (
    <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
      <h2 style={{ marginTop: 0, color: '#333' }}>Vaccinations for {country}</h2>

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
