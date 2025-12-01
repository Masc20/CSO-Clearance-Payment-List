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
    "BSIT - 11A", "BSIT - 21B", "BSIT - 12A", "BSIT - 22B", 
    "BSIT - 31A", "BSIT - 41A", 
    "BSCS - 11A", "BSCS - 21A", "BSCS - 31A", "BSCS - 41A"
  ],
  amount: 10
};