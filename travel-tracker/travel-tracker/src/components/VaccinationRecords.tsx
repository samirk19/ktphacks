import { useState } from 'react';
import type { VaccinationRecord } from '../types';
import { format } from 'date-fns';

interface VaccinationRecordsProps {
  records: VaccinationRecord[];
  onAddRecord: (record: Omit<VaccinationRecord, 'id'>) => void;
  onDeleteRecord: (id: string) => void;
  onExport: () => void;
}

export const VaccinationRecords = ({
  records,
  onAddRecord,
  onDeleteRecord,
  onExport,
}: VaccinationRecordsProps) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    vaccineName: '',
    dateAdministered: '',
    nextDoseDate: '',
    lotNumber: '',
    location: '',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.vaccineName || !formData.dateAdministered) {
      alert('Please fill in required fields');
      return;
    }

    const record: Omit<VaccinationRecord, 'id'> = {
      vaccineName: formData.vaccineName,
      dateAdministered: new Date(formData.dateAdministered),
      nextDoseDate: formData.nextDoseDate ? new Date(formData.nextDoseDate) : undefined,
      lotNumber: formData.lotNumber || undefined,
      location: formData.location || undefined,
      notes: formData.notes || undefined,
    };

    onAddRecord(record);
    setFormData({
      vaccineName: '',
      dateAdministered: '',
      nextDoseDate: '',
      lotNumber: '',
      location: '',
      notes: '',
    });
    setShowAddForm(false);
  };

  return (
    <div
      style={{
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
        }}
      >
        <h2 style={{ margin: 0, color: '#000000' }}>My Vaccination Records</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={onExport}
            disabled={records.length === 0}
            style={{
              padding: '10px 16px',
              backgroundColor: '#2196f3',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: records.length === 0 ? 'not-allowed' : 'pointer',
              opacity: records.length === 0 ? 0.5 : 1,
              fontSize: '14px',
              transform: 'scale(1)',
              transition: 'transform 0.15s ease, box-shadow 0.15s ease',
            }}
            onMouseEnter={(e) => {
              if (records.length === 0) return;
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,0,0,0.12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            📄 Export
          </button>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            style={{
              padding: '10px 16px',
              backgroundColor: '#4caf50',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              transform: 'scale(1)',
              transition: 'transform 0.15s ease, box-shadow 0.15s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,0,0,0.12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {showAddForm ? '✕ Cancel' : '+ Add Record'}
          </button>
        </div>
      </div>

      {showAddForm && (
        <form
          onSubmit={handleSubmit}
          style={{
            marginBottom: '20px',
            padding: '20px',
            backgroundColor: '#f5f5f5',
            borderRadius: '8px',
          }}
        >
          <h3 style={{ marginTop: 0 }}>Add Vaccination Record</h3>

          <div style={{ marginBottom: '12px' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '4px',
                fontSize: '14px',
                fontWeight: 'bold',
              }}
            >
              Vaccine Name *
            </label>
            <input
              type="text"
              value={formData.vaccineName}
              onChange={(e) =>
                setFormData({ ...formData, vaccineName: e.target.value })
              } 
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #ddd',
                backgroundColor: '#ffffff',
                color: '#000000',
              }}
              required
            />
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px',
              marginBottom: '12px',
            }}
          >
            <div>
              <label
                style={{
                  display: 'block',
                  marginBottom: '4px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                }}
              >
                Date Administered *
              </label>
              <input
                type="date"
                value={formData.dateAdministered}
                onChange={(e) =>
                  setFormData({ ...formData, dateAdministered: e.target.value })
                }
                style={{
                  width: '100%',
                  padding: '8px',
                  borderRadius: '4px',
                  border: '1px solid #ddd',
                  backgroundColor: '#ffffff',
                  color: '#000000',
                }}
                required
              />
            </div>
            <div>
              <label
                style={{
                  display: 'block',
                  marginBottom: '4px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                }}
              >
                Next Dose Date (if applicable)
              </label>
              <input
                type="date"
                value={formData.nextDoseDate}
                onChange={(e) =>
                  setFormData({ ...formData, nextDoseDate: e.target.value })
                }
                style={{
                  width: '100%',
                  padding: '8px',
                  borderRadius: '4px',
                  border: '1px solid #ddd',
                  backgroundColor: '#ffffff',
                  color: '#000000',
                }}
              />
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px',
              marginBottom: '12px',
            }}
          >
            <div>
              <label
                style={{
                  display: 'block',
                  marginBottom: '4px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                }}
              >
                Lot Number
              </label>
              <input
                type="text"
                value={formData.lotNumber}
                onChange={(e) =>
                  setFormData({ ...formData, lotNumber: e.target.value })
                }
                style={{
                  width: '100%',
                  padding: '8px',
                  borderRadius: '4px',
                  border: '1px solid #ddd',
                  backgroundColor: '#ffffff',
                  color: '#000000',
                }}
              />
            </div>
            <div>
              <label
                style={{
                  display: 'block',
                  marginBottom: '4px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                }}
              >
                Location/Clinic
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                style={{
                  width: '100%',
                  padding: '8px',
                  borderRadius: '4px',
                  border: '1px solid #ddd',
                  backgroundColor: '#ffffff',
                  color: '#000000',
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '12px' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '4px',
                fontSize: '14px',
                fontWeight: 'bold',
              }}
            >
              Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #ddd',
                minHeight: '60px',
                backgroundColor: '#ffffff',
                color: '#000000',
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              padding: '10px 20px',
              backgroundColor: '#4caf50',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              transform: 'scale(1)',
              transition: 'transform 0.15s ease, box-shadow 0.15s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,0,0,0.12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Save Record
          </button>
        </form>
      )}

      <div>
        {records.length > 0 ? (
          records.map((record) => (
            <div
              key={record.id}
              style={{
                border: '2px solid #ddd',
                borderRadius: '8px',
                padding: '16px',
                marginBottom: '12px',
                backgroundColor: '#fafafa',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                }}
              >
                <div style={{ flex: 1 }}>
                  <h3
                    style={{
                      margin: '0 0 8px 0',
                      color: '#000000',
                    }}
                  >
                    {record.vaccineName}
                  </h3>
                  <div
                    style={{
                      fontSize: '14px',
                      color: '#000000',
                      lineHeight: '1.6',
                    }}
                  >
                    <p style={{ margin: '4px 0' }}>
                      <strong>Date:</strong>{' '}
                      {format(record.dateAdministered, 'MMMM d, yyyy')}
                    </p>
                    {record.nextDoseDate && (
                      <p style={{ margin: '4px 0' }}>
                        <strong>Next Dose:</strong>{' '}
                        {format(record.nextDoseDate, 'MMMM d, yyyy')}
                      </p>
                    )}
                    {record.lotNumber && (
                      <p style={{ margin: '4px 0' }}>
                        <strong>Lot Number:</strong> {record.lotNumber}
                      </p>
                    )}
                    {record.location && (
                      <p style={{ margin: '4px 0' }}>
                        <strong>Location:</strong> {record.location}
                      </p>
                    )}
                    {record.notes && (
                      <p style={{ margin: '4px 0' }}>
                        <strong>Notes:</strong> {record.notes}
                      </p>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => onDeleteRecord(record.id)}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#f44336',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    transform: 'scale(1)',
                    transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow =
                      '0 4px 10px rgba(0,0,0,0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p style={{ color: '#000000', fontStyle: 'italic' }}>
            No vaccination records yet. Click &quot;Add Record&quot; to start
            tracking your vaccinations.
          </p>
        )}
      </div>
    </div>
  );
};
