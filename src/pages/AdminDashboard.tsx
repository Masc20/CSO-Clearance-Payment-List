import React, { useEffect, useState } from 'react';
import type { StudentSubmission, AppSettings } from '../types';
import * as XLSX from 'xlsx';
import { Header } from '../components/Header';
import { Download, Trash2, Settings, Plus, X, Edit } from 'lucide-react';
import { getSubmissions, getSettings, saveSettings, deleteSubmission, updateSubmission } from '../utils/dataManager';

export const AdminDashboard: React.FC = () => {
  const [submissions, setSubmissions] = useState<StudentSubmission[]>([]);
  const [settings, setSettings] = useState<AppSettings | null>(null);
  
  // Filters
  const [textFilter, setTextFilter] = useState('');
  const [sectionFilter, setSectionFilter] = useState('All');

  // Settings UI State
  const [showSettings, setShowSettings] = useState(false);
  const [newSection, setNewSection] = useState('');
  const [amountInput, setAmountInput] = useState<number>(10);

  // Edit UI State
  const [editingSub, setEditingSub] = useState<StudentSubmission | null>(null);

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    setSubmissions(getSubmissions());
    const currentSettings = getSettings();
    setSettings(currentSettings);
    setAmountInput(currentSettings.amount);
  };

  // --- Settings Handlers ---
  const handleAddSection = () => {
    if (!settings || !newSection.trim()) return;
    if (settings.sections.includes(newSection.trim())) return;
    
    const updatedSettings = { ...settings, sections: [...settings.sections, newSection.trim()] };
    saveSettings(updatedSettings);
    setSettings(updatedSettings);
    setNewSection('');
  };

  const handleDeleteSection = (section: string) => {
    if (!settings) return;
    if (!confirm(`Delete section "${section}"?`)) return;
    const updatedSettings = { ...settings, sections: settings.sections.filter(s => s !== section) };
    saveSettings(updatedSettings);
    setSettings(updatedSettings);
  };

  const handleSaveAmount = () => {
    if (!settings) return;
    const updatedSettings = { ...settings, amount: amountInput };
    saveSettings(updatedSettings);
    setSettings(updatedSettings);
    alert('Amount updated successfully!');
  };

  // --- Data Handlers ---
  const handleDelete = (id: string) => {
    if(!confirm('Are you sure you want to delete this record?')) return;
    deleteSubmission(id);
    refreshData();
  };

  const handleEditSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingSub) {
      updateSubmission(editingSub);
      setEditingSub(null);
      refreshData();
    }
  };

  // --- Export & Filter Logic ---
  const filteredSubmissions = submissions.filter(s => {
    const fullName = `${s.lastName} ${s.firstName} ${s.middleName}`.toLowerCase();
    const searchMatch = fullName.includes(textFilter.toLowerCase()) || 
                        s.section.toLowerCase().includes(textFilter.toLowerCase());
    
    const sectionMatch = sectionFilter === 'All' || 
                         `${s.course} - ${s.section}` === sectionFilter; // Exact match on full string

    return searchMatch && sectionMatch;
  });

  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(filteredSubmissions);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Payments");
    XLSX.writeFile(wb, "CSO_Clearance_Payments.xlsx");
  };

  if (!settings) return <div>Loading...</div>;

  return (
    <div className="container">
      <Header />
      
      {/* Settings Toggle */}
      <div className="settings-toggle">
        <button onClick={() => setShowSettings(!showSettings)} className="btn-secondary">
          <Settings size={16} style={{marginRight: '8px'}} /> 
          {showSettings ? 'Hide Settings' : 'Manage Settings'}
        </button>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="card full-width settings-panel">
          <h3>Settings</h3>
          
          <div className="settings-group">
            <h4>Default Payment Amount</h4>
            <div className="row">
              <input 
                type="number" 
                value={amountInput} 
                onChange={(e) => setAmountInput(Number(e.target.value))}
                style={{maxWidth: '150px'}}
              />
              <button onClick={handleSaveAmount} className="btn-small btn-primary">Save</button>
            </div>
          </div>

          <div className="settings-group">
            <h4>Manage Courses & Sections</h4>
            <div className="row" style={{marginBottom: '1rem'}}>
              <input 
                placeholder="e.g. BSIT - 1A" 
                value={newSection} 
                onChange={(e) => setNewSection(e.target.value)} 
              />
              <button onClick={handleAddSection} className="btn-small btn-success"><Plus size={16}/></button>
            </div>
            <div className="tags-container">
              {settings.sections.map(sec => (
                <span key={sec} className="tag">
                  {sec}
                  <button onClick={() => handleDeleteSection(sec)} className="tag-remove"><X size={12}/></button>
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="card full-width">
        <div className="admin-header">
          <h2>Admin Dashboard</h2>
          <button onClick={handleExport} className="btn-success">
            <Download size={16} style={{marginRight: '8px'}}/> Export Filtered ({filteredSubmissions.length})
          </button>
        </div>

        {/* Filters */}
        <div className="filter-bar row">
          <div className="form-group half">
            <input 
              type="text" 
              placeholder="Search by name..." 
              value={textFilter}
              onChange={(e) => setTextFilter(e.target.value)}
            />
          </div>
          <div className="form-group half">
            <select value={sectionFilter} onChange={(e) => setSectionFilter(e.target.value)}>
              <option value="All">All Sections</option>
              {settings.sections.map(sec => (
                <option key={sec} value={sec}>{sec}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Course & Section</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubmissions.length === 0 ? (
                <tr><td colSpan={5} style={{textAlign: 'center'}}>No records found</td></tr>
              ) : (
                filteredSubmissions.map((sub) => (
                  <tr key={sub.id}>
                    <td>{sub.lastName}, {sub.firstName} {sub.middleName}</td>
                    <td>{sub.course} - {sub.section}</td>
                    <td>₱{sub.amount}</td>
                    <td>{new Date(sub.timestamp).toLocaleDateString()}</td>
                    <td className="actions-cell">
                      <button onClick={() => setEditingSub(sub)} className="btn-icon">
                        <Edit size={16} />
                      </button>
                      <button onClick={() => handleDelete(sub.id)} className="btn-icon danger">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {editingSub && (
        <div className="modal-overlay">
          <div className="modal card">
            <h3>Edit Submission</h3>
            <form onSubmit={handleEditSave}>
              <div className="form-group">
                <label>First Name</label>
                <input value={editingSub.firstName} onChange={e => setEditingSub({...editingSub, firstName: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input value={editingSub.lastName} onChange={e => setEditingSub({...editingSub, lastName: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Middle Name</label>
                <input value={editingSub.middleName} onChange={e => setEditingSub({...editingSub, middleName: e.target.value})} />
              </div>
               <div className="form-group">
                <label>Course & Section</label>
                {/* We reconstruct the dropdown value or allow manual edit if custom */}
                <select 
                  value={`${editingSub.course} - ${editingSub.section}`} 
                  onChange={e => {
                    const [c, ...sParts] = e.target.value.split(' - ');
                    setEditingSub({...editingSub, course: c, section: sParts.join(' - ')})
                  }}
                >
                  {settings.sections.map(sec => (
                    <option key={sec} value={sec}>{sec}</option>
                  ))}
                </select>
              </div>
              <div className="row">
                <button type="button" onClick={() => setEditingSub(null)} className="btn-secondary half">Cancel</button>
                <button type="submit" className="btn-primary half">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};