import type { VaccinationRecord, VaccinationReminder } from '../types';

const STORAGE_KEYS = {
  VACCINATION_RECORDS: 'vaccination_records',
  VACCINATION_REMINDERS: 'vaccination_reminders',
};

// Helper to serialize dates
const serializeRecord = (record: VaccinationRecord) => ({
  ...record,
  dateAdministered: record.dateAdministered.toISOString(),
  nextDoseDate: record.nextDoseDate?.toISOString(),
});

const deserializeRecord = (data: any): VaccinationRecord => ({
  ...data,
  dateAdministered: new Date(data.dateAdministered),
  nextDoseDate: data.nextDoseDate ? new Date(data.nextDoseDate) : undefined,
});

const serializeReminder = (reminder: VaccinationReminder) => ({
  ...reminder,
  scheduledDate: reminder.scheduledDate.toISOString(),
});

const deserializeReminder = (data: any): VaccinationReminder => ({
  ...data,
  scheduledDate: new Date(data.scheduledDate),
});

// Vaccination Records
export const saveVaccinationRecords = (records: VaccinationRecord[]): void => {
  try {
    const serialized = records.map(serializeRecord);
    localStorage.setItem(STORAGE_KEYS.VACCINATION_RECORDS, JSON.stringify(serialized));
  } catch (error) {
    console.error('Error saving vaccination records:', error);
  }
};

export const loadVaccinationRecords = (): VaccinationRecord[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.VACCINATION_RECORDS);
    if (!data) return [];
    const parsed = JSON.parse(data);
    return parsed.map(deserializeRecord);
  } catch (error) {
    console.error('Error loading vaccination records:', error);
    return [];
  }
};

export const addVaccinationRecord = (record: VaccinationRecord): void => {
  const records = loadVaccinationRecords();
  records.push(record);
  saveVaccinationRecords(records);
};

export const deleteVaccinationRecord = (id: string): void => {
  const records = loadVaccinationRecords();
  const filtered = records.filter(r => r.id !== id);
  saveVaccinationRecords(filtered);
};

// Vaccination Reminders
export const saveVaccinationReminders = (reminders: VaccinationReminder[]): void => {
  try {
    const serialized = reminders.map(serializeReminder);
    localStorage.setItem(STORAGE_KEYS.VACCINATION_REMINDERS, JSON.stringify(serialized));
  } catch (error) {
    console.error('Error saving vaccination reminders:', error);
  }
};

export const loadVaccinationReminders = (): VaccinationReminder[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.VACCINATION_REMINDERS);
    if (!data) return [];
    const parsed = JSON.parse(data);
    return parsed.map(deserializeReminder);
  } catch (error) {
    console.error('Error loading vaccination reminders:', error);
    return [];
  }
};

export const addVaccinationReminder = (reminder: VaccinationReminder): void => {
  const reminders = loadVaccinationReminders();
  reminders.push(reminder);
  saveVaccinationReminders(reminders);
};

export const updateVaccinationReminder = (id: string, updates: Partial<VaccinationReminder>): void => {
  const reminders = loadVaccinationReminders();
  const index = reminders.findIndex(r => r.id === id);
  if (index !== -1) {
    reminders[index] = { ...reminders[index], ...updates };
    saveVaccinationReminders(reminders);
  }
};

export const deleteVaccinationReminder = (id: string): void => {
  const reminders = loadVaccinationReminders();
  const filtered = reminders.filter(r => r.id !== id);
  saveVaccinationReminders(filtered);
};

// Export to JSON
export const exportVaccinationRecordsToJSON = (records: VaccinationRecord[]): string => {
  const serialized = records.map(serializeRecord);
  return JSON.stringify(serialized, null, 2);
};

// Clear all data
export const clearAllData = (): void => {
  localStorage.removeItem(STORAGE_KEYS.VACCINATION_RECORDS);
  localStorage.removeItem(STORAGE_KEYS.VACCINATION_REMINDERS);
};
