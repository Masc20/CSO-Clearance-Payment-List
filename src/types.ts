export interface StudentSubmission {
  id: string;
  firstName: string;
  lastName: string;
  middleName: string;
  course: string;
  section: string;
  amount: number;
  timestamp: string;
}

export interface AppSettings {
  sections: string[];
  amount: number;
}

export const DEFAULT_SETTINGS: AppSettings = {
  sections: [
    "BSIT - 1A", "BSIT - 1B", "BSIT - 2A", "BSIT - 2B", 
    "BSIT - 3A", "BSIT - 4A", 
    "BSCS - 1A", "BSCS - 2A", "BSCS - 3A", "BSCS - 4A"
  ],
  amount: 10
};