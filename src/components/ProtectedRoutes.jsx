// components/ProtectedRoutes.jsx
import { Navigate, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuthStore } from '../stores/useAuthStore';

export default function ProtectedRoutes({ requiredRole }) {
  const { user, token, setUserFromToken } = useAuthStore();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    console.log(user, token);
    if (!user && token === null) {
      setUserFromToken();
    }
    setTimeout(() => setAuthChecked(true), 200);
  }, []);

  // Avoid checking token/user until restoration is attempted
  if (!authChecked) {
    return <div>Loading...</div>; // or null, or a spinner
  }

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    if (user.role === 'admin') { 
      return <Navigate to="/admin/locations" replace />;
    } 
    if (user.role === 'user') {
      return <Navigate to="/home" replace />;
    }
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}
