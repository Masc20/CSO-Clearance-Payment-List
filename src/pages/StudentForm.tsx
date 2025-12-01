import React, { useState, useEffect } from 'react';
import type { StudentSubmission, AppSettings } from '../types';
import { Header } from '../components/Header';
import { getSettings, addSubmission } from '../utils/dataManager';

export const StudentForm: React.FC = () => {
  const [settings, setSettings] = useState<AppSettings | null>(null);
  const [step, setStep] = useState<'select-section' | 'input-details'>('select-section');
  
  const [selectedSection, setSelectedSection] = useState('');
  const [studentData, setStudentData] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
  });
  
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const currentSettings = getSettings();
    setSettings(currentSettings);
  }, []);

  const handleSectionSelect = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSection) {
      setError('Please select a section to proceed.');
      return;
    }
    setError('');
    setStep('input-details');
  };

  const handleStudentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudentData({ ...studentData, [e.target.name]: e.target.value });
  };

  const handleBack = () => {
    setStep('select-section');
    setError('');
    setSubmitted(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!settings) {
      setError('Application settings not loaded.');
      return;
    }

    // Parse Course and Section from the combined string
    const [course, ...sectionParts] = selectedSection.split(' - ');
    const section = sectionParts.join(' - ');

    const newSubmission: StudentSubmission = {
      id: crypto.randomUUID(),
      firstName: studentData.firstName,
      lastName: studentData.lastName,
      middleName: studentData.middleName,
      course: course || 'Unknown',
      section: section || 'Unknown',
      amount: settings.amount,
      timestamp: new Date().toISOString(),
    };

    addSubmission(newSubmission);
    
    setSubmitted(true);
    // Only clear student data, keep the selected section
    setStudentData({ 
      firstName: '', 
      lastName: '', 
      middleName: '', 
    });
    
    setTimeout(() => setSubmitted(false), 3000);
  };

  if (!settings) return <div className="container" style={{marginTop: '2rem', textAlign: 'center'}}>Loading settings...</div>;

  return (
    <div className="container">
      <Header />
      
      {step === 'select-section' ? (
        // STEP 1: SELECT SECTION
        <div className="card">
          <h2>Select Section</h2>
          {error && <div className="alert error">{error}</div>}
          <form onSubmit={handleSectionSelect}>
            <div className="form-group">
              <label>Course & Section</label>
              <select 
                required 
                value={selectedSection} 
                onChange={(e) => setSelectedSection(e.target.value)}
                style={{ fontSize: '1.1rem', padding: '1rem' }}
              >
                <option value="">--- Select Your Section ---</option>
                {Array.isArray(settings.sections) && settings.sections.map(sec => (
                  <option key={sec} value={sec}>{sec}</option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn-primary">Next</button>
          </form>
        </div>
      ) : (
        // STEP 2: INPUT STUDENT DETAILS
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2>Student Information</h2>
            <button onClick={handleBack} className="btn-secondary btn-small">Change Section</button>
          </div>
          
          <div className="alert" style={{ background: '#e2e6ea', color: '#333', border: '1px solid #dae0e5' }}>
            <strong>Current Section:</strong> {selectedSection}
          </div>

          {submitted && <div className="alert success">Payment recorded! Enter next student.</div>}
          {error && <div className="alert error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>First Name</label>
              <input 
                required 
                name="firstName" 
                value={studentData.firstName} 
                onChange={handleStudentChange} 
                placeholder="Enter first name"
                autoFocus 
              />
            </div>
            
            <div className="form-group">
              <label>Last Name</label>
              <input 
                required 
                name="lastName" 
                value={studentData.lastName} 
                onChange={handleStudentChange} 
                placeholder="Enter last name" 
              />
            </div>

            <div className="form-group">
              <label>Middle Name</label>
              <input 
                name="middleName" 
                value={studentData.middleName} 
                onChange={handleStudentChange} 
                placeholder="Enter middle name" 
              />
            </div>

            <div className="form-group">
              <label>Amount (PHP)</label>
              <input value={settings.amount ?? 0} readOnly className="readonly-input" />
            </div>

            <button type="submit" className="btn-primary">Submit Payment</button>
          </form>
        </div>
      )}
    </div>
  );
};