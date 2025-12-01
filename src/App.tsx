import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { StudentForm } from './pages/StudentForm';
import { AdminDashboard } from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <nav className="main-nav">
          <Link to="/" className="nav-link">Student Form</Link>
          {/* <Link to="/admin" className="nav-link">Admin Dashboard</Link> */}
        </nav>
        <Routes>
          <Route path="/" element={<StudentForm />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;