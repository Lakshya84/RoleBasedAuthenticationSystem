// filepath: c:\Users\laksh\Desktop\Lakshya Pandey_HIT-Task-4-Capsi\frontend\src\pages\Signup.jsx
import React, { useState } from 'react';
import axios from 'axios';

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get existing users from localStorage or initialize an empty array
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

    // Check if the email is already registered
    const userExists = existingUsers.some((user) => user.email === formData.email);
    if (userExists) {
      alert('User with this email already exists!');
      return;
    }

    // Add the new user to the list
    const newUser = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: 'User', // Default role for new users
    };
    existingUsers.push(newUser);

    // Save the updated user list to localStorage
    localStorage.setItem('users', JSON.stringify(existingUsers));

    alert('Signup successful!');

    // Redirect to the login page
    window.location.href = '/';
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Signup</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
        />
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
        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
          Signup
        </button>
      </form>
    </div>
  );
}