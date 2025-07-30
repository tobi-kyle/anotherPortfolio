import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Qualification from './pages/Qualification';
import Services from './pages/Services';
import Contact from './pages/Contact';
import AdminDashboard from './admin/AdminDashboard';
import SignIn from './pages/SignIn';
import Register from './pages/Register';
import ProjectManager from './admin/ProjectManager';
import QualificationManager from './admin/QualificationManager';
import PrivateAdminRoute from './admin/PrivateAdminRoute'; 

export default function MainRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/qualification" element={<Qualification />} />
      <Route path="/services" element={<Services />} />
      <Route path="/contact" element={<Contact />} />
      <Route
        path="/admin"
        element={
          <PrivateAdminRoute>
            <AdminDashboard />
          </PrivateAdminRoute>
        }
      />
      <Route
        path="/projects/edit/:id"
        element={
          <PrivateAdminRoute>
            <ProjectManager />
          </PrivateAdminRoute>
        }
      />
      <Route
        path="/qualification/edit/:id"
        element={
          <PrivateAdminRoute>
            <QualificationManager />
          </PrivateAdminRoute>
        }
      />
      <Route
        path="/projects/add"
        element={
          <PrivateAdminRoute>
            <ProjectManager />
          </PrivateAdminRoute>
        }
      />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<h2 style={{ padding: '2rem' }}>404 - Page Not Found</h2>} />
    </Routes>
  );
}
