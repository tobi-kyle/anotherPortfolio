import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Qualification from './pages/Qualification';
import Services from './pages/Services';
import Contact from './pages/Contact';
import AdminDashboard from './admin/AdminDashboard';
import SignIn from './pages/SignIn';
import Register from './pages/Register';
import auth from './lib/auth-helper';
import ProjectManager from './admin/ProjectManager';
import QualificationManager from './admin/QualificationManager';


export default function MainRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/qualification" element={<Qualification />} />
      <Route path="/services" element={<Services />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/projects/edit/:id" element={<ProjectManager />} />
      <Route path="/qualification/edit/:id" element={<QualificationManager />} />
      <Route path="/projects/add" element={<ProjectManager />} />
      {/* Admin Dashboard - Protected */}
      <Route
        path="/admin"
        element={auth.isAdmin() ? <AdminDashboard /> : <Navigate to="/signin" />}
      />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/register" element={<Register />} />
      {/* Catch-all 404 (optional) */}
      <Route path="*" element={<h2 style={{padding: '2rem'}}>404 - Page Not Found</h2>} />
    </Routes>
  );
}
