import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role'); // Assume the role is stored in localStorage after login

  if (!token) {
    // If no token, redirect to login
    return <Navigate to="/" />;
  }

  if (!allowedRoles.includes(userRole)) {
    // If the user's role is not allowed, redirect to the dashboard
    return <Navigate to="/dashboard" />;
  }

  // If authorized, render the children components
  return children;
}