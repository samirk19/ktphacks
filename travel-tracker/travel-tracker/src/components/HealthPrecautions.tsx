import type { HealthPrecaution } from '../types';

interface HealthPrecautionsProps {
  precautions: HealthPrecaution[];
  country?: string;
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

export const HealthPrecautions = ({ precautions, country, dataSource = 'mock', lastUpdated }: HealthPrecautionsProps) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'medication': return '💊';
      case 'warning': return '⚠️';
      case 'advice': return 'ℹ️';
      default: return '📋';
    }
  };

  const getColor = (severity?: string) => {
    switch (severity) {
      case 'high': return { bg: '#ffebee', border: '#d32f2f', text: '#b71c1c' };
      case 'medium': return { bg: '#fff3e0', border: '#f57c00', text: '#e65100' };
      case 'low': return { bg: '#e8f5e9', border: '#388e3c', text: '#1b5e20' };
      default: return { bg: '#e3f2fd', border: '#1976d2', text: '#0d47a1' };
    }
  };

  return (
    <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
      <h2 style={{ marginTop: 0, color: '#333' }}>Health Precautions & Medications{country ? ` for ${country}` : ''}</h2>
      <DataSourceBadge source={dataSource} lastUpdated={lastUpdated} />

      {precautions.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {precautions.map(precaution => {
            const colors = getColor(precaution.severity);
            return (
              <div
                key={precaution.id}
                style={{
                  border: `2px solid ${colors.border}`,
                  borderRadius: '8px',
                  padding: '16px',
                  backgroundColor: colors.bg,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '24px' }}>{getIcon(precaution.type)}</span>
                  <h3 style={{ margin: 0, color: colors.text }}>{precaution.title}</h3>
                </div>
                <p style={{ margin: 0, color: '#666', fontSize: '14px', lineHeight: '1.6' }}>
                  {precaution.description}
                </p>
                {precaution.severity && (
                  <div style={{ marginTop: '8px' }}>
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        backgroundColor: colors.border,
                        color: 'white',
                      }}
                    >
                      {precaution.severity.toUpperCase()} PRIORITY
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <p style={{ color: '#666', fontStyle: 'italic' }}>
          No specific health precautions found for this destination.
        </p>
      )}
    </div>
  );
};
