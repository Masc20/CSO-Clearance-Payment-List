import { DEFAULT_SETTINGS } from '../types';
import type { StudentSubmission, AppSettings } from '../types';

const STORAGE_KEYS = {
  SUBMISSIONS: 'cso_payments',
  SETTINGS: 'cso_settings'
};

export const getSettings = (): AppSettings => {
  const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
  if (!stored) {
    return DEFAULT_SETTINGS;
  }
  return JSON.parse(stored);
};

export const saveSettings = (settings: AppSettings) => {
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
};

export const getSubmissions = (): StudentSubmission[] => {
  const stored = localStorage.getItem(STORAGE_KEYS.SUBMISSIONS);
  return stored ? JSON.parse(stored) : [];
};

export const saveSubmissions = (submissions: StudentSubmission[]) => {
  localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(submissions));
};

export const addSubmission = (submission: StudentSubmission) => {
  const current = getSubmissions();
  saveSubmissions([...current, submission]);
};

export const updateSubmission = (updatedSubmission: StudentSubmission) => {
  const current = getSubmissions();
  const index = current.findIndex(s => s.id === updatedSubmission.id);
  if (index !== -1) {
    current[index] = updatedSubmission;
    saveSubmissions(current);
  }
};

export const deleteSubmission = (id: string) => {
  const current = getSubmissions();
  saveSubmissions(current.filter(s => s.id !== id));
};
