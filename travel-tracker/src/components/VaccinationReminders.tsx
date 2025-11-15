import { useState, useEffect } from 'react';
import type { VaccinationReminder } from '../types';
import { format, isBefore, isToday, addDays } from 'date-fns';

interface VaccinationRemindersProps {
  reminders: VaccinationReminder[];
  onCompleteReminder: (id: string) => void;
  onDeleteReminder: (id: string) => void;
}

export const VaccinationReminders = ({
  reminders,
  onCompleteReminder,
  onDeleteReminder
}: VaccinationRemindersProps) => {
  const [sortedReminders, setSortedReminders] = useState<VaccinationReminder[]>([]);

  useEffect(() => {
    const sorted = [...reminders].sort((a, b) =>
      a.scheduledDate.getTime() - b.scheduledDate.getTime()
    );
    setSortedReminders(sorted);
  }, [reminders]);

  const upcomingReminders = sortedReminders.filter(r => !r.completed && !isBefore(r.scheduledDate, new Date()));
  const overdueReminders = sortedReminders.filter(r => !r.completed && isBefore(r.scheduledDate, new Date()));
  const completedReminders = sortedReminders.filter(r => r.completed);

  const isUrgent = (date: Date) => {
    return isToday(date) || isBefore(date, addDays(new Date(), 7));
  };

  return (
    <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
      <h2 style={{ marginTop: 0, color: '#333' }}>Vaccination Reminders</h2>

      {overdueReminders.length > 0 && (
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ color: '#d32f2f', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>🔔</span>
            Overdue ({overdueReminders.length})
          </h3>
          {overdueReminders.map(reminder => (
            <ReminderCard
              key={reminder.id}
              reminder={reminder}
              isOverdue={true}
              onComplete={onCompleteReminder}
              onDelete={onDeleteReminder}
            />
          ))}
        </div>
      )}

      {upcomingReminders.length > 0 && (
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ color: '#1976d2', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>📅</span>
            Upcoming ({upcomingReminders.length})
          </h3>
          {upcomingReminders.map(reminder => (
            <ReminderCard
              key={reminder.id}
              reminder={reminder}
              isUrgent={isUrgent(reminder.scheduledDate)}
              onComplete={onCompleteReminder}
              onDelete={onDeleteReminder}
            />
          ))}
        </div>
      )}

      {completedReminders.length > 0 && (
        <div>
          <h3 style={{ color: '#388e3c', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>✅</span>
            Completed ({completedReminders.length})
          </h3>
          {completedReminders.map(reminder => (
            <ReminderCard
              key={reminder.id}
              reminder={reminder}
              onComplete={onCompleteReminder}
              onDelete={onDeleteReminder}
            />
          ))}
        </div>
      )}

      {reminders.length === 0 && (
        <p style={{ color: '#666', fontStyle: 'italic' }}>
          No vaccination reminders yet. Add vaccination records to create reminders for multi-dose series.
        </p>
      )}
    </div>
  );
};

interface ReminderCardProps {
  reminder: VaccinationReminder;
  isOverdue?: boolean;
  isUrgent?: boolean;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

const ReminderCard = ({ reminder, isOverdue, isUrgent, onComplete, onDelete }: ReminderCardProps) => {
  const getBorderColor = () => {
    if (reminder.completed) return '#4caf50';
    if (isOverdue) return '#d32f2f';
    if (isUrgent) return '#f57c00';
    return '#1976d2';
  };

  const getBackgroundColor = () => {
    if (reminder.completed) return '#e8f5e9';
    if (isOverdue) return '#ffebee';
    if (isUrgent) return '#fff3e0';
    return '#e3f2fd';
  };

  return (
    <div
      style={{
        border: `2px solid ${getBorderColor()}`,
        borderRadius: '8px',
        padding: '16px',
        marginBottom: '12px',
        backgroundColor: getBackgroundColor(),
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <h4 style={{ margin: '0 0 8px 0', color: '#333' }}>
            {reminder.vaccineName}
          </h4>
          <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: '#666' }}>
            <strong>Dose {reminder.doseNumber} of {reminder.totalDoses}</strong>
          </p>
          <p style={{ margin: '0', fontSize: '14px', color: '#666' }}>
            Scheduled: {format(reminder.scheduledDate, 'MMMM d, yyyy')}
          </p>
          {isToday(reminder.scheduledDate) && !reminder.completed && (
            <p style={{ margin: '8px 0 0 0', fontSize: '14px', color: '#d32f2f', fontWeight: 'bold' }}>
              📍 Due Today!
            </p>
          )}
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {!reminder.completed && (
            <button
              onClick={() => onComplete(reminder.id)}
              style={{
                padding: '8px 16px',
                backgroundColor: '#4caf50',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
              }}
            >
              Complete
            </button>
          )}
          <button
            onClick={() => onDelete(reminder.id)}
            style={{
              padding: '8px 16px',
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
