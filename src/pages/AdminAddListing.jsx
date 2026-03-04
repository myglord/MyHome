import React from 'react';
import { Link } from 'react-router-dom';
import AdminRoute from '../components/AdminRoute';
import AddListingSection from '../components/AddListingSection';
import Breadcrumb from '../common/Breadcrumb';
import PageTitle from '../common/PageTitle';

const AdminAddListing = () => {
  return (
    <AdminRoute>
      <PageTitle title="MyHome Admin - Add Listing" />
      <main className="body-bg">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            <Link to="/admin" className="navbar-brand">MyHome Admin</Link>
            <Link to="/admin" className="btn btn-outline-light btn-sm">Dashboard</Link>
          </div>
        </nav>
        <Breadcrumb pageTitle="Add Listing" pageName="Add Listing" />
        <AddListingSection />
      </main>
    </AdminRoute>
  );
};

export default AdminAddListing;
