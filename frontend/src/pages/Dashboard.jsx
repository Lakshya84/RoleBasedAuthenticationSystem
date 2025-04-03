// filepath: c:\Users\laksh\Desktop\Lakshya Pandey_HIT-Task-4-Capsi\frontend\src\pages\Dashboard.jsx
import React from 'react';

export default function Dashboard() {
  const [userData, setUserData] = React.useState({
    name: localStorage.getItem('name'), // Retrieve the name from localStorage
    role: localStorage.getItem('role'), // Retrieve the role from localStorage
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold mb-4">Welcome, {userData.name}!</h1>
      <p className="text-lg text-gray-700">Role: {userData.role}</p>
      <button
        onClick={() => {
          localStorage.removeItem('token');
          localStorage.removeItem('role');
          localStorage.removeItem('name');
          window.location.href = '/';
        }}
        className="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
}