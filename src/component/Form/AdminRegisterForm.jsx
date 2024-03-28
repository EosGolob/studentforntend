import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminRegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role:'hr'
  });

  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Implement the submission logic here
    try {
      const response = await fetch('http://localhost:5000/api/admins', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        // const result = await response.json();
        setRegistrationSuccess(true);
        // console.log('Admin registration successful', result);
      } else {
        throw new Error('Admin registration failed');
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleLoginClick = () => {
    navigate('/'); // Navigate to the login page
  }; 

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: 'white' }}>
      <form onSubmit={handleSubmit} style={{ border: '2px solid blue', padding: '20px', borderRadius: '10px', backgroundColor: 'lightgray', width: '400px' }}>
        <h2 style={{ textAlign: 'center', color: 'black' }}>Admin Registration Form</h2>
        <label style={{ color: 'black' }}>
          Username:
          <input type="text" name="username" value={formData.username} onChange={handleChange} required style={{ display: 'block', margin: '10px 0', padding: '5px', borderRadius: '5px', width: '100%' }} />
        </label>
        <label style={{ color: 'black' }}>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required style={{ display: 'block', margin: '10px 0', padding: '5px', borderRadius: '5px', width: '100%' }} />
        </label>
        <label style={{ color: 'black' }}>
          Role:
          <select name="role" value={formData.role} onChange={handleChange} required style={{ display: 'block', margin: '20px 0', padding: '5px', borderRadius: '5px', width: '100%' }}>
            {/* <option value="admin">Admin</option> */}
            <option value="hr">HR</option>
            <option value="manager">Manager</option>
          </select>
        </label>
        <label style={{ color: 'black' }}>
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange} required style={{ display: 'block', margin: '10px 0', padding: '5px', borderRadius: '5px', width: '100%' }} />
        </label>
        <button type="submit" style={{ backgroundColor: 'blue', color: 'white', padding: '10px', borderRadius: '5px', border: 'none', cursor: 'pointer', marginTop: '20px', width: '100%' }}>Register</button>
      </form>
      {registrationSuccess && (
        <div style={{ marginTop: '20px' }}>
          <p>Registration successful!</p>
          <button onClick={handleLoginClick} style={{ backgroundColor: 'blue', color: 'white', padding: '10px', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>Go to Login</button>
        </div>
      )}
    </div>
  );
};

export default AdminRegistrationForm;
