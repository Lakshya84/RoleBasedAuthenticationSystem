// filepath: c:\Users\laksh\Desktop\Lakshya Pandey_HIT-Task-4-Capsi\frontend\src\pages\Login.jsx
import React, { useState } from 'react';
import axios from 'axios';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get the list of users from localStorage
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

    // Find the user with matching email and password
    const user = existingUsers.find(
      (u) => u.email === formData.email && u.password === formData.password
    );

    if (user) {
      alert('Login successful!');

      // Save the token, role, and name in localStorage
      localStorage.setItem('token', 'mock-token'); // Mock token
      localStorage.setItem('role', user.role); // Save the user's role
      localStorage.setItem('name', user.name); // Save the user's name

      // Redirect to the dashboard
      window.location.href = '/dashboard';
    } else {
      alert('Login failed! Invalid credentials.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
        />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Login
        </button>
      </form>
    </div>
  );
}