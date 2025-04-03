import React from 'react';

export default function UserList() {
  const [users, setUsers] = React.useState([
    { _id: '1', name: 'John Doe', email: 'john.doe@example.com', role: 'User' },
    { _id: '2', name: 'Jane Smith', email: 'jane.smith@example.com', role: 'Admin' },
    { _id: '3', name: 'Alice Johnson', email: 'alice.johnson@example.com', role: 'User' },
  ]);

  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user._id !== userId));
    alert('User deleted successfully!');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-4">User List</h1>
      <table className="table-auto border-collapse border border-gray-300 w-3/4">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Role</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="border border-gray-300 px-4 py-2">{user.name}</td>
              <td className="border border-gray-300 px-4 py-2">{user.email}</td>
              <td className="border border-gray-300 px-4 py-2">{user.role}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => handleDelete(user._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}