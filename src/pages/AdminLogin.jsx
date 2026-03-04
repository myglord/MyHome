import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import { api } from '../api/api';
import { useAuth } from '../contextApi/AuthContext';

const AdminLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: yup.object({
      email: yup.string().email('Invalid email').required('Email required'),
      password: yup.string().required('Password required'),
    }),
    onSubmit: async (values) => {
      try {
        const res = await api.login(values);
        if (!res.isAdmin) {
          toast.error('Admin access only. Use the user login for regular accounts.', { theme: 'colored' });
          return;
        }
        login(res.user, true);
        toast.success('Welcome back, Admin.', { theme: 'colored' });
        navigate('/admin');
      } catch (err) {
        toast.error(err.message || 'Invalid credentials.', { theme: 'colored' });
      }
    },
  });

  return (
    <>
      <ToastContainer />
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-gray-100 p-4">
        <div className="card shadow-sm" style={{ maxWidth: 400, width: '100%' }}>
          <div className="card-body p-4">
            <h3 className="text-center mb-4">Admin Login</h3>
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
                  placeholder="admin1@gmail.com"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="invalid-feedback">{formik.errors.email}</div>
                )}
              </div>
              <div className="mb-4">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password && (
                  <div className="invalid-feedback">{formik.errors.password}</div>
                )}
              </div>
              <button type="submit" className="btn btn-main w-100 mb-3">
                Sign in
              </button>
              <a href="/" className="d-block text-center text-muted small">Back to site</a>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
