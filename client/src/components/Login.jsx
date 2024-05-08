import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useState } from 'react';

export default function Login({ handleLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault(); 
    if (username.trim() === '' || password.trim() === '') {
      alert('Please enter both username and password.');
      return;
    }
    handleLogin(username, password);
    setUsername('');
    setPassword('');
  };

  return (
    <div className='flex flex-col h-screen justify-center items-center '>
      <h1 className='font-bold text-[20px]'>Sign in</h1>
    <form onSubmit={handleSubmit} className='w-full max-w-sm bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4'>
      <label htmlFor="username" className='block text-gray-700 text-sm font-bold mb-2'>Username:</label>
      <input
        type="text"
        id="username"
        name="username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
      />
      <label htmlFor="password" className='block text-gray-700 text-sm font-bold mb-2'>Password:</label>
      <input
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
      />
      <button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4'>
        Login
      </button>
      <p className='mt-4'>Don't have an account ?  <a href="/SignUp" className='font-bold text-blue-500'>Sign UP</a></p> 
    </form>
  </div>
  );
}
