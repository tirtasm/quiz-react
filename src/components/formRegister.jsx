import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function formRegister() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { username, password };
    localStorage.setItem('user', JSON.stringify(user));
    alert('Registration successful');
    navigate('/login');
  };

  return (
    
    <form className="bg-white shadow-md rounded px-24 pt-8 pb-10 mb-4" onSubmit={handleSubmit}>
        <p className="text-center text-2xl font-medium text-blue-600 mb-9">Register Page</p>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            className="shadow border rounded w-80 py-2 px-3 text-gray-700 leading-tight focus:outline"
            id="username"
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-80 py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline"
            id="password"
            type="password"
            placeholder="******************"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="p-2 w-full bg-blue-500 font-medium text-white rounded"
          >
            Login
          </button>
        </div>
        <p className="mt-5 text-center text-md">
        Already have an account?  <a href="/login" className="text-blue-700">Login</a>
      </p>
      </form>
  );
}

export default formRegister;
