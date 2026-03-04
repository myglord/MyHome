import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contextApi/AuthContext';

export default function AdminRoute({ children }) {
  const { isAdmin, initialized } = useAuth();
  const location = useLocation();

  if (!initialized) {
    return (
      <div className="d-flex align-items-center justify-content-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  if (!isAdmin) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }
  return children;
}
