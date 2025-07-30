
import { Navigate } from 'react-router-dom';
import auth from '../lib/auth-helper';

export default function PrivateAdminRoute({ children }) {
  const isAdmin = auth.isAdmin();
  return isAdmin ? children : <Navigate to="/signin" />;
}
