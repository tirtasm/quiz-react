import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

function FormLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginFailed, setLoginFailed] = useState(false); 

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.username === username && user.password === password) {
      navigate('/');
    } else {
      setLoginFailed(true); 
    }
  }

  return (
    
    <form className="bg-white shadow-md rounded px-24 pt-8 pb-10 mb-4" onSubmit={handleSubmit}>
    <p className="text-center text-2xl font-medium text-blue-600 mb-9">Login Page</p>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
        Username
      </label>
      <input
        className={`shadow border rounded w-80 py-2 px-3 text-gray-700 leading-tight focus:outline ${loginFailed ? 'border-red-500' : ''}`}
        id="username"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
          setLoginFailed(false); 
        }}
      />
    </div>
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
        Password
      </label>
      <input
        className={`shadow appearance-none border rounded w-80 py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline ${loginFailed ? 'border-red-500' : ''}`}
        id="password"
        type="password"
        placeholder="******************"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          setLoginFailed(false); 
        }}
      />
      {loginFailed && <p className="text-red-500 text-xs ml-2 italic">Invalid username or password.</p>}
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
    Don't have an account? <a href="/register" className="text-blue-700">Register</a>
  </p>
  </form>
  );
}

export default FormLogin;
