import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin,isAdmin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      let endpoint = isAdmin ? 'http://localhost:5000/api/login' :'http://localhost:5000/api/login';
      const response = await axios.post(endpoint, { email, password });
      const {token} =response.data;
      localStorage.setItem('token', token);
      onLogin(email);
      // navigate(isAdmin ? '/admin':'/user');
      if (isAdmin) {
        navigate('/admin');
      } else {
        navigate('/user');
      }
    } catch (error) {
      setError('Invalid email or password');
      console.error(error);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: 'white' }}>
    <form onSubmit={handleLogin} style={{ border: '2px solid red', padding: '20px', borderRadius: '10px', backgroundColor: 'lightgray', width: '400px' }}>
      <h2 style={{ textAlign: 'center', color: 'black' }}>Login</h2>
      <label style={{ color: 'black' }}>
        Email:
        <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ display: 'block', margin: '10px 0', padding: '5px', borderRadius: '5px', width: '100%' }} />
      </label>
      <label style={{ color: 'black' }}>
        Password:
        <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ display: 'block', margin: '10px 0', padding: '5px', borderRadius: '5px', width: '100%' }} />
      </label>
      <button type="submit" style={{ backgroundColor: 'red', color: 'white', padding: '10px', borderRadius: '5px', border: 'none', cursor: 'pointer', marginTop: '20px', width: '100%' }}>Login</button>
    </form>
  </div>
);
};

export default Login;
