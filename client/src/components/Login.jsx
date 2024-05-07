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
    console.log(username, password,".......")
    handleLogin(username, password);
    setUsername('');
    setPassword('');
  };

  return (
    <div className='flex flex-col items-center'>
      <form onSubmit={handleSubmit} className='flex flex-col '>
        <label htmlFor="username" className=''>Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
