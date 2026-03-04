import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contextApi/AuthContext';

const AdminDashboard = () => {
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  if (!isAdmin) {
    navigate('/admin/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-vh-100 bg-gray-100">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link to="/admin" className="navbar-brand">MyHome Admin</Link>
          <div className="d-flex align-items-center gap-3">
            <span className="text-white small">{user?.email}</span>
            <Link to="/admin/add-listing" className="btn btn-outline-light btn-sm">Add Listing</Link>
            <Link to="/" className="btn btn-outline-light btn-sm">View Site</Link>
            <button onClick={handleLogout} className="btn btn-outline-danger btn-sm">Logout</button>
          </div>
        </div>
      </nav>
      <div className="container py-5">
        <h2 className="mb-4">Admin Dashboard</h2>
        <div className="row g-4">
          <div className="col-md-4">
            <Link to="/admin/add-listing" className="card text-decoration-none text-dark h-100">
              <div className="card-body">
                <h5 className="card-title">Add Listing</h5>
                <p className="card-text text-muted">Add a new property to the site.</p>
              </div>
            </Link>
          </div>
          <div className="col-md-4">
            <a href="/" className="card text-decoration-none text-dark h-100">
              <div className="card-body">
                <h5 className="card-title">View Site</h5>
                <p className="card-text text-muted">Go to the public website.</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
